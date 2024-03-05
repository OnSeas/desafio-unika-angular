import {Component, Input, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Endereco} from "../Endereco";
import {Monitorador} from "../../Monitorador";

@Component({
  selector: 'app-endereco-list',
  templateUrl: './endereco-list.component.html',
  styleUrls: ['./endereco-list.component.scss']
})
export class EnderecoListComponent implements OnInit {
  displayedColumns: string[] = ['position', 'endereco', 'cep', 'cidade', 'estado'];
  dataSource = new MatTableDataSource<Endereco>;
  constructor() {}

  ngOnInit(): void {
    this.dataSource.data = [];
  }

}
