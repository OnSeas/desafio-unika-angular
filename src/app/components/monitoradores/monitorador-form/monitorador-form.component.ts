import {Component, OnInit} from '@angular/core';
import {Monitorador} from "../Monitorador";
import {MonitoradorService} from "../monitorador.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TipoPessoa} from "../TipoPessoa";
import {EnderecoService} from "../endereco/endereco.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Endereco} from "../endereco/Endereco";

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
  ) { }

  ngOnInit(): void {
    this.monitoradorForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.maxLength(50), Validators.email]],
      dataNascimento: ['', [Validators.required]], // TODO organizar date
      nome: ['', [Validators.minLength(3), Validators.maxLength(30), Validators.pattern('[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]*')]],
      cpf: ['', [Validators.pattern('\\d{3}\\.?\\d{3}\\.?\\d{3}\-?\\d{2}')]],
      rg: ['', [Validators.pattern('\\d{2}.?\\d{3}.?\\d{3}-?\\d')]],
      razaoSocial: [''],
      cnpj: ['', [Validators.pattern('\\d{2}\\.?\\d{3}\\.?\\d{3}/?\\d{4}-?\\d{2}')]],
      inscricaoEstadual: [''],

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
        },
        error: (err) => {
          alert(err.error);
        }
      });
    }
  }

  getMonitoradorId(){
    return this.route.snapshot.paramMap.get('id');
  }

  salvar(): void {
    if (!this.monitoradorForm.valid) this.validarTodosOsCampos(this.monitoradorForm);
    else { // Form valid
      this.setMonitorador();
      console.log(this.monitorador);

      if (!this.monitorador.id) this.monitoradorService.cadastrarMonitorador(this.monitorador).subscribe({
        next: (monitorador: Monitorador) =>{
          console.log("monitorador BD: "+monitorador);
          alert("Monitorador criado com sucesso!");
          this.router.navigate(['../monitoradores']);
        },
        error: (erro) => {
          alert(erro.error);
        }
      });

      else this.monitoradorService.editarMonitorador(this.monitorador, this.monitorador.id).subscribe({
        next: (monitorador : Monitorador) => {
          alert("Monitorador atualizado com sucesso!");
          this.router.navigate(['../monitoradores']);
        },
        error: (err) => {
          alert(err.error);
        }
      });
    }
  }

  setMonitorador(){
    this.monitorador.enderecoList = this.enderecoService.getList();
    this.monitorador.razaoSocial = this.monitoradorForm.get('razaosocial')?.getRawValue();
  }

  // Valida os campos do form e throw errors. Fonte: https://www.youtube.com/watch?v=p9ScsROLjdI
  private validarTodosOsCampos(formGroup: FormGroup){
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl){
        control.markAsDirty({onlySelf: true});
      } else if (control instanceof FormGroup){
        this.validarTodosOsCampos(control)
      }
    });
  }
}

function getTipoPessoa(tipo: string): TipoPessoa { // todo ERRO SE NÃO FOR NENHUM
  if (tipo === "PESSOA_FISICA") return TipoPessoa.PESSOA_FISICA;
  else return TipoPessoa.PESSOA_JURIDICA;
}
