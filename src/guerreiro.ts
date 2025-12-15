import { Acao } from "./acao";
import { Personagem } from "./personagem";

export class Guerreiro extends Personagem {
    private _defesa: number;

    constructor(id: number, nome: string, ataque: number, defesa: number) {
        super(id, nome, ataque);
        this._defesa = defesa;
    }

    receberDano(valor: number): void {
        let danoRestante = valor - this._defesa;

        if (danoRestante < 0) {
            danoRestante = 0;
            console.log("O ataque foi bloqueado pela defesa!");
        }

        super.receberDano(danoRestante);
    }

    receberDanoMago(valor:number){
        console.log("A defesa do Guerreiro foi ignorada pelo Mago");

        super.receberDanoMago(valor);
    }

    atacar(alvo: Personagem): Acao {
        if(!this.estaVivo()){
        throw new Error("O personagem foi de Vasco. Não é possível fazer um ataque")
        }
        if(this._id == alvo.id){
            throw new Error("O personagem não pode atacar a si mesmo!")
        }

        let qtdDano = this._ataque;
        let descricaoAtaque = "ataque com espada";

        if (this._vida < 30) {
            qtdDano = Math.floor(qtdDano * 1.3);
            descricaoAtaque += " (FÚRIA!)";
        }

        alvo.receberDano(qtdDano);

        let acao = new Acao(
        1,                  
        this,              
        alvo,               
        descricaoAtaque,    
        qtdDano,           
        new Date()   );

        this.registrarAcao(acao);

        return acao;
    }
}