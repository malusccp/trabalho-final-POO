"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Professor = void 0;
const personagem_1 = require("./personagem");
class Professor extends personagem_1.Personagem {
    constructor(id, nome, ataque, sabedoria) {
        super(id, nome, ataque);
        this._sabedoria = sabedoria;
    }
    atacar(alvo) {
        if (!this.estaVivo()) {
            throw new Error("O personagem foi de Vasco. Não é possível fazer um ataque");
        }
        if (this._id === alvo.id) {
            throw new Error("O personagem não pode atacar a si mesmo!");
        }
        let qtdDano = this._ataque + this._sabedoria;
        alvo.receberDano(qtdDano);
        this._sabedoria += 2;
        let acao = {
            id: this._id,
            origem: this,
            alvo: alvo,
            descricao: "ataque de sabedoria",
            valorDano: qtdDano,
            dataHora: new Date()
        };
        this.registrarAcao(acao);
        return acao;
    }
}
exports.Professor = Professor;
