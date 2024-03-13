import {Component, Inject, inject, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from "@angular/material/snack-bar";

@Component({
  selector: 'app-my-snackbar',
  templateUrl: './my-snackbar.component.html',
  styleUrls: ['./my-snackbar.component.scss']
})
export class MySnackbarComponent implements OnInit {
  snackBarRef = inject(MatSnackBarRef);
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

}
