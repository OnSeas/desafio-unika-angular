import { Routes } from '@angular/router';
import {MonitoradorFormComponent} from "./monitorador-form/monitorador-form.component";
import {MonitoradorListComponent} from "./monitorador-list/monitorador-list.component";


export const MonitoradoresRoutes: Routes = [
  {
    path : '',
    redirectTo : 'list',
    pathMatch : 'full'
  },
  {
    path : 'list',
    component : MonitoradorListComponent,
    children : []
  },
  {
    path : 'form',
    component : MonitoradorFormComponent,
    children : []
  }
];
