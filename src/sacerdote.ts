import { Personagem } from "./personagem";
import { Acao } from "./acao";
import { Batalha } from "./batalha";
let batalha = new Batalha()

export class Sacerdote extends Personagem {
    
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

        let qtdDano = this.ataque
        let descricaoAtaque = "ataque de cura"

        alvo.receberDano(qtdDano)

        qtdDano *= -1

        alvo.receberDano(qtdDano/2)

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

    receberDano(valor: number): void {
        super.receberDano(valor)

        let personagens: Personagem[] = batalha.listarPersonagens(2)
        
        personagens.filter(p => p.id !== this.id)
        personagens.forEach(p => {let qtdDano = p.vida/2 
            p.receberDano(qtdDano);
        });
    }





}