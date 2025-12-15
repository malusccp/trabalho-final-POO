import { Personagem } from "./personagem";
import { Acao } from "./acao";

export class Professor extends Personagem {
    protected _sabedoria: number;

    constructor(id: number, nome: string, ataque: number, sabedoria: number) {
        super(id, nome, ataque);
        this._sabedoria = sabedoria;
    }

    atacar(alvo: Personagem): Acao {
        if (!this.estaVivo()) {
            throw new Error("O personagem foi de Vasco. Não é possível fazer um ataque");
        }
        if (this._id === alvo.id) {
            throw new Error("O personagem não pode atacar a si mesmo!");
        }

        let qtdDano = this._ataque + this._sabedoria;
        let descricaoAtaque = "ataque de sabedoria"
        alvo.receberDano(qtdDano);

        this._sabedoria += 2;

        let acao = new Acao(
        1,                  
        this,              
        alvo,               
        descricaoAtaque,    
        qtdDano,           
        new Date()   );

        this.registrarAcao(acao);

        return acao;
    }
}