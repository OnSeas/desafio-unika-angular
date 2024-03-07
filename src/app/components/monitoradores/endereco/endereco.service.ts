import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Endereco} from "./Endereco";

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {
  urlBackend: string = "http://localhost:8080/endereco"

  constructor(private http: HttpClient) { }

  buscarEnderecos(idMonitorador: number){
    return this.http.get<Endereco[]>(`${this.urlBackend}/listar/${idMonitorador}`);
  }

}
