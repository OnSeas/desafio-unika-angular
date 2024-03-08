import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Endereco} from "./Endereco";

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {
  enderecoList: Endereco[] = [];
  urlBackend: string = "http://localhost:8080/endereco"

  constructor(private http: HttpClient) {}

  cadastrarEndereco(idMonitorador: number, endereco: Endereco){
    return this.http.post<Endereco>(`http://localhost:8080/monitorador/${idMonitorador}/endereco`, endereco);
  }

  buscarEnderecos(idMonitorador: number){
    return this.http.get<Endereco[]>(`${this.urlBackend}/listar/${idMonitorador}`);
  }

  editarEndereco(idEndereco: number, endereco: Endereco){
    return this.http.put<Endereco>(`${this.urlBackend}/editar/${idEndereco}`, endereco);
  }

  deletarEndereco(idEndereco: number){
    return this.http.delete<Endereco>(`${this.urlBackend}/deletar/${idEndereco}`);
  }

  buscarEnderecoByCep(cep: string){
    return this.http.get<Endereco>(`${this.urlBackend}/getbyCep/${cep}`);
  }

  tornarPrincipal(idEndereco: number){
    return this.http.put<Endereco>(`${this.urlBackend}/tornar-principal/${idEndereco}`, null);
  }

  // Para criar um monitorador novo
  setList(endList: Endereco[]){
    this.enderecoList = endList;
  }

  getList():Endereco[]{
    return this.enderecoList;
  }
}
