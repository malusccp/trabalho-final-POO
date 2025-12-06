"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Personagem = void 0;
class Personagem {
    _id;
    _nome;
    _vida;
    _ataque;
    _historico;
    constructor(id, nome, ataque, vidaInicial = 100) {
        this._id = id;
        this._nome = nome;
        this._ataque = ataque;
        this._vida = vidaInicial;
        this._historico = [];
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
    get historico() {
        return this._historico;
    }
    get estaVivo() {
        return this._vida > 0;
    }
    receberDado(valor) {
        this._vida -= valor;
        if (this._vida < 0) {
            this._vida = 0;
        }
    }
    registrarAcao(acao) {
        this._historico.push(acao);
    }
    atacar(alvo) {
        if (!this.estaVivo) {
            console.log(`O personagem ${this._nome} foi de Vasco e não pode atacar`);
        }
        else if (!alvo.estaVivo) {
            console.log(`O alvo ${alvo.nome} foi de Vasco, logo, não pode ser atacado`);
        }
        else if (this._id == alvo.id) {
            console.log(`O personagem não pode atacar a si próprio`);
        }
    }
}
exports.Personagem = Personagem;
