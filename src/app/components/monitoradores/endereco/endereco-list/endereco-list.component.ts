import {Component, Input, OnInit, Output} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Endereco} from "../Endereco";
import {EnderecoService} from "../endereco.service";
import {MatDialog} from "@angular/material/dialog";
import {EnderecoFormComponent} from "../endereco-form/endereco-form.component";
import {MySnackbarService} from "../../../my-snackbar/my-snackbar.service";

@Component({
  selector: 'app-endereco-list',
  templateUrl: './endereco-list.component.html',
  styleUrls: ['./endereco-list.component.scss']
})
export class EnderecoListComponent implements OnInit {
  displayedColumns: string[] = ['position', 'endereco', 'cep', 'cidade', 'estado', 'opcoes', 'principal'];
  dataSource = new MatTableDataSource<Endereco>;

  @Input() monitoradorId: string|null = null;

  constructor(
    private enderecoService: EnderecoService,
    public dialog: MatDialog,
    private mySnackbarService: MySnackbarService
    ) {}

  ngOnInit(): void {
    this.dataSource.data = [];
    if (this.monitoradorId) this.enderecoService.buscarEnderecos(parseInt(this.monitoradorId)).subscribe({
      next: (enderecoList: Endereco[]) =>{
        this.dataSource.data = enderecoList;
        this.enderecoService.setList(this.dataSource.data);
      },
      error: (err) =>{
        this.mySnackbarService.openSnackBar(`Erro ao buscar endereços do monitorador ${this.monitoradorId}`, "danger");
        console.log(err.error);
      }
    });
  }

  openDialog(endereco: Endereco|null): void {
    if(this.dataSource.data.length >= 3) this.mySnackbarService.openSnackBar("Você já temo número máximo de endereços: 3.", "danger");
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
            this.mySnackbarService.openSnackBar("Endereço alterado com sucesso!", "success");
          } else{ // Criando o endereço
            this.dataSource.data.push(endResult);
            this.mySnackbarService.openSnackBar("Endereço criado com sucesso!", "success");
          }
          this.dataSource._updateChangeSubscription();
        }
        this.enderecoService.setList(this.dataSource.data);
      });
    }
  }

  deletarEndereco(end: Endereco): void{
    if (this.dataSource.data.length <= 1) this.mySnackbarService.openSnackBar("Monitorador não pode ficar sem endereços!", "danger");
    else {
      if(confirm("Tem certeza que deseja deletar o endereço "+end.endereco+"?")){
        if(end.id) this.enderecoService.deletarEndereco(end.id).subscribe({
          next: (res) =>{
            this.mySnackbarService.openSnackBar(`Endereço ${res.endereco} deletado com sucesso!`, "success");
            this.dataSource.data = this.dataSource.data.filter(endereco => endereco.id != res.id);
          },
          error: (err) =>{
            this.mySnackbarService.openSnackBar(err.error, "danger");
          }
        });
        else{
          this.dataSource.data = this.dataSource.data.filter(endereco => endereco != end);
          this.mySnackbarService.openSnackBar(`Endereço ${end.endereco} deletado com sucesso!`, "success");

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
              this.mySnackbarService.openSnackBar(`O endereço ${res.endereco} agora é o seu principal!`, "success");
            },
            error: (err) =>{
              this.mySnackbarService.openSnackBar(err.error, "danger");
            }
          });
        } else this.mySnackbarService.openSnackBar("Endereço não encontrado!", "danger");
      } else {
        this.dataSource.data.forEach(e => {
          if (e != end) e.principal = false;
          else e.principal = true;
        });
        this.mySnackbarService.openSnackBar(`O endereço ${end.endereco} agora é o seu principal!`, "success");
      }
      this.enderecoService.setList(this.dataSource.data);
    }
  }
}
