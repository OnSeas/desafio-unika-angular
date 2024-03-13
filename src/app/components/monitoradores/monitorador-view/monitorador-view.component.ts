import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Monitorador} from "../model/Monitorador";
import {MatTableDataSource} from "@angular/material/table";
import {Endereco} from "../endereco/Endereco";
import {MonitoradorService} from "../monitorador.service";
import {TipoPessoa} from "../model/TipoPessoa";
import {MySnackbarService} from "../../my-snackbar/my-snackbar.service";

@Component({
  selector: 'app-monitorador-view',
  templateUrl: './monitorador-view.component.html',
  styleUrls: ['./monitorador-view.component.scss']
})
export class MonitoradorViewComponent implements OnInit {
  displayedColumns: string[] = ['position', 'endereco', 'bairro', 'cidade', 'estado'];
  dataSource: MatTableDataSource<Endereco> = new MatTableDataSource<Endereco>;
  monitorador: Monitorador = new Monitorador();

  constructor(
    public dialogRef: MatDialogRef<MonitoradorViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private monitoradorService: MonitoradorService,
    private mySnackbarService: MySnackbarService
  ) {}

  ngOnInit(): void {
    this.monitorador = this.data;
    this.dataSource.data = this.monitorador.enderecoList;
    console.log(this.monitorador);
  }

  ativarMonitorador(){
    if (confirm("Tem certeza que deseja ativar o monitorador " + this.getNome() + "?")){
      if (this.monitorador.id) this.monitoradorService.ativarMonitorador(this.monitorador.id).subscribe({
        next: (m => {
          this.monitorador.ativo = m.ativo;
          this.mySnackbarService.openSnackBar("Monitorador ativado!", "success");
        }),
        error: (err => {
          this.mySnackbarService.openSnackBar(err.error, "danger");
        })
      });
      else this.mySnackbarService.openSnackBar("Não foi possível ativar o monitorador!", "danger");
    }
  }

  desativarMonitorador(){
    if (confirm("Tem certeza que deseja desativar o monitorador " + this.getNome() + "?")){
      if (this.monitorador.id) this.monitoradorService.desativarMonitorador(this.monitorador.id).subscribe({
        next: (m => {
          this.monitorador.ativo = m.ativo;
          this.mySnackbarService.openSnackBar("Monitorador desativado!", "success");
        }),
        error: (err => {
          this.mySnackbarService.openSnackBar(err.error, "danger");
        })
      });
      else this.mySnackbarService.openSnackBar("Não foi possível desativar o monitorador!", "danger");
    }
  }

  cancelar(){
    this.dialogRef.close();
  }

  private getNome(){
    if (this.monitorador.tipoPessoa.toString() == "PESSOA_FISICA") return this.monitorador.nome;
    else return this.monitorador.razaoSocial;
  }
}
