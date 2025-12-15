"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Acao = void 0;
class Acao {
    constructor(id, origem, alvo, descricao, valorDano, dataHora) {
        this._id = id;
        this._origem = origem;
        this._alvo = alvo;
        this._descricao = descricao;
        this._valorDano = valorDano;
        this._dataHora = dataHora;
    }
    get valorDano() {
        return this._valorDano;
    }
    get id() {
        return this._id;
    }
    get origem() {
        return this._origem;
    }
    get alvo() {
        return this._alvo;
    }
    get descricao() {
        return this._descricao;
    }
    get dataHora() {
        return this._dataHora;
    }
}
exports.Acao = Acao;
