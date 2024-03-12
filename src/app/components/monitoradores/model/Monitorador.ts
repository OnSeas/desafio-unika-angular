import {TipoPessoa} from "./TipoPessoa";
import {Endereco} from "../endereco/Endereco";

export class Monitorador {
  id?:number;
  tipoPessoa!: TipoPessoa;
  email?: string;
  //TODO data de nascimento - ver como é melhor de fazer e conversão correta.;
  dataNascimento?: string;
  cpf?: string;
  rg?: string;
  nome?: string;
  cnpj?: string;
  razaoSocial?: string;
  inscricaoEstadual?: string;
  ativo?: boolean;
  enderecoList!: Endereco[];
}
