import PromptSync from "prompt-sync";
import { Batalha } from "./batalha";

let input = PromptSync();

export function lerNumero(mensagem: string): number {
    let valor = NaN; 
    
    
    while (isNaN(valor) || valor < 0) {
        valor = Number(input(mensagem));
        
        if (isNaN(valor) || valor < 0) {
            console.log("❌ Erro: Digite um número válido (positivo ou zero)!");
        }
    }
    
    return valor;
}

export function lerNomeUnico(label: string, batalha: Batalha): string {
    while (true) {
        let nome = input(label);
        

        if (nome.trim() === "") {
            console.log("❌ O nome não pode ser vazio!");
            continue;
        }

        let existe = batalha.listarPersonagens().some(p => p.nome === nome);

        if (existe) {
            console.log(`❌ O nome '${nome}' já está em uso! Tente outro.`);
        } else {
            return nome; 
        }
    }
}

export function inRange(mensagem: string, min: number, max: number): number{
    let num = lerNumero(mensagem)
    while(num < min || num > max){
        console.log(`Erro! Opção inválida! Número fora da faixa ${min}-${max}`)
        num = lerNumero(mensagem)
    }
    return num
}

export function pausa(): void {
    input("\nPressione ENTER para continuar...");
}

export function sleep(ms: number) {
    const start = Date.now();
    while (Date.now() - start < ms) {}
}


export function validarExistenciaPersonagens(batalha: Batalha): boolean {
    if (batalha.listarPersonagens().length === 0) {
        console.log("⚠️  O mundo está vazio! Adicione personagens primeiro.");
        pausa();
        return false;
    }
    return true;
}


export function validarExistenciaBatalha(batalha: Batalha): boolean {
    if (batalha.listarAcoes().length === 0) {
        console.log("⚠️  A batalha ainda não começou! Nenhuma ação registrada.");
        pausa();
        return false;
    }
    return true;
}