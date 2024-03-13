import {Component, Inject, Input, OnInit} from '@angular/core';
import {Endereco} from "../Endereco";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {EnderecoService} from "../endereco.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MySnackbarService} from "../../../my-snackbar/my-snackbar.service";

@Component({
  selector: 'app-endereco-form',
  templateUrl: './endereco-form.component.html',
  styleUrls: ['./endereco-form.component.scss']
})
export class EnderecoFormComponent implements OnInit {

  enderecoForm!: FormGroup;
  idMonitorador: string|null = null;
  endereco: Endereco|null = null;
  telefoneMask : string = ''

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EnderecoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private enderecoService: EnderecoService,
    private mySnackbarService: MySnackbarService
    ) {
    this.endereco = data.end;
    this.idMonitorador = data.idMon;
  }

  ngOnInit(): void {
    this.enderecoForm = this.formBuilder.group({
      id: [''],
      cep: ['', [Validators.required, Validators.pattern('\\d{5}-?\\d{3}')]],
      endereco: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      cidade: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern('[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑª ]*')]],
      bairro: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      estado: ['', Validators.required],
      numero: ['', [Validators.required, Validators.maxLength(5)]],
      telefone: ['', [Validators.required, Validators.pattern('\\(?\\d{2}\\)?\\d?\\d{4}-?\\d{4}')]],
      principal: [''],
      monitoradorId: [''],
    });

    if (this.endereco) this.enderecoForm.setValue(this.endereco);

    //Mascára que muda conforme o tamanho do telefone.
    this.enderecoForm.get('telefone')?.valueChanges.subscribe(text => text.length < 11 ? this.telefoneMask = '(00) 0000-00009' : this.telefoneMask = '(00) 00000-0000');
  }

  cancelar(){
    this.dialogRef.close();
  }

  salvar(){
    if (!this.enderecoForm.valid) this.validarTodosOsCampos(this.enderecoForm);
    else { // Form valid
      this.enderecoForm.get('principal')?.setValue(false); // TODO
      if (this.idMonitorador) { //Monitorador já existe
        if (this.endereco && this.endereco.id) { // Editando backend
            this.enderecoService.editarEndereco(this.endereco.id, this.enderecoForm.value).subscribe({
              next: (end) => {
                this.dialogRef.close(end);
              },
              error: (err) => {
                this.mySnackbarService.openSnackBar(err.error, "danger");
              }
            });
        } else{ // Criando backend
          this.enderecoService.cadastrarEndereco(parseInt(this.idMonitorador), this.enderecoForm.value).subscribe({
            next: (end) => {
              this.dialogRef.close(end);
            },
            error: (err) => {
              this.mySnackbarService.openSnackBar(err.error, "danger");
            }
          });
        }
      }
      else{ // Novo Monitorador
        this.dialogRef.close(this.enderecoForm.value);
      }
    }
  }

  buscarEndereco(){
    let cep: string|null = null;
    if(this.enderecoForm.get('cep')?.valid) cep = this.enderecoForm.get('cep')?.getRawValue();
    if(cep) this.enderecoService.buscarEnderecoByCep(cep).subscribe({
      next: (end) =>{
        this.enderecoForm.get('endereco')?.setValue(end.endereco);
        this.enderecoForm.get('cidade')?.setValue(end.cidade);
        this.enderecoForm.get('bairro')?.setValue(end.bairro);
        this.enderecoForm.get('estado')?.setValue(end.estado);
      },
      error: (err) =>{
        this.mySnackbarService.openSnackBar(err.error, "danger");
      }
    })
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



  protected readonly length = length;
}
