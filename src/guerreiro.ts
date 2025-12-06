import { Personagem } from "./personagem";

export class Guerreiro extends Personagem{
    private _defesa: number;

    constructor(id: number, nome: string, vida: number, ataque: number, defesa: number) {
        super(id, nome, vida, ataque);
        this._defesa = defesa;
    }

    public get defesa(): number{
        return this._defesa
    }

    obterNomeAtaque(): string {
        return "atacou com sua espada"
    }

    public calcularDano(alvo: Personagem): number {
        let dano = this.ataque;
        if(this.vida < 30){
            dano = dano * 1.3;
        }
        return dano;
    }

    public receberDano(valor: number): void {
        let danoReal = valor - this._defesa;

        if (danoReal <= 0){
            super.receberDano(0);
        }
        else{
            super.receberDano(danoReal);
        }
    }
}