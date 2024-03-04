import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Monitorador} from "./Monitorador";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MonitoradorService {

  urlBackend: string = "http://localhost:8080/monitorador"
  constructor(private http: HttpClient) {}

  public listarMinitoradores(): Observable<Monitorador[]>{
    return this.http.get<Monitorador[]>(this.urlBackend + "/listar");
  }

  public cadastrarMonitorador(moniotador: Monitorador): Observable<Monitorador>{
    return this.http.post<Monitorador>(`${this.urlBackend}/cadastrar`, moniotador);
  }

  public deletarMonitorador(id: number){
    console.log(this.http.delete<string>(`${this.urlBackend}/deletar/${id}`)); // TODO entender como retornar as msgs do backend
  }
}
