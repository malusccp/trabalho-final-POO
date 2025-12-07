import { Personagem } from "./personagem";
import { Acao } from "./acao";

export class Arqueiro extends Personagem {
    protected _ataqueMultiplo: number;

    constructor(id: number, nome: string, ataque: number, ataqueMultiplo: number) {
        super(id, nome, ataque);
        this._ataqueMultiplo = ataqueMultiplo;
    }

    
    atacar(alvo: Personagem): Acao {
        if(!this.estaVivo()){
        throw new Error("O personagem foi de Vasco. Não é possível fazer um ataque")
            }
        if(this._id == alvo.id){
        throw new Error("O personagem não pode atacar a si mesmo!")
            }

        let qtdDano = this._ataque;

        if(Math.random() > 0.5){
            qtdDano *= this._ataqueMultiplo
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
    
