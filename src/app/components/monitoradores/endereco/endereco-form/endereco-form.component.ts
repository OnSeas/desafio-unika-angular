import { Component, OnInit } from '@angular/core';
import {Endereco} from "../Endereco";

@Component({
  selector: 'app-endereco-form',
  templateUrl: './endereco-form.component.html',
  styleUrls: ['./endereco-form.component.scss']
})
export class EnderecoFormComponent implements OnInit {

  endereco: Endereco = new Endereco();

  constructor() { }

  ngOnInit(): void {
  }

  salvar(){
  }

}
