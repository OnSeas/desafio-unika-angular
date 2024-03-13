import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {catchError, map, Observable} from 'rxjs';
import {LoadingService} from "./loading.service";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(
    private _loading: LoadingService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._loading.setLoading(true, request.url); // Momento em que chama o loading setando no service e consequentemente no AppComponent
    return next.handle(request).pipe(map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
      if (evt instanceof HttpResponse) {
        this._loading.setLoading(false, request.url);
      }
      return evt;
    })).pipe(
      catchError((err) => {
        this._loading.setLoading(false, request.url);
        throw err;
      })
    );
  }
}
