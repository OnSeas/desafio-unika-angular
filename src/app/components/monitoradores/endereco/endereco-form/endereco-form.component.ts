import {Component, Inject, OnInit} from '@angular/core';
import {Endereco} from "../Endereco";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-endereco-form',
  templateUrl: './endereco-form.component.html',
  styleUrls: ['./endereco-form.component.scss']
})
export class EnderecoFormComponent implements OnInit {

  endereco: Endereco = new Endereco();
  enderecoForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EnderecoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Endereco,
    ) { }

  ngOnInit(): void {
    this.enderecoForm = this.formBuilder.group({
      id: [''],
      cep: ['', [Validators.required, Validators.pattern('\\d{5}-?\\d{3}')]],
      endereco: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      cidade: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern('[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]*')]],
      bairro: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern('[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]*')]],
      estado: ['', Validators.required],
      numero: ['', [Validators.required, Validators.maxLength(5)]],
      telefone: ['', [Validators.required, Validators.pattern('\\(?\\d{2}\\)?\\d?\\d{4}-?\\d{4}')]],
      principal: [''],
      monitoradorId: [''],
    })

    if (this.data) this.enderecoForm.setValue(this.data);
  }

  cancelar(){
    this.dialogRef.close();
  }

  salvar(){
    if (this.enderecoForm.valid) {
      this.dialogRef.close(this.enderecoForm.value);
    }
    else this.validarTodosOsCampos(this.enderecoForm);
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
