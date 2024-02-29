import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MonitoradorFormComponent} from './monitorador-form/monitorador-form.component';
import {RouterModule} from "@angular/router";
import {MonitoradoresRoutes} from "./monitoradores.routing";


@NgModule({
  declarations: [
    MonitoradorFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(MonitoradoresRoutes)
  ]
})
export class MonitoradoresModule { }
