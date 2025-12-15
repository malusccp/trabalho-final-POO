import { Acao } from "./acao";
import { Personagem } from "./personagem";


export class Cidadao extends Personagem {
    
    constructor(id: number, nome: string, ataque: number) {
        super(id, nome, ataque);
    }

    receberDano(): void {
       let qtdDano = 100;

       super.receberDano(qtdDano)
    }

    atacar(alvo: Personagem): Acao {
        if (!this.estaVivo()) {
            throw new Error("O personagem foi de Vasco. Não é possível fazer um ataque");
        }
        if (this._id === alvo.id) {
            throw new Error("O personagem não pode atacar a si mesmo!");
        }

        let qtdDano = this._ataque
        let descricaoAtaque = "ataque não ocorreu"
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