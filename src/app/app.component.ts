import {Component, OnInit} from '@angular/core';
import {LoadingService} from "./loading.service";
import {delay} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'app-monitoradores';

  loading: boolean = false

  constructor(
    private _loading: LoadingService
  ) {
  }

  ngOnInit() {
    this.listenToLoading();
  }

  // listenToLoading + LoaderService + HttpRequestInterceptor servem para mostrar o spinner na tela enquanto espera por um http request.
  // Foram feitos com base nesse site:  https://medium.com/swlh/angular-loading-spinner-using-http-interceptor-63c1bb76517b
  listenToLoading(): void { // TODO dar uma analisada melhor
    this._loading.loadingSub
      .pipe(delay(0))
      .subscribe((loading: boolean) => {
        this.loading = loading; // Atualiza o loading local com base no BehaviorSubject do service.
        console.log("Loading = " + this.loading);
      });
  }
}
