import { Personagem } from "./personagem";
import { Arqueiro } from "./arqueiro";
import { Acao } from "./acao";

export class Mago extends Personagem {
    constructor(id: number, nome: string, ataque: number) {
        super(id, nome, ataque);
    }

    atacar(alvo: Personagem): Acao {
        if (!this.estaVivo()) {
            throw new Error("O personagem foi de Vasco. Não é possível fazer um ataque");
        }
        if (this._id === alvo.id) {
            throw new Error("O personagem não pode atacar a si mesmo!");
        }

        let qtdDano = this._ataque;

        if (alvo instanceof Arqueiro) {
            qtdDano *= 2;
        }

        alvo.receberDano(qtdDano);

        this._vida -= 10; 
        if (this._vida < 0) this._vida = 0;

        let acao = {
            id: this._id,
            origem: this,
            alvo: alvo,
            descricao: "ataque mágico (Custo: 10 HP)",
            valorDano: qtdDano,
            dataHora: new Date()
        } as Acao;

        this.registrarAcao(acao);

        return acao;
    }
}