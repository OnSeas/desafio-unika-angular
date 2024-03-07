import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EnderecoListComponent} from "./endereco-list/endereco-list.component";
import {EnderecoFormComponent} from "./endereco-form/endereco-form.component";

const routes: Routes = [
  {
    path: 'criarForm',
    component: EnderecoFormComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnderecoRoutingModule { }
