import {Component, OnInit} from '@angular/core';
import {MonitoradorService} from "../monitorador.service";
import {MySnackbarService} from "../../my-snackbar/my-snackbar.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-monitorador-import',
  templateUrl: './monitorador-import.component.html',
  styleUrls: ['./monitorador-import.component.scss']
})
export class MonitoradorImportComponent implements OnInit {

  constructor(
    private monitoradorService: MonitoradorService,
    private mySnackbarService: MySnackbarService,
    public dialogRef: MatDialogRef<MonitoradorImportComponent>
  ) { }

  ngOnInit(): void {
  }

  selectedFile: any = null;
  onFileSelected(event: any): void {
    if (event.target.files[0]){
      this.selectedFile = event.target.files[0];
    }
  }

  importar(){
    if (this.selectedFile){
      this.monitoradorService.importarMonitoradores(this.selectedFile).subscribe({
        next: (result) =>{
          this.mySnackbarService.openSnackBar("Monitores importados com sucesso!", "success");
          this.monitoradorService.atualizarListaAsync();
          this.dialogRef.close(result);
        },
        error: (err) =>{
          this.mySnackbarService.openSnackBar(err.error, "danger");
          console.log(err);
        }
      })
    }
    else this.mySnackbarService.openSnackBar("É necessário enviar um arquivo xlsx!", "danger");
  }

  cancelar(){
    this.dialogRef.close();
  }



}
