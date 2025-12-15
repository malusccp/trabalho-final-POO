"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Personagem = void 0;
const acao_1 = require("./acao");
class Personagem {
    constructor(id, nome, ataque) {
        this._id = id;
        this._nome = nome;
        this._ataque = ataque;
        this._vida = 100;
        this._historico = [];
    }
    receberDano(valor) {
        this._vida -= valor;
        if (this._vida <= 0) { // Vida não pode ser negativa
            this._vida = 0;
        }
    }
    receberDanoMago(valor) {
        this._vida -= valor;
        if (this._vida <= 0) {
            this._vida = 0;
        }
    }
    get id() {
        return this._id;
    }
    get nome() {
        return this._nome;
    }
    get vida() {
        return this._vida;
    }
    get ataque() {
        return this._ataque;
    }
    estaVivo() {
        return this._vida > 0;
    }
    atacar(alvo) {
        if (!this.estaVivo()) {
            throw new Error("O personagem foi de Vasco. Não é possível fazer um ataque");
        }
        if (this._id == alvo._id) {
            throw new Error("O personagem não pode atacar a si mesmo!");
        }
        let qtdDano = this._ataque;
        alvo.receberDano(qtdDano);
        let acao = new acao_1.Acao(1, this, alvo, "Ataque Executado", qtdDano, new Date());
        this.registrarAcao(acao);
        return acao;
    }
    registrarAcao(acao) {
        this._historico.push(acao);
    }
}
exports.Personagem = Personagem;
