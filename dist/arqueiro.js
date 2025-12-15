"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arqueiro = void 0;
const personagem_1 = require("./personagem");
const acao_1 = require("./acao");
class Arqueiro extends personagem_1.Personagem {
    constructor(id, nome, ataque, ataqueMultiplo) {
        super(id, nome, ataque);
        this._chanceAtaque = 0.5;
        this._ataqueMultiplo = ataqueMultiplo;
    }
    atacar(alvo) {
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
        let acao = new acao_1.Acao(1, this, alvo, descricaoAtaque, qtdDano, new Date());
        this.registrarAcao(acao);
        return acao;
    }
}
exports.Arqueiro = Arqueiro;
