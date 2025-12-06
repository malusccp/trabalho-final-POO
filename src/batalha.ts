import { Personagem } from "./personagem";
import { Acao } from "./acao";

export class Batalha{
    private personagens: Personagem[] = [];
    private acoes: Acao[] = [];

    public adicionarPersonagem(p: Personagem):void{
        if (this.personagens.some((personagem) => personagem.nome === p.nome)) {
            throw new Error(`Erro! Existe um personagem com o nome ${p.nome}`);
        }

        this.personagens.push(p);
    }
}