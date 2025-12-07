import { Personagem } from "./personagem";
import { Guerreiro } from "./guerreiro";
import { Arqueiro } from "./arqueiro";
import { Acao } from "./acao";

export class Mago extends Personagem{
    constructor(id: number, nome: string, ataque: number) {
        super(id, nome, ataque);
    }

    atacar(alvo: Personagem): Acao {
    if(!this.estaVivo()){
    throw new Error("O personagem foi de Vasco. Não é possível fazer um ataque")
        }
    if(this._id == alvo.id){
    throw new Error("O personagem não pode atacar a si mesmo!")
        }
        let qtdDano = this._ataque;
        if(alvo instanceof Guerreiro){
            qtdDano += alvo.defesa;
        }
        if(alvo instanceof Arqueiro){
            qtdDano *= 2;
        }

    alvo.receberDano(qtdDano);
    this.receberDano(10)


    let acao = { id: this._id,
                origem: this,
                alvo: alvo,
                descricao: "Ataque executado",
                valorDano: qtdDano,
                dataHora: new Date()
        } as Acao;
    
    let autoDano = { id: this._id,
                origem: this,
                alvo: this,
                descricao: "Auto-ataque realizado",
                valorDano: 10,
                dataHora: new Date()
        } as Acao;

    this.registrarAcao(acao)
    this.registrarAcao(autoDano)

    return acao;
}
}