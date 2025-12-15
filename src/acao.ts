import { Personagem } from "./personagem";

export class Acao {
    private _id: number;
    private _origem: Personagem;
    private _alvo: Personagem;
    private _descricao: string; 
    private _valorDano: number;
    private _dataHora: Date;

    constructor(
        id: number, 
        origem: Personagem, 
        alvo: Personagem, 
        descricao: string, 
        valorDano: number, 
        dataHora: Date
    ) {
        this._id = id;
        this._origem = origem;
        this._alvo = alvo;
        this._descricao = descricao;
        this._valorDano = valorDano;
        this._dataHora = dataHora;
    }

    public get valorDano(): number {
        return this._valorDano;
    }

    public get id(): number {
        return this._id;
    }

    public get origem(): Personagem {
        return this._origem;
    }

    public get alvo(): Personagem {
        return this._alvo;
    }

    public get descricao(): string {
        return this._descricao;
    }

    public get dataHora(): Date {
        return this._dataHora;
    }
}