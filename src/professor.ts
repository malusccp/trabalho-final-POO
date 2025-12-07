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
        if (this._id == alvo.id) {
            throw new Error("O personagem não pode atacar a si mesmo!");
        }

      
        let qtdDano = this._ataque + this._sabedoria;

     
        alvo.receberDano(qtdDano);

      
        let acao = {
            id: this._id,
            origem: this,
            alvo: alvo,
            descricao: "Aula ministrada: O conhecimento dói",
            valorDano: qtdDano,
            dataHora: new Date()
        } as Acao;

        this.registrarAcao(acao);

        
        this._sabedoria += 2;

        return acao;
    }
}