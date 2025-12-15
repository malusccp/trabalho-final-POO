"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Guerreiro = void 0;
const acao_1 = require("./acao");
const personagem_1 = require("./personagem");
class Guerreiro extends personagem_1.Personagem {
    constructor(id, nome, ataque, defesa) {
        super(id, nome, ataque);
        this._defesa = defesa;
    }
    receberDano(valor) {
        let danoRestante = valor - this._defesa;
        if (danoRestante < 0) {
            danoRestante = 0;
            console.log("O ataque foi bloqueado pela defesa!");
        }
        super.receberDano(danoRestante);
    }
    receberDanoMago(valor) {
        console.log("A defesa do Guerreiro foi ignorada pelo Mago");
        super.receberDanoMago(valor);
    }
    atacar(alvo) {
        if (!this.estaVivo()) {
            throw new Error("O personagem foi de Vasco. Não é possível fazer um ataque");
        }
        if (this._id == alvo.id) {
            throw new Error("O personagem não pode atacar a si mesmo!");
        }
        let qtdDano = this._ataque;
        let descricaoAtaque = "ataque com espada";
        if (this._vida < 30) {
            qtdDano = Math.floor(qtdDano * 1.3);
            descricaoAtaque += " (FÚRIA!)";
        }
        alvo.receberDano(qtdDano);
        let acao = new acao_1.Acao(1, this, alvo, descricaoAtaque, qtdDano, new Date());
        this.registrarAcao(acao);
        return acao;
    }
}
exports.Guerreiro = Guerreiro;
