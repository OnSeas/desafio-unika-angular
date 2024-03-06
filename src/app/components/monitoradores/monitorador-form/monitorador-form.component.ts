import {Component, OnInit} from '@angular/core';
import {Monitorador} from "../Monitorador";
import {MonitoradorService} from "../monitorador.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TipoPessoa} from "../TipoPessoa";

@Component({
  selector: 'app-monitorador-form',
  templateUrl: './monitorador-form.component.html',
  styleUrls: ['./monitorador-form.component.scss']
})
export class MonitoradorFormComponent implements OnInit {

  monitorador: Monitorador = new Monitorador();
  tipoPessoa = TipoPessoa; // Para usar no html

  constructor(
    private monitoradorService: MonitoradorService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.getMonitoradorId();
    if(id){
      this.monitoradorService.buscarById(parseInt(id)).subscribe({next: (monitorador) => {
          this.monitorador = monitorador;
          monitorador.tipoPessoa = getTipoPessoa(monitorador.tipoPessoa.toString());
        },
        error: (err) => {
          alert(err.error);
        }
      });
    }
  }

  getMonitoradorId(){
    return this.route.snapshot.paramMap.get('id');
  }

  salvar(): void {
    if (!this.monitorador.id) this.monitoradorService.cadastrarMonitorador(this.monitorador).subscribe({
        next: (monitorador: Monitorador) =>{
          console.log("monitorador BD: "+monitorador);
          alert("Monitorador criado com sucesso!");
          this.router.navigate(['../monitoradores']);
        },
        error: (erro) => {
          alert(erro.error);
        }
      });

    else this.monitoradorService.editarMonitorador(this.monitorador, this.monitorador.id).subscribe({
      next: (monitorador : Monitorador) => {
        alert("Monitorador atualizado com sucesso!");
        this.router.navigate(['../monitoradores']);
      },
      error: (err) => {
      alert(err.error);
    }
    });
  }
}

function getTipoPessoa(tipo: string): TipoPessoa { // todo ERRO SE NÃO FOR NENHUM
  if (tipo === "PESSOA_FISICA") return TipoPessoa.PESSOA_FISICA;
  else return TipoPessoa.PESSOA_JURIDICA;
}
