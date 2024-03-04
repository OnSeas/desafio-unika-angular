import {Component, OnInit} from '@angular/core';
import {Monitorador} from "../Monitorador";
import {MonitoradorService} from "../monitorador.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-monitorador-form',
  templateUrl: './monitorador-form.component.html',
  styleUrls: ['./monitorador-form.component.scss']
})
export class MonitoradorFormComponent implements OnInit {

  constructor(
    private monitoradorService: MonitoradorService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  monitorador: Monitorador = new Monitorador();

  salvar(): void {
    if (!this.monitorador.id) {
      console.log(this.monitorador);
      this.monitoradorService.cadastrarMonitorador(this.monitorador).subscribe({
        next: (monitorador: Monitorador) =>{
          console.log(monitorador);
          alert("Monitorador criado com sucesso!");
          this.router.navigate(['']);
        },
        error: (erro) => {
          alert("Requisição inválida!");
        }
      });
    }
    else console.log("Editar: " + this.monitorador);
  }
}
