import { Personagem } from "./personagem";
import { Guerreiro } from "./guerreiro";
import { Arqueiro } from "./arqueiro";
import { Acao } from "./acao";

export class Mago extends Personagem{
    constructor(id: number, nome: string, ataque: number, vida: number = 100) {
        super(id, nome, ataque, vida);
    }

    public obterNomeAtaque(): string {
        return "lançou um feitiço em";
    }

    public calcularDano(alvo: Personagem): number {
        let dano = this.ataque

        if (alvo instanceof Arqueiro){
            dano *= 2;
        }

        if (alvo instanceof Guerreiro){
            dano += alvo.defesa;
        }

        return dano;
    }
    public aposAtaque(): void {
        this.receberDano(10)

        let autoDano:Acao = {
            id: Date.now() + 1, 
            origem: this, 
            alvo: this, 
            descricao: `${this.nome} perdeu energia vital ao conjurar magia`, 
            valorDano: 10,
            dataHora: new Date()
        };
        this.registrarAcao(autoDano);
    }
}