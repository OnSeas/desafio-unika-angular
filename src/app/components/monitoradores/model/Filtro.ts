export class Filtro
{
  busca!: string;
  tipoBusca!: Filtro.TipoPesquisa;
  pessoaFisica!: boolean;
  pessoaJuridica!: boolean;
  soAtivados!: boolean;
}

export namespace Filtro
{
  export enum TipoPesquisa
  {
    CPF,
    CNPJ,
    EMAIL,
    UNDEFINED
  }
}
