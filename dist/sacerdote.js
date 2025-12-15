"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sacerdote = void 0;
const personagem_1 = require("./personagem");
const acao_1 = require("./acao");
const batalha_1 = require("./batalha");
let batalha = new batalha_1.Batalha();
class Sacerdote extends personagem_1.Personagem {
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
        let qtdDano = this.ataque;
        let descricaoAtaque = "ataque de cura";
        alvo.receberDano(qtdDano);
        qtdDano *= -1;
        alvo.receberDano(qtdDano / 2);
        let acao = new acao_1.Acao(1, this, alvo, descricaoAtaque, qtdDano, new Date());
        this.registrarAcao(acao);
        return acao;
    }
    receberDano(valor) {
        super.receberDano(valor);
        let personagens = batalha.listarPersonagens(2);
        personagens.filter(p => p.id !== this.id);
        personagens.forEach(p => {
            let qtdDano = p.vida / 2;
            p.receberDano(qtdDano);
        });
    }
}
exports.Sacerdote = Sacerdote;
