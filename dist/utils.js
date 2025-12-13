"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lerNumero = lerNumero;
exports.lerNomeUnico = lerNomeUnico;
exports.inRange = inRange;
exports.pausa = pausa;
exports.sleep = sleep;
exports.validarExistenciaPersonagens = validarExistenciaPersonagens;
exports.validarExistenciaBatalha = validarExistenciaBatalha;
const prompt_sync_1 = __importDefault(require("prompt-sync"));
let input = (0, prompt_sync_1.default)();
function lerNumero(mensagem) {
    let valor = NaN;
    while (isNaN(valor) || valor < 0) {
        valor = Number(input(mensagem));
        if (isNaN(valor) || valor < 0) {
            console.log("❌ Erro: Digite um número válido (positivo ou zero)!");
        }
    }
    return valor;
}
function lerNomeUnico(label, batalha) {
    while (true) {
        let nome = input(label);
        if (nome.trim() === "") {
            console.log("❌ O nome não pode ser vazio!");
            continue;
        }
        let existe = batalha.listarPersonagens().some(p => p.nome === nome);
        if (existe) {
            console.log(`❌ O nome '${nome}' já está em uso! Tente outro.`);
        }
        else {
            return nome;
        }
    }
}
function inRange(mensagem, min, max) {
    let num = lerNumero(mensagem);
    while (num < min || num > max) {
        console.log(`Erro! Opção inválida! Número fora da faixa ${min}-${max}`);
        num = lerNumero(mensagem);
    }
    return num;
}
function pausa() {
    input("\nPressione ENTER para continuar...");
}
function sleep(ms) {
    const start = Date.now();
    while (Date.now() - start < ms) { }
}
function validarExistenciaPersonagens(batalha) {
    if (batalha.listarPersonagens().length === 0) {
        console.log("⚠️  O mundo está vazio! Adicione personagens primeiro.");
        pausa();
        return false;
    }
    return true;
}
function validarExistenciaBatalha(batalha) {
    if (batalha.listarAcoes().length === 0) {
        console.log("⚠️  A batalha ainda não começou! Nenhuma ação registrada.");
        pausa();
        return false;
    }
    return true;
}
