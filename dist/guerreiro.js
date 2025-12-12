"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Guerreiro = void 0;
const personagem_1 = require("./personagem");
class Guerreiro extends personagem_1.Personagem {
    constructor(id, nome, ataque, defesa) {
        super(id, nome, ataque);
        this._defesa = defesa;
    }
    receberDano(valor) {
        if (valor < this._ataque) {
            valor = 0;
            console.log("Ataque bloqueado pela armadura!");
        }
        super.receberDano(valor);
    }
    atacar(alvo) {
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
        };
        this.registrarAcao(acao);
        return acao;
    }
}
exports.Guerreiro = Guerreiro;
