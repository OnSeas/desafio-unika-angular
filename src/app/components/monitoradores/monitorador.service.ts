import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Monitorador} from "./model/Monitorador";
import {BehaviorSubject, Observable} from "rxjs";
import {Filtro} from "./model/Filtro";

@Injectable({
  providedIn: 'root'
})
export class MonitoradorService {

  urlBackend: string = "http://localhost:8080/monitorador"
  loadingListAsync: BehaviorSubject<Monitorador[]> = new BehaviorSubject<Monitorador[]>([]);

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
    if (filtro.busca) filtro.busca = filtro.busca.trim();

    return this.http.get<Monitorador[]>(`${this.urlBackend}/filtro`, {
      params : {
        busca: filtro.busca,
        tipoBusca: filtro.tipoBusca.valueOf(),
        soAtivados: filtro.soAtivados,
        pessoaFisica: filtro.pessoaFisica,
        pessoaJuridica: filtro.pessoaJuridica
      }
    });
  }

  public gerarRelatorioPdf(id: number|null){
      if(id) return this.http.get(`${this.urlBackend}/report/${id}`, {responseType: 'arraybuffer'});
      else return this.http.get(`${this.urlBackend}/report`, {responseType: 'arraybuffer'});
  }

  public gerarExcel(){
    return this.http.get(`${this.urlBackend}/export/xlsx`, {responseType: 'arraybuffer'});
  }

  public importarMonitoradores(file: File){

    let formData = new FormData();
    formData.append('file', file);

    return this.http.post<Monitorador[]>(`${this.urlBackend}/import`, formData);
  }

  public atualizarListaAsync(){
    this.listarMinitoradores().subscribe((monitoradores) => {
      this.loadingListAsync.next(monitoradores);
    });
  }
}
