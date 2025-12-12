"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mago = void 0;
const personagem_1 = require("./personagem");
const arqueiro_1 = require("./arqueiro");
class Mago extends personagem_1.Personagem {
    constructor(id, nome, ataque) {
        super(id, nome, ataque);
    }
    atacar(alvo) {
        if (!this.estaVivo()) {
            throw new Error("O personagem foi de Vasco. Não é possível fazer um ataque");
        }
        if (this._id === alvo.id) {
            throw new Error("O personagem não pode atacar a si mesmo!");
        }
        let qtdDano = this._ataque;
        if (alvo instanceof arqueiro_1.Arqueiro) {
            qtdDano *= 2;
        }
        alvo.receberDano(qtdDano);
        this._vida -= 10;
        if (this._vida < 0)
            this._vida = 0;
        let acao = {
            id: this._id,
            origem: this,
            alvo: alvo,
            descricao: "ataque mágico (Custo: 10 HP)",
            valorDano: qtdDano,
            dataHora: new Date()
        };
        this.registrarAcao(acao);
        return acao;
    }
}
exports.Mago = Mago;
