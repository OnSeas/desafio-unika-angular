import {Component, OnInit} from '@angular/core';
import {Monitorador} from "../model/Monitorador";
import {MonitoradorService} from "../monitorador.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TipoPessoa} from "../model/TipoPessoa";
import {EnderecoService} from "../endereco/endereco.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {formatDate} from "@angular/common";
import {MySnackbarService} from "../../my-snackbar/my-snackbar.service";

@Component({
  selector: 'app-monitorador-form',
  templateUrl: './monitorador-form.component.html',
  styleUrls: ['./monitorador-form.component.scss']
})
export class MonitoradorFormComponent implements OnInit {

  monitorador: Monitorador = new Monitorador();
  tipoPessoa = TipoPessoa; // Para usar no html

  monitoradorForm!: FormGroup;

  constructor(
    private monitoradorService: MonitoradorService,
    private enderecoService: EnderecoService,
    public router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private mySnackbarService: MySnackbarService
  ) { }

  ngOnInit(): void {
    this.monitoradorForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.maxLength(50), Validators.email]],
      dataNascimento: ['', [Validators.required]],
      nome: ['', [Validators.minLength(3), Validators.maxLength(30), Validators.pattern('[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]*')]],
      cpf: ['', [Validators.pattern('\\d{3}\\.?\\d{3}\\.?\\d{3}\-?\\d{2}')]],
      rg: ['', [Validators.pattern('\\d{2}.?\\d{3}.?\\d{3}-?\\d')]],
      razaoSocial: ['', [Validators.minLength(3), Validators.maxLength(30)]],
      cnpj: ['', [Validators.pattern('\\d{2}\\.?\\d{3}\\.?\\d{3}/?\\d{4}-?\\d{2}')]],
      inscricaoEstadual: ['', [Validators.minLength(7), Validators.maxLength(18), Validators.pattern('[0-9./-]*')]],

      // Atributos vazios.
      id:  [''], tipoPessoa: [''], enderecoList: [''], ativo: [''],
    });

    const id = this.getMonitoradorId();
    if(id){
      this.monitoradorService.buscarById(parseInt(id)).subscribe({next: (monitorador) => {
          monitorador.tipoPessoa = getTipoPessoa(monitorador.tipoPessoa.toString());
          this.monitorador = monitorador;
          console.log(this.monitorador);
          this.monitoradorForm.setValue(this.monitorador);

          // Data de string dd/MM/yyyy para Date
          if(this.monitorador.dataNascimento) {
            const [dia, mes, ano] = this.monitorador.dataNascimento.split('/');
            this.monitoradorForm.get('dataNascimento')?.setValue(new Date(`${mes}/${dia}/${ano}`));
          }
        },
        error: (err) => {
          this.mySnackbarService.openSnackBar(err.error, "danger");
        }
      });
    }
  }

  ngOnDestroy(){
    this.enderecoService.setList([]);
  }

  getMonitoradorId(){
    return this.route.snapshot.paramMap.get('id');
  }

  salvar(): void {
    if (this.monitorador.tipoPessoa == null) this.monitorador.tipoPessoa = TipoPessoa.UNDEFINED;
    if (!this.monitoradorForm.valid || this.monitorador.tipoPessoa == TipoPessoa.UNDEFINED){
      console.log("Validando todos os campos!");
      this.validarTodosOsCampos(this.monitoradorForm);
    }
    else { // Form valid
      this.setMonitorador();
      console.log(this.monitorador);

      if (!this.monitorador.id) this.monitoradorService.cadastrarMonitorador(this.monitorador).subscribe({
        next: (monitorador: Monitorador) =>{
          console.log("monitorador BD: "+monitorador);
          this.mySnackbarService.openSnackBar("Monitorador criado com sucesso!", "success");
          this.router.navigate(['../monitoradores']);
        },
        error: (err) => {
          this.mySnackbarService.openSnackBar(err.error, "danger");
        }
      });

      else this.monitoradorService.editarMonitorador(this.monitorador, this.monitorador.id).subscribe({
        next: (monitorador : Monitorador) => {
          this.mySnackbarService.openSnackBar("Monitorador atualizado com sucesso!", "success");
          this.router.navigate(['../monitoradores']);
        },
        error: (err) => {
          this.mySnackbarService.openSnackBar(err.error, "danger");
        }
      });
    }
  }

  setMonitorador(){
    this.monitorador.enderecoList = this.enderecoService.getList();

    console.log(this.monitoradorForm.getRawValue());

    this.monitorador.email = this.monitoradorForm.get('email')?.getRawValue();
    this.monitorador.dataNascimento = formatDate(this.monitoradorForm.get('dataNascimento')?.getRawValue(), 'dd/MM/yyyy', "pt-BR"); // TODO
    this.monitorador.nome = this.monitoradorForm.get('nome')?.getRawValue();
    this.monitorador.cpf = this.monitoradorForm.get('cpf')?.getRawValue();
    this.monitorador.rg = this.monitoradorForm.get('rg')?.getRawValue();
    this.monitorador.razaoSocial = this.monitoradorForm.get('razaoSocial')?.getRawValue();
    this.monitorador.cnpj = this.monitoradorForm.get('cnpj')?.getRawValue();
    this.monitorador.inscricaoEstadual = this.monitoradorForm.get('inscricaoEstadual')?.getRawValue();
  }

  adcionarRequiredPF(){ // Ao tentar salvar adiciona o validator de null nos campos de pessoa física ou jurídica.
    let pfFields = [this.monitoradorForm.controls['nome'], this.monitoradorForm.controls['cpf'], this.monitoradorForm.controls['rg']];
    let pjFields = [this.monitoradorForm.controls['razaoSocial'], this.monitoradorForm.controls['cnpj'], this.monitoradorForm.controls['inscricaoEstadual']];

    pjFields.forEach(control => {
      control.removeValidators(Validators.required);
      control.updateValueAndValidity();
    });
    pfFields.forEach(control => {
      control.addValidators(Validators.required)
      control.updateValueAndValidity();
    });
  }
  adcionarRequiredPJ(){ // Ao tentar salvar adiciona o validator de null nos campos de pessoa física ou jurídica.
    let pfFields = [this.monitoradorForm.controls['nome'], this.monitoradorForm.controls['cpf'], this.monitoradorForm.controls['rg']];
    let pjFields = [this.monitoradorForm.controls['razaoSocial'], this.monitoradorForm.controls['cnpj'], this.monitoradorForm.controls['inscricaoEstadual']];

    pfFields.forEach(control => {
      control.removeValidators(Validators.required);
      control.updateValueAndValidity();
    });
    pjFields.forEach(control => {
      control.addValidators(Validators.required);
      control.updateValueAndValidity();
    });
  }

  // Valida os campos do form e throw errors. Fonte: https://www.youtube.com/watch?v=p9ScsROLjdI
  private validarTodosOsCampos(formGroup: FormGroup){
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl){
        control.markAsDirty({onlySelf: true});
      } else if (control instanceof FormGroup){
        this.validarTodosOsCampos(control);
      }
    });
  }
}

function getTipoPessoa(tipo: string): TipoPessoa {
  if (tipo === "PESSOA_FISICA") return TipoPessoa.PESSOA_FISICA;
  else if (tipo === "PESSOA_JURIDICA") return TipoPessoa.PESSOA_JURIDICA;
  else return TipoPessoa.UNDEFINED;
}
