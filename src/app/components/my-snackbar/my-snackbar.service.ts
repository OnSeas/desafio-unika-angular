import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {MySnackbarComponent} from "./my-snackbar.component";

@Injectable({
  providedIn: 'root'
})
export class MySnackbarService {
  private classeSnackbar: string = '';
  constructor(private snackBar: MatSnackBar) {}
  public openSnackBar(message: string, snackType: string) {
    switch (snackType){
      case "success":
        this.classeSnackbar= 'success';
        break;
      case "danger":
        this.classeSnackbar= 'danger';
        break;
      default:
        this.classeSnackbar= 'default';
    }

    this.snackBar.openFromComponent(MySnackbarComponent, {
      duration: 4500,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: [this.classeSnackbar],
      data: {message: message}
    });
  }
}
