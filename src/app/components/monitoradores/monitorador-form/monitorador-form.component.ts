import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-monitorador-form',
  templateUrl: './monitorador-form.component.html',
  styleUrls: ['./monitorador-form.component.scss']
})
export class MonitoradorFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  tipoPessoa? : string;

  email = new FormControl('', [Validators.required, Validators.email]);
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Campo email não pode ser nulo';
    }
    return this.email.hasError('email') ? 'Este email não é válido' : '';
  }

  pessoaFisica(){
    this.tipoPessoa = "PF"
  }

  pessoaJuridica(){
    this.tipoPessoa = "PJ"
  }

}
