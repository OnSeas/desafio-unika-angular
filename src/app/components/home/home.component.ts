import { Component, OnInit } from '@angular/core';
import {MonitoradorImportComponent} from "../monitoradores/monitorador-import/monitorador-import.component";
import {Endereco} from "../monitoradores/endereco/Endereco";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
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

}
