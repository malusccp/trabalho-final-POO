import { Personagem } from "./personagem";

export class Acao {
    public id: number;
    public origem: Personagem;
    public alvo: Personagem;
    public descricao: string; 
    public valorDano: number;
    public dataHora: Date;

    constructor(
        id: number, 
        origem: Personagem, 
        alvo: Personagem, 
        descricao: string, 
        valorDano: number, 
        dataHora: Date
    ) {
        this.id = id;
        this.origem = origem;
        this.alvo = alvo;
        this.descricao = descricao;
        this.valorDano = valorDano;
        this.dataHora = dataHora;
    }
}