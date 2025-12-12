"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Personagem = void 0;
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
        let acao = { id: this._id,
            origem: this,
            alvo: alvo,
            descricao: "Ataque executado",
            valorDano: qtdDano,
            dataHora: new Date()
        };
        this.registrarAcao(acao);
        return acao;
    }
    registrarAcao(acao) {
        this._historico.push(acao);
    }
}
exports.Personagem = Personagem;
