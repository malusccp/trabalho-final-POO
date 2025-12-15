import { Personagem } from "./personagem";
import { Arqueiro } from "./arqueiro";
import { Acao } from "./acao";
import { Guerreiro } from "./guerreiro";

export class Mago extends Personagem {
    constructor(id: number, nome: string, ataque: number) {
        super(id, nome, ataque);
    }

    atacar(alvo: Personagem): Acao {
        if (!this.estaVivo()) {
            throw new Error("O personagem foi de Vasco. Não é possível fazer um ataque");
        }
        if (this._id === alvo.id) {
            throw new Error("O personagem não pode atacar a si mesmo!");
        }

        let qtdDano = this._ataque;
        let descricaoAtaque = "ataque mágico"

        if (alvo instanceof Arqueiro) {
            qtdDano *= 2;
        }
        else if (alvo instanceof Guerreiro){
            alvo.receberDanoMago(qtdDano)
        }
        else{
            alvo.receberDano(qtdDano)
        }



        alvo.receberDano(qtdDano);

        this._vida -= 10; 
        if (this._vida < 0) this._vida = 0;

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