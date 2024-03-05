import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnderecoRoutingModule } from './endereco-routing.module';
import { EnderecoFormComponent } from './endereco-form/endereco-form.component';
import { EnderecoListComponent } from './endereco-list/endereco-list.component';
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatRadioModule} from "@angular/material/radio";
import {MatSelectModule} from "@angular/material/select";


@NgModule({
  declarations: [
    EnderecoFormComponent,
    EnderecoListComponent
  ],
  exports: [
    EnderecoListComponent
  ],
  imports: [
    CommonModule,
    EnderecoRoutingModule,
    MatButtonModule,
    MatTableModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatSelectModule
  ]
})
export class EnderecoModule { }
