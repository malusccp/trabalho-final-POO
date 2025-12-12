import { Acao } from "./acao";
import { Personagem } from "./personagem";

export class Guerreiro extends Personagem {
    protected _defesa: number;

    constructor(id: number, nome: string, ataque: number, defesa: number) {
        super(id, nome, ataque);
        this._defesa = defesa;
    }

    receberDano(valor: number): void {
        if (valor < this._ataque) {
            valor = 0; 
            console.log("Ataque bloqueado pela armadura!");
        }
        super.receberDano(valor);
    }
    atacar(alvo: Personagem): Acao {
        if (!this.estaVivo()) {
            throw new Error("O personagem morreu e não pode atacar.");
        }
        if (this._id === alvo.id) {
            throw new Error("Não é possível atacar a si mesmo.");
        }

        let qtdDano = this._ataque;
        let desc = "ataque com espada";

        if (this._vida < 30) {
            qtdDano = Math.floor(qtdDano * 1.3);
            desc += " (FÚRIA!)";
        }

        alvo.receberDano(qtdDano);

        let acao = {
            id: this._id,
            origem: this,
            alvo: alvo,
            descricao: desc,
            valorDano: qtdDano,
            dataHora: new Date()
        } as Acao;

        this.registrarAcao(acao);

        return acao;
    }
}