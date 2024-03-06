import {Injectable} from '@angular/core';
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

  public buscarById(id: number): Observable<Monitorador>{
    return this.http.get<Monitorador>(`${this.urlBackend}/buscar/${id}`);
  }

  public editarMonitorador(monitorador: Monitorador, id: number): Observable<Monitorador>{
    return this.http.put<Monitorador>(`${this.urlBackend}/atualizar/${id}`, monitorador);
  }

  public deletarMonitorador(id: number){
    return this.http.delete(`${this.urlBackend}/deletar/${id}`);
  }
}
