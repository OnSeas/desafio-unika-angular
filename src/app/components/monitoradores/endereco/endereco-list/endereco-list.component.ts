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
        this.enderecoService.setList(this.dataSource.data);
      },
      error: (err) =>{
        alert(`Erro ao buscar endereços do monitorador ${this.monitoradorId}`);
        console.log(err.error);
      }
    });
  }

  openDialog(endereco: Endereco|null): void {
    if(this.dataSource.data.length >= 3) alert("Você já temo número máximo de endereços: 3.");
    else{
      const dialogRef = this.dialog.open(EnderecoFormComponent, {
        data: {
          end: endereco,
          idMon: this.monitoradorId}
      });

      dialogRef.afterClosed().subscribe((endResult: Endereco) => {
        if (endResult){
          console.log(endResult); // Endereço recebido
          if(endereco){ // Editando o endereço
            this.dataSource.data[this.dataSource.data.indexOf(endereco)] = endResult;
            alert("Endereço alterado com sucesso!");
          } else{ // Criando o endereço
            this.dataSource.data.push(endResult);
            alert("Endereço criado com sucesso!");
          }
          this.dataSource._updateChangeSubscription();
        }
        this.enderecoService.setList(this.dataSource.data);
      });
    }
  }

  deletarEndereco(end: Endereco): void{
    if (this.dataSource.data.length <= 1) alert("Monitorador não pode ficar sem endereços!");
    else {
      if(confirm("Tem certeza que deseja deletar o endereço "+end.endereco+"?")){
        if(end.id) this.enderecoService.deletarEndereco(end.id).subscribe({
          next: (res) =>{
            alert(`Endereço ${res.endereco} deletado com sucesso!`);
            this.dataSource.data = this.dataSource.data.filter(endereco => endereco.id != res.id);
          },
          error: (err) =>{
            alert(err.error);
          }
        });
        else{
          this.dataSource.data = this.dataSource.data.filter(endereco => endereco != end);
          alert(`Endereço ${end.endereco} deletado com sucesso!`);
        }
      }
      this.enderecoService.setList(this.dataSource.data);
    }
  }

  tornarPrincipal(end: Endereco){
    if(confirm(`Deseja tornar ${end.endereco} seu endereço principal?`)){
      if (this.monitoradorId){
        if (end.id){
          this.enderecoService.tornarPrincipal(end.id).subscribe({
            next: (res) =>{
              this.dataSource.data.forEach(e => {
                if (e.id != res.id) e.principal = false;
                else e.principal = true;
              });
              alert(`O endereço ${res.endereco} agora é o seu principal!`);
            },
            error: (err) =>{
              alert(err.error);
            }
          });
        } else alert("Endereço não encontrado!");
      } else {
        this.dataSource.data.forEach(e => {
          if (e != end) e.principal = false;
          else e.principal = true;
        });
        alert(`O endereço ${end.endereco} agora é o seu principal!`);
      }
      this.enderecoService.setList(this.dataSource.data);
    }
  }
}
