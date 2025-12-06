import { Acao } from "./acao"

export abstract class Personagem{
    private _id: number;
    private _nome: string;
    private _vida: number;
    private _ataque: number;
    private _historico: Acao[];

    constructor(id: number, nome: string, ataque: number, vidaInicial: number = 100) {
        this._id = id;
        this._nome = nome;
        this._ataque = ataque;
        this._vida = vidaInicial;
        this._historico = [];
}

    public get id(): number { 
        return this._id;
    }
    public get nome(): string { 
        return this._nome; 

    }
    public get vida(): number { 
        return this._vida;

     }
    public get ataque(): number { 
        return this._ataque; 

    }
    public get historico(): Acao[] { 
        return this._historico;

     }

    public get estaVivo(): boolean {
        return this._vida > 0;
    }

    public receberDano(valor: number): void{
        this._vida -= valor;

        if (this._vida < 0) {
            this._vida = 0;
        }
    }

    public registrarAcao(acao: Acao): void{
        this._historico.push(acao);
    }

public atacar(alvo: Personagem): Acao{
    if (!this.estaVivo){
        throw new Error(`O personagem ${this._nome} foi de Vasco e não pode atacar`)
    }
    if(!alvo.estaVivo){
        throw new Error(`O alvo ${alvo.nome} foi de Vasco, logo, não pode ser atacado`)
    }
    if(this._id == alvo.id){
        throw new Error(`O personagem não pode atacar a si próprio`)
    }

    let dano = this.calcularDano(alvo);

    let acao = new Acao(
        Date.now(),                                           
        this,                                                  
        alvo,                                                 
        `${this.nome} ${this.obterNomeAtaque()} ${alvo.nome}`, 
        dano,                                             
        new Date()                                             
    );
    
    this.registrarAcao(acao);
    alvo.registrarAcao(acao);

    return acao;
    }

     abstract calcularDano(alvo: Personagem): number;
     abstract obterNomeAtaque(): string;

    aposAtaque(): void{

    }
}