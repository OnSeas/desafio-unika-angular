import {Component, OnInit, ViewChild} from '@angular/core';
import {Monitorador} from "../model/Monitorador";
import {MonitoradorService} from "../monitorador.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {MonitoradorViewComponent} from "../monitorador-view/monitorador-view.component";
import {Filtro} from "../model/Filtro";
import {MatPaginator} from "@angular/material/paginator";
import {MySnackbarService} from "../../my-snackbar/my-snackbar.service";
import {MonitoradorImportComponent} from "../monitorador-import/monitorador-import.component";
import {delay} from "rxjs";
import TipoPesquisa = Filtro.TipoPesquisa;

@Component({
  selector: 'app-monitorador-list',
  templateUrl: './monitorador-list.component.html',
  styleUrls: ['./monitorador-list.component.scss']
})
export class MonitoradorListComponent implements OnInit  {
  displayedColumns: string[] = ['position', 'tipoPessoa', 'email', 'dataNascimento', 'CPF/CNPJ', 'opcoes', 'info'];
  dataSource = new MatTableDataSource<Monitorador>;
  filtro: Filtro = new Filtro();
  todosMonitoradores: Monitorador[] = [];
  pesquisaAtiva: boolean = false;
  tipoPesquisa = TipoPesquisa;


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private monitoradorService: MonitoradorService,
    public dialog: MatDialog,
    private mySnackbarService: MySnackbarService
  ) {
  }

  ngOnInit(): void {
    this.monitoradorService.listarMinitoradores().subscribe({
    next: (monitoradores:Monitorador[]) => {
      this.todosMonitoradores = monitoradores;
      this.dataSource.data = this.todosMonitoradores;
      this.dataSource.paginator = this.paginator;
    }, error: (err)=>{
        this.mySnackbarService.openSnackBar(err.error, "danger");
      }
    });

    this.listenAtualizarLista();
  }

  listenAtualizarLista(){
    this.monitoradorService.loadingListAsync
      .pipe(delay(0))
      .subscribe((list) => {
        this.todosMonitoradores = list;
        this.dataSource.data = this.todosMonitoradores;
      });
  }

  deletarMonitorador(monitorador: Monitorador){
    let confirmDialogMsg: string;
    if (monitorador.tipoPessoa.toString() == "PESSOA_FISICA") confirmDialogMsg = "Tem certeza que deseja deletar o Monitorador "+monitorador.nome+"?";
    else confirmDialogMsg = "Tem certeza que deseja deletar o Monitorador "+monitorador.razaoSocial+"?"

    if (confirm(confirmDialogMsg)){
      if(monitorador.id) this.monitoradorService.deletarMonitorador(monitorador.id).subscribe({
          next: (monitoradorRes) =>{
            this.mySnackbarService.openSnackBar("Monitorador excluído com sucesso!", "success");
            this.dataSource.data = this.dataSource.data.filter(m => m.id != monitoradorRes.id);
          }, error: (err) =>{
            this.mySnackbarService.openSnackBar(err.error, "danger");
          }
        });
      else this.mySnackbarService.openSnackBar("Erro ao buscar monitorador!", "danger");
    }
  }

  openViewDialog(monitorador: Monitorador){
    const dialogView = this.dialog.open(MonitoradorViewComponent, {
      data: monitorador,
      width: '700px'
    });

    dialogView.afterClosed().subscribe(() => {});
  }

  filtrarMonitoradores(){
    if (this.filtro.busca == null) this.filtro.busca = '';
    if (this.filtro.soAtivados == null) this.filtro.soAtivados = false;
    if (this.filtro.pessoaFisica == null) this.filtro.pessoaFisica = false;
    if (this.filtro.pessoaJuridica == null) this.filtro.pessoaJuridica = false;
    if (this.filtro.tipoBusca == null) this.filtro.tipoBusca = TipoPesquisa.UNDEFINED;
    console.log(this.filtro);

    if (this.isValid(this.filtro)){
      this.monitoradorService.filtrarMonitoradores(this.filtro).subscribe({
        next: (monitoradores) => {
          if (monitoradores.length > 0){
            this.dataSource.data = monitoradores;
            this.mySnackbarService.openSnackBar("Monitoradores filtrados!", "success");
          } else this.mySnackbarService.openSnackBar("Não há monitoradores com as informações selecionadas!", "danger");

        },
        error: (err) =>{
          this.mySnackbarService.openSnackBar(err.error, "danger");
        }
      });
    } else this.mySnackbarService.openSnackBar("Pesquisa vazia.", "danger");
  }

  private isValid(filtro: Filtro): boolean{
    return !((filtro.busca == null || filtro.busca == '') && !filtro.soAtivados && !filtro.pessoaFisica && !filtro.pessoaJuridica);
  }

  limparPesquisa(){
    this.pesquisaAtiva = false;
    this.dataSource.data = this.todosMonitoradores;
    this.filtro = new Filtro();
    this.mySnackbarService.openSnackBar("Mostrando todos os monitoradores!", "success");
  }

  baixarPdf() {
    this.monitoradorService.gerarRelatorioPdf(null).subscribe({
      next: (data) => {
        var file = new Blob([data], { type: 'application/pdf' });
        var fileURL = URL.createObjectURL(file);
        var a = document.createElement('a');
        a.href = fileURL;
        a.target = '_blank';
        a.download = 'relatorioGeral.pdf';
        document.body.appendChild(a);
        a.click();
      },
      error: (err) => {
        this.mySnackbarService.openSnackBar(err.error, "danger");
    }
    })
  }

  baixarXlsx() {
    this.monitoradorService.gerarExcel().subscribe({
      next: (data) => {
        var file = new Blob([data], { type: 'application/octet-stream' });
        var fileURL = URL.createObjectURL(file);
        var a = document.createElement('a');
        a.href = fileURL;
        a.target = '_blank';
        a.download = 'monitoradores.xlsx';
        document.body.appendChild(a);
        a.click();
      },
      error: (err) => {
        this.mySnackbarService.openSnackBar(err.error, "danger");
      }
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(MonitoradorImportComponent, {
      width: '500px'
    });
  }
}
