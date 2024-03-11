import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MonitoradorFormComponent} from './monitorador-form/monitorador-form.component';
import {RouterModule} from "@angular/router";
import {MonitoradoresRoutes} from "./monitoradores.routing";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatRadioModule} from "@angular/material/radio";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import { MonitoradorListComponent } from './monitorador-list/monitorador-list.component';
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {EnderecoModule} from "./endereco/endereco.module";
import {MatCardModule} from "@angular/material/card";
import {NgxMaskModule} from "ngx-mask";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";


@NgModule({
  declarations: [
    MonitoradorFormComponent,
    MonitoradorListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(MonitoradoresRoutes),
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatTableModule,
    FormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    EnderecoModule,
    MatCardModule,
    NgxMaskModule,
    MatCheckboxModule,
    MatOptionModule,
    MatSelectModule
  ]
})
export class MonitoradoresModule { }
