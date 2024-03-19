import {Component, OnInit} from '@angular/core';
import {LoadingService} from "./loading.service";
import {delay} from "rxjs";
import {Endereco} from "./components/monitoradores/endereco/Endereco";
import {MatDialog} from "@angular/material/dialog";
import {MonitoradorImportComponent} from "./components/monitoradores/monitorador-import/monitorador-import.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'app-monitoradores';

  loading: boolean = false

  constructor(
    private _loading: LoadingService,
    public dialog: MatDialog,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.listenToLoading();
  }

  openDialog(): void {
      const dialogRef = this.dialog.open(MonitoradorImportComponent, {
        width: '500px'
      });

      dialogRef.afterClosed().subscribe((endResult: Endereco) => {
        if (endResult){
          this.router.navigate(['monitoradores/list'], {replaceUrl: true});
        }
      });
  }

  // listenToLoading + LoaderService + HttpRequestInterceptor servem para mostrar o spinner na tela enquanto espera por um http request.
  // Foram feitos com base nesse site:  https://medium.com/swlh/angular-loading-spinner-using-http-interceptor-63c1bb76517b
  listenToLoading(): void {
    this._loading.loadingSub
      .pipe(delay(0))
      .subscribe((loading: boolean) => {
        this.loading = loading; // Atualiza o loading local com base no BehaviorSubject do service.
        console.log("Loading = " + this.loading);
      });
  }
}
