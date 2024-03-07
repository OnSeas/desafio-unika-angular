import {Component, Input, OnInit, Output} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Endereco} from "../Endereco";
import {EnderecoService} from "../endereco.service";
import {MatDialog} from "@angular/material/dialog";
import {EnderecoFormComponent} from "../endereco-form/endereco-form.component";

@Component({
  selector: 'app-endereco-list',
  templateUrl: './endereco-list.component.html',
  styleUrls: ['./endereco-list.component.scss']
})
export class EnderecoListComponent implements OnInit {
  displayedColumns: string[] = ['position', 'endereco', 'cep', 'cidade', 'estado', 'opcoes', 'principal'];
  dataSource = new MatTableDataSource<Endereco>;

  @Input() monitoradorId: string|null = null;

  constructor(private enderecoService: EnderecoService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.dataSource.data = [];
    if (this.monitoradorId) this.enderecoService.buscarEnderecos(parseInt(this.monitoradorId)).subscribe({
      next: (enderecoList: Endereco[]) =>{
        this.dataSource.data = enderecoList;
      },
      error: (err) =>{
        alert(`Erro ao buscar endereços do monitorador ${this.monitoradorId}`);
        console.log(err.error);
      }
    });
  }
  openDialog(endereco: Endereco|null): void {
    const dialogRef = this.dialog.open(EnderecoFormComponent, {
      data: endereco,
    });

    dialogRef.afterClosed().subscribe((endResult: Endereco) => {
      if (endResult){
        console.log(endResult); // Endereço recebido
        if(endereco){
          if(endereco.id) console.log("editar no backend");
          this.dataSource.data[this.dataSource.data.indexOf(endereco)] = endResult;
          alert("Endereço alterado com sucesso!");
        } else{
          this.dataSource.data.push(endResult);
          console.log(this.dataSource.data);
          alert("Endereço criado com sucesso!");
        }
        this.dataSource._updateChangeSubscription();
      }
    });
  }

  deletarEndereco(end: Endereco): void{
    if(confirm("Tem certeza que deseja deletar o endereço "+end.endereco+"?")){
      if(end.id) console.log("Deletar backend");
      this.dataSource.data = this.dataSource.data.filter(endereco => endereco != end);
    }
  }



  @Output() enderecoList: Endereco[] = this.dataSource.data; // TODO entender
  protected readonly Endereco = Endereco;
}
