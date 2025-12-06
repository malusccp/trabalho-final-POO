import { Personagem } from "./personagem";

export class Arqueiro extends Personagem {
    private _ataqueMultiplo: number;

    constructor(id: number, nome: string, ataque: number, vida: number, ataqueMultiplo: number) {
        super(id, nome, ataque, vida);
        this._ataqueMultiplo = ataqueMultiplo;
    }

    public obterNomeAtaque(): string {
        return "disparou flechas em";
    }

    public calcularDano(alvo: Personagem): number {
        let chance = Math.random();
        
        if (chance < 0.5) {
            return this.ataque * this._ataqueMultiplo;
        } else {

            return this.ataque;
        }
    }
}