import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Monitorador} from "./model/Monitorador";
import {map, Observable} from "rxjs";
import {Filtro} from "./model/Filtro";

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

  public deletarMonitorador(id: number): Observable<Monitorador>{
    return this.http.delete<Monitorador>(`${this.urlBackend}/deletar/${id}`);
  }

  public ativarMonitorador(id: number): Observable<Monitorador>{
    return this.http.put<Monitorador>(`${this.urlBackend}/ativar/${id}`, null);
  }

  public desativarMonitorador(id: number): Observable<Monitorador>{
    return this.http.put<Monitorador>(`${this.urlBackend}/desativar/${id}`, null);
  }

  public filtrarMonitoradores(filtro: Filtro): Observable<Monitorador[]>{
    return this.http.post<Monitorador[]>(`${this.urlBackend}/filtro`, filtro);
  }

  public gerarRelatorioPdf(){
      return this.http.get<Blob>(`${this.urlBackend}/report`, {responseType: 'blob' as 'json'});
  }
}
