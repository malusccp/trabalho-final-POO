import { Acao } from "./acao";
import { Personagem } from "./personagem";

export class Guerreiro extends Personagem{
        protected _defesa: number;

    constructor(id: number, nome: string, ataque: number, defesa: number){
        super(id, nome, ataque)
        this._defesa = defesa
    }

    get defesa(){
        return this._defesa
    }

    receberDano(valor: number): void {
        if(valor < this._defesa || valor < this._ataque){
            valor = 0
        }
        else{
            valor -= this._defesa
        }


        super.receberDano(valor);

    }

    atacar(alvo: Personagem): Acao {
        if(!this.estaVivo()){
        throw new Error("O personagem foi de Vasco. Não é possível fazer um ataque")
        }
        if(this._id == alvo.id){
            throw new Error("O personagem não pode atacar a si mesmo!")
        }
        let qtdDano = this._ataque
        if(this._vida < 30){
            qtdDano *= 1.3
        }

        alvo.receberDano(qtdDano);

             let acao = { id: this._id,
                origem: this,
                alvo: alvo,
                descricao: "Ataque executado",
                valorDano: qtdDano,
                dataHora: new Date()
        } as Acao;

        this.registrarAcao(acao);

        return acao;
            }
    }
