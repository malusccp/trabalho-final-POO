"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Batalha = void 0;
class Batalha {
    constructor() {
        this.personagens = [];
        this.acoes = [];
        this._logBatalha = [];
    }
    adicionarPersonagem(p) {
        let jaExiste = this.personagens.find(pers => pers.nome === p.nome);
        if (jaExiste) {
            throw new Error("Erro! O nome escolhido já pertence a outro personagem");
        }
        this.personagens.push(p);
    }
    listarPersonagens(filtro = 1) {
        if (filtro === 2) {
            return this.personagens.filter(p => p.estaVivo());
        }
        else if (filtro === 3) {
            return this.personagens.filter(p => !p.estaVivo());
        }
        return this.personagens;
    }
    consultarPersonagemPorId(id) {
        return this.personagens.find(p => p.id === id);
    }
    gerarStatusRodada() {
        let texto = "Situação após a ação:\n";
        this.personagens.forEach(p => {
            let vidaExibida = Math.floor(p.vida > 0 ? p.vida : 0);
            let statusExtra = "";
            if (!p.estaVivo()) {
                statusExtra = "morto(a)";
            }
            else if (p.constructor.name === "Guerreiro" && p.vida < 30) {
                statusExtra = "(modo fúria ativo)";
            }
            texto += `• ${p.nome}: ${vidaExibida} vida ${statusExtra}\n`;
        });
        return texto;
    }
    turno(idAtacante, idAlvo) {
        let atacante = this.consultarPersonagemPorId(idAtacante);
        let defensor = this.consultarPersonagemPorId(idAlvo);
        if (!atacante || !defensor) {
            throw new Error("Personagem não encontrado.");
        }
        let acao = atacante.atacar(defensor);
        this.acoes.push(acao);
        let numeroAcao = this.acoes.length;
        let logTurno = `Ação ${numeroAcao}\n`;
        logTurno += `${atacante.nome} executa ${acao.descricao} em ${defensor.nome}.\n`;
        logTurno += `Dano: ${Math.floor(acao.valorDano)}\n`;
        if (atacante.constructor.name === "Mago") {
            logTurno += `Autodano: 10 (Custo da magia)\n`;
        }
        logTurno += this.gerarStatusRodada();
        this._logBatalha.push(logTurno);
    }
    registrarVitoria(vencedor) {
        let texto = `🏆 Resultado Final\n`;
        texto += `✔ Vencedor: ${vencedor.nome} ${vencedor.constructor.name}, sobrevivendo com ${Math.floor(vencedor.vida)} de vida`;
        this._logBatalha.push(texto);
    }
    listarExtrato() {
        return this._logBatalha;
    }
    listarAcoes() {
        return this.acoes;
    }
    verificarVencedor() {
        let vivos = this.listarPersonagens(2);
        if (vivos.length === 1) {
            return vivos[0];
        }
        else {
            throw new Error("A batalha ainda não acabou ou houve empate.");
        }
    }
}
exports.Batalha = Batalha;
