import { Personagem } from "./personagem";
import { Acao } from "./acao";

export class Batalha{
    private personagens: Personagem[] = [];
    private acoes: Acao[] = [];

    adicionarPersonagem(p: Personagem): void{
        if(this.personagens.find(personagem => personagem.nome == p.nome)){
            throw new Error("Erro! O nome escolhido já pertence a outro personagem")
    }
        this.personagens.push(p);}
    
    turno(atacanteId: number, defensorId: number):Acao[] {
        let atacante = this.personagens.find(personagem => personagem.id === atacanteId)
        let defensor = this.personagens.find(personagem => personagem.id === defensorId)

        if(!atacante || !defensor){
            throw new Error("O personagem não foi encontrado!")
        }

        let acaoTurno = atacante.atacar(defensor);
        this.acoes.push(acaoTurno)

            return [acaoTurno]
    }

    consultarPersonagem(nome: string): Personagem {
        let personagemEncontrado = this.personagens.find(p => p.nome === nome);
        
        if (!personagemEncontrado) {
            throw new Error("Personagem não encontrado!");
        }
        
        return personagemEncontrado;
    }

    listarPersonagens(): Personagem[] {
        return this.personagens;
    }

    listarAcoes(): Acao[] {
        return this.acoes;
    }

    verificarVencedor(): Personagem {
        let sobreviventes = this.personagens.filter(personagem => personagem.estaVivo());

        if (sobreviventes.length === 1) {
            return sobreviventes[0] as Personagem;
        } else if (sobreviventes.length === 0) {
            throw new Error("Todos os personagens morreram. Empate!");
        } else {
            throw new Error("A batalha ainda não acabou. Restam " + sobreviventes.length + " sobreviventes.");
        }
    }
}