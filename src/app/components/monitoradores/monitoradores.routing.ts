import { Routes } from '@angular/router';
import {MonitoradorFormComponent} from "./monitorador-form/monitorador-form.component";


export const MonitoradoresRoutes: Routes = [
  {
    path : '',
    redirectTo : 'form',
    pathMatch : 'full'
  },
  {
    path : 'form',
    component : MonitoradorFormComponent,
     children : []
  }
];
