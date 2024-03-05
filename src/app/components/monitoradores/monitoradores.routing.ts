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
    path : 'newForm',
    component : MonitoradorFormComponent,
    children : []
  },
  {
    path : 'editForm/:id',
    component : MonitoradorFormComponent,
    children : []
  },
  {
    path: 'enderecos/',
    loadChildren: () => import('./endereco/endereco.module').then(mod => mod.EnderecoModule)
  }
];
