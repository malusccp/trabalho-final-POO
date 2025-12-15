import { Personagem } from "./personagem";
import { Acao } from "./acao";

export class Arqueiro extends Personagem {
    private _ataqueMultiplo: number;
    private _chanceAtaque: number = 0.5

    constructor(id: number, nome: string, ataque: number, ataqueMultiplo: number) {
        super(id, nome, ataque);
        this._ataqueMultiplo = ataqueMultiplo;
    }

    atacar(alvo: Personagem): Acao {
        if (!this.estaVivo()) {
            throw new Error("O personagem foi de Vasco. Não é possível fazer um ataque");
        }
        if (this._id === alvo.id) {
            throw new Error("O personagem não pode atacar a si mesmo!");
        }

        let qtdDano = this._ataque;
        let descricaoAtaque = "disparo de flecha";

        if (Math.random() > this._chanceAtaque) {
            qtdDano *= this._ataqueMultiplo;
            descricaoAtaque = "ataque Múltiplo";
        }

        alvo.receberDano(qtdDano);

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