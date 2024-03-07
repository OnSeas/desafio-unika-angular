import { Component, OnInit } from '@angular/core';
import {Monitorador} from "../Monitorador";
import {MonitoradorService} from "../monitorador.service";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-monitorador-list',
  templateUrl: './monitorador-list.component.html',
  styleUrls: ['./monitorador-list.component.scss']
})
export class MonitoradorListComponent implements OnInit {
  displayedColumns: string[] = ['position', 'tipoPessoa', 'email', 'dataNascimento', 'CPF/CNPJ', 'opcoes'];
  dataSource = new MatTableDataSource<Monitorador>;

  constructor(private monitoradorService: MonitoradorService) {}

  ngOnInit(): void {
    this.monitoradorService.listarMinitoradores().subscribe((monitoradores:Monitorador[]) => {
      console.log("Monitorador: ", monitoradores);
      this.dataSource.data = monitoradores;
    });
  }

  deletarMonitorador(id: number){ // TODO ta dando erro
    if (confirm("Tem certeza que deseja deletar o Monitorador "+id+"?")){
      this.monitoradorService.deletarMonitorador(id).subscribe({
        next: (msg: String) =>{
          alert("Exluiu o monitorador PORRA!!!!!!!");
          // TODO filter
        }, error: (err) =>{
          alert(err.error);
        }
      })
    }
  }
}
