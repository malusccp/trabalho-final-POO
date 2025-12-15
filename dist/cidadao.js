"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cidadao = void 0;
const acao_1 = require("./acao");
const personagem_1 = require("./personagem");
class Cidadao extends personagem_1.Personagem {
    constructor(id, nome, ataque) {
        super(id, nome, ataque);
    }
    receberDano() {
        let qtdDano = 100;
        super.receberDano(qtdDano);
    }
    atacar(alvo) {
        if (!this.estaVivo()) {
            throw new Error("O personagem foi de Vasco. Não é possível fazer um ataque");
        }
        if (this._id === alvo.id) {
            throw new Error("O personagem não pode atacar a si mesmo!");
        }
        let qtdDano = this._ataque;
        let descricaoAtaque = "ataque não ocorreu";
        alvo.receberDano(qtdDano);
        let acao = new acao_1.Acao(1, this, alvo, descricaoAtaque, qtdDano, new Date());
        this.registrarAcao(acao);
        return acao;
    }
}
exports.Cidadao = Cidadao;
