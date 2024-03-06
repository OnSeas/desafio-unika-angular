import {Component, Input, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Endereco} from "../Endereco";
import {EnderecoService} from "../endereco.service";

@Component({
  selector: 'app-endereco-list',
  templateUrl: './endereco-list.component.html',
  styleUrls: ['./endereco-list.component.scss']
})
export class EnderecoListComponent implements OnInit {
  displayedColumns: string[] = ['position', 'endereco', 'cep', 'cidade', 'estado', 'opcoes', 'principal'];
  dataSource = new MatTableDataSource<Endereco>;

  @Input() monitoradorId: string|null = null;

  constructor(private enderecoService: EnderecoService) {}

  ngOnInit(): void {
    this.dataSource.data = [];
  }
}
