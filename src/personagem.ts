import { Acao } from "./acao"

export class Personagem{

    protected _id: number;
    protected _nome: string;
    protected _vida: number;
    protected _ataque: number;
    protected _historico: Acao[]

    constructor(id: number, nome: string, ataque: number){
        this._id = id;
        this._nome = nome;
        this._ataque = ataque;
        this._vida = 100;
        this._historico = [];

    }

    receberDano(valor: number): void{
        this._vida -= valor;
        if(this._vida <= 0){ // Vida não pode ser negativa
            this._vida = 0;
        }
    }

    receberDanoMago(valor: number): void {

    this._vida -= valor; 
    
    if(this._vida <= 0){ 
        this._vida = 0;
    }
}

    get id(){
        return this._id
    }

    get nome(){
        return this._nome
    }

    get vida(){
        return this._vida
    }

    get ataque(){
        return this._ataque
    }

    estaVivo(): boolean{
        return this._vida > 0;
    }

    atacar(alvo: Personagem): Acao{
        if(!this.estaVivo()){
        throw new Error("O personagem foi de Vasco. Não é possível fazer um ataque")
        }
        if(this._id == alvo._id){
            throw new Error("O personagem não pode atacar a si mesmo!")
        }
        let qtdDano = this._ataque;

        alvo.receberDano(qtdDano);

        let acao = new Acao(
        1,                  
        this,              
        alvo,               
        "Ataque Executado",    
        qtdDano,           
        new Date()   );

        this.registrarAcao(acao)

        return acao;
    }

    registrarAcao(acao: Acao): void{
        this._historico.push(acao);
    }


}