"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const fs_1 = __importDefault(require("fs"));
const batalha_1 = require("./batalha");
const guerreiro_1 = require("./guerreiro");
const mago_1 = require("./mago");
const arqueiro_1 = require("./arqueiro");
const professor_1 = require("./professor");
const utils_1 = require("./utils");
let input = (0, prompt_sync_1.default)();
let batalha = new batalha_1.Batalha();
let idGerado = 1;
function main() {
    let opcao = 0;
    while (opcao !== 11) {
        console.clear();
        console.log("⚔️   Ely-minator: The Miranda Protocol  ⚔️  ");
        console.log("[ 👥 PERSONAGENS ]                           ");
        console.log("1. Invocar Novo Personagem                        ");
        console.log("2. Listar Combatentes                             ");
        console.log("3. Ver Estatísticas do Personagem                 ");
        console.log("[ ⚔️ COMBATE ]                            ");
        console.log("4. Ataque Manual                                  ");
        console.log("5. Modo Simulação                                 ");
        console.log("[ 📜 DADOS ]                           ");
        console.log("6. Ver Histórico da Batalha                       ");
        console.log("7. Replay Visual da Batalha                       ");
        console.log("8. Resumo da Batalha                              ");
        console.log("[ 💾 SISTEMA ]                                    ");
        console.log("9. Salvar Log em Arquivo                          ");
        console.log("10. Carregar Batalha Antiga                       ");
        console.log("11. Fugir (Sair)                                  ");
        opcao = (0, utils_1.inRange)("Sua escolha: ", 1, 11);
        switch (opcao) {
            case 1:
                menuAddPersonagem();
                break;
            case 2:
                ListarPersonagens();
                break;
            case 3:
                verEstatisticas();
                break;
            case 4:
                realizarTurno();
                break;
            case 5:
                modoSimulacao();
                break;
            case 6:
                verHistorico();
                break;
            case 7:
                replayBatalha();
                break;
            case 8:
                resumoBatalha();
                break;
            case 9:
                salvarArquivo();
                break;
            case 10:
                carregarArquivo();
                break;
            case 11:
                console.log("Saindo...");
                break;
        }
    }
}
function realizarTurno() {
    if (!(0, utils_1.validarExistenciaPersonagens)(batalha))
        return;
    while (true) {
        let vivos = batalha.listarPersonagens(2);
        if (vivos.length < 2) {
            console.clear();
            console.log("⚔️ FIM DA BATALHA ⚔️");
            try {
                let v = batalha.verificarVencedor();
                batalha.registrarVitoria(v);
                console.log(`\n🏆 Resultado Final`);
                console.log(`✔ Vencedor: ${v.nome} – ${v.constructor.name}, sobrevivendo com ${Math.floor(v.vida)} de vida`);
            }
            catch (e) {
                console.log("Resultado: Todos morreram ou empate.");
            }
            (0, utils_1.pausa)();
            break;
        }
        console.clear();
        console.log("⚔️  MODO BATALHA ⚔️ ");
        console.log("COMBATENTES VIVOS:");
        vivos.forEach(p => {
            console.log(`[ID: ${p.id}] ${p.nome.padEnd(10)} | ❤️  ${Math.floor(p.vida)}`);
        });
        console.log("------------------------------------------");
        let idAtk = (0, utils_1.lerNumero)("🗡️  ID Atacante: ");
        if (idAtk === 0)
            break;
        let idDef = (0, utils_1.lerNumero)("🛡️  ID Alvo:     ");
        if (idDef === 0)
            break;
        try {
            batalha.turno(idAtk, idDef);
            let logs = batalha.listarExtrato();
            console.log("\n✅ AÇÃO REALIZADA:");
            console.log(logs[logs.length - 1]);
            console.log("\n(Próximo turno em 3 segundos...)");
            (0, utils_1.sleep)(3000);
        }
        catch (e) {
            console.log(`\n❌ Erro: ${e.message}`);
            (0, utils_1.pausa)();
        }
    }
}
function menuAddPersonagem() {
    console.clear();
    console.log("🧙‍♂️  MENU DE CRIAÇÃO DE PERSONAGEM 🧙‍♂️");
    console.log("  1. Criar Personagem Manualmente    ");
    console.log("  2. Gerar time pré-definido         ");
    let modo = (0, utils_1.inRange)("👉 Escolha uma opção (1 ou 2): ", 1, 2);
    if (modo === 1) {
        console.clear();
        console.log("           🧙‍♂️  CLASSES DOS COMBATENTES    🧙‍♂️             ");
        console.log("Escolha a classe do seu combatente:                          ");
        console.log("1. 🛡️  GUERREIRO (O Tanque Furioso)                        ");
        console.log("   ↳ Passiva: O ataque aumenta em 30% quando a Vida cai pra < 30%");
        console.log("2. 🔮  MAGO (O Canhão de Vidro)                            ");
        console.log("   ↳ Passiva: Causa dano massivo ignorando parte da defesa   ");
        console.log("3. 🏹  ARQUEIRO (O Atirador de Elite)                      ");
        console.log("   ↳ Passiva: Chance de causar Dano Crítico baseado na distância");
        console.log("4. 📚  PROFESSOR (O Mestre do Tempo)                       ");
        console.log("   ↳ Passiva: Fica mais forte a cada turno ensinando uma lição");
        let personagem = (0, utils_1.inRange)("Personagem: ", 1, 4);
        let nome = (0, utils_1.lerNomeUnico)("Nome: ", batalha);
        let ataque = (0, utils_1.lerNumero)("Ataque: ");
        let novoPersonagem;
        try {
            if (personagem === 1) {
                let def = (0, utils_1.lerNumero)("Defesa: ");
                novoPersonagem = new guerreiro_1.Guerreiro(idGerado, nome, ataque, def);
            }
            else if (personagem === 2) {
                novoPersonagem = new mago_1.Mago(idGerado, nome, ataque);
            }
            else if (personagem === 3) {
                let ataqueCritico = (0, utils_1.lerNumero)("Ataque Múltiplo: ");
                novoPersonagem = new arqueiro_1.Arqueiro(idGerado, nome, ataque, ataqueCritico);
            }
            else {
                let sab = (0, utils_1.lerNumero)("Sabedoria: ");
                novoPersonagem = new professor_1.Professor(idGerado, nome, ataque, sab);
            }
            if (novoPersonagem) {
                batalha.adicionarPersonagem(novoPersonagem);
                console.log(`✅ ${nome} invocado com sucesso! (ID: ${idGerado})`);
                idGerado++;
                (0, utils_1.pausa)();
            }
        }
        catch (e) {
            console.log(`❌ Erro: ${e.message}`);
            (0, utils_1.pausa)();
            menuAddPersonagem();
        }
    }
    else if (modo === 2) {
        console.clear();
        console.log("╔══════════════════════════════════════╗");
        console.log("║      ⚡  PRESETS DE BATALHA      ⚡  ║");
        console.log("╠══════════════════════════════════════╣");
        console.log("║ 1. Time Épico (Ely, Rogério, Ricardo)║");
        console.log("║ 2. Time Angra                        ║");
        console.log("║ 3. Duelo de Magos                    ║");
        console.log("╚══════════════════════════════════════╝");
        let op = (0, utils_1.inRange)("Escolha um preset: ", 1, 3);
        try {
            if (op === 1) {
                batalha.adicionarPersonagem(new professor_1.Professor(idGerado++, "Ely", 25, 15));
                batalha.adicionarPersonagem(new mago_1.Mago(idGerado++, "Rogério", 30));
                batalha.adicionarPersonagem(new arqueiro_1.Arqueiro(idGerado++, "Ricardo", 15, 3));
                console.log("\n✅ Time Épico invocado com sucesso!");
            }
            else if (op === 2) {
                batalha.adicionarPersonagem(new guerreiro_1.Guerreiro(idGerado++, "Edu Falaschi", 18, 5));
                batalha.adicionarPersonagem(new guerreiro_1.Guerreiro(idGerado++, "Andre Matos", 12, 10));
                batalha.adicionarPersonagem(new arqueiro_1.Arqueiro(idGerado++, "Fabio Lione", 10, 2));
                console.log("\n✅ Time Angra invocado com sucesso!");
            }
            else if (op === 3) {
                batalha.adicionarPersonagem(new mago_1.Mago(idGerado++, "Harry", 25));
                batalha.adicionarPersonagem(new mago_1.Mago(idGerado++, "Voldemort", 28));
                console.log("\n✅ Duelistas prontos para o combate!");
            }
            (0, utils_1.pausa)();
        }
        catch (e) {
            console.log(`❌ Erro ao gerar atalho: ${e.message}`);
            (0, utils_1.pausa)();
        }
    }
}
function ListarPersonagens() {
    if (batalha.listarPersonagens().length === 0) {
        console.log("\nNenhum personagem cadastrado ainda.");
        (0, utils_1.pausa)();
        return;
    }
    console.clear();
    console.log("📜  LISTAGEM DOS COMBATENTES  📜  ");
    console.log("1. Ver Todos                        ");
    console.log("2. Apenas Vivos   ");
    console.log("3. Apenas Mortos");
    let opcao = (0, utils_1.inRange)("👉 Escolha o filtro: ", 1, 3);
    let lista = batalha.listarPersonagens(opcao);
    console.log("ID  | CLASSE      | NOME           | VIDA       | ATAQUE");
    if (lista.length === 0) {
        console.log("   (Nenhum personagem encontrado neste filtro)");
    }
    else {
        lista.forEach(p => {
            let classe = p.constructor.name.padEnd(11, ' ');
            let nome = p.nome.padEnd(14, ' ');
            let ataque = p.ataque.toString().padEnd(6, ' ');
            let statusVida = p.estaVivo()
                ? `❤️  ${p.vida.toFixed(1)}`
                : `💀  MORTO`;
            console.log(`${p.id.toString().padEnd(3, ' ')} | ${classe} | ${nome} | ${statusVida.padEnd(10, ' ')} | ⚔️  ${ataque}`);
        });
    }
    console.log("-----------------------------------------------------------------");
    (0, utils_1.pausa)();
}
function verEstatisticas() {
    if (batalha.listarPersonagens().length === 0) {
        console.log("Adicione os personagens primeiro.");
        (0, utils_1.pausa)();
        return;
    }
    if (batalha.listarAcoes().length === 0) {
        console.log("⚠️  A batalha ainda não começou! Nenhuma ação registrada.");
        (0, utils_1.pausa)();
        return;
    }
    console.clear();
    console.log("📊  ESTATÍSTICAS DAS BATALHAS ");
    batalha.listarPersonagens().forEach(p => {
        console.log(`[ID: ${p.id}] ${p.nome}`);
    });
    console.log("----------------------------------------");
    let id = (0, utils_1.lerNumero)("Digite o ID do personagem para ver a ficha: ");
    let personagem = batalha.consultarPersonagemPorId(id);
    if (!personagem) {
        console.log("❌ Personagem não encontrado!");
        (0, utils_1.pausa)();
        return;
    }
    let acoes = batalha.listarAcoes();
    let danoCausado = acoes
        .filter(a => a.origem.id === id)
        .reduce((soma, a) => soma + a.valorDano, 0);
    let danoRecebido = acoes
        .filter(a => a.alvo.id === id)
        .reduce((soma, a) => soma + a.valorDano, 0);
    let abates = 0;
    let todosMortos = batalha.listarPersonagens(3);
    todosMortos.forEach(morto => {
        let acoesContraMorto = acoes.filter(a => a.alvo.id === morto.id);
        if (acoesContraMorto.length > 0) {
            let ultimoGolpe = acoesContraMorto[acoesContraMorto.length - 1];
            if (ultimoGolpe && ultimoGolpe.origem.id === id) {
                abates++;
            }
        }
    });
    console.clear();
    console.log("╔══════════════════════════════════════════════════╗");
    console.log(`║ 👤 FICHA TÉCNICA: ${personagem.nome.toUpperCase().padEnd(30, ' ')} ║`);
    console.log("╠══════════════════════════════════════════════════╣");
    console.log(`║ 🗡️  Dano Total Causado:  ${danoCausado.toFixed(1).padEnd(23, ' ')} ║`);
    console.log(`║ 🛡️  Dano Total Recebido: ${danoRecebido.toFixed(1).padEnd(23, ' ')} ║`);
    console.log(`║ ☠️  Abates              :      ${abates.toString().padEnd(23, ' ')} ║`);
    let statusTexto = personagem.estaVivo()
        ? `VIVO (${personagem.vida.toFixed(1)} HP)`
        : "MORTO 💀";
    console.log(`║ ❤️  Status Atual:        ${statusTexto.padEnd(23, ' ')} ║`);
    console.log("╚══════════════════════════════════════════════════╝");
    (0, utils_1.pausa)();
}
function verHistorico() {
    if (!(0, utils_1.validarExistenciaBatalha)(batalha))
        return;
    console.clear();
    console.log("=== EXTRATO DA BATALHA ===");
    console.log("status = vivo");
    console.log("status = morto");
    console.log("");
    let logCompleto = batalha.listarExtrato();
    logCompleto.forEach(blocoDeTexto => {
        console.log(blocoDeTexto);
        console.log("");
    });
    (0, utils_1.pausa)();
}
function replayBatalha() {
    if (!(0, utils_1.validarExistenciaBatalha)(batalha))
        return;
    console.clear();
    console.log("🎬 REPLAY DA BATALHA...");
    (0, utils_1.sleep)(1500);
    let acoes = batalha.listarAcoes();
    for (let i = 0; i < acoes.length; i++) {
        let acao = acoes[i];
        if (!acao)
            continue;
        console.clear();
        console.log(`\n🔴 TURNO ${i + 1}/${acoes.length}`);
        console.log("----------------------------------------");
        console.log(`⚔️  ATACANTE: ${acao.origem.nome}`);
        console.log(`🛡️  ALVO:     ${acao.alvo.nome}`);
        console.log("----------------------------------------");
        console.log("... Preparando ataque ...");
        (0, utils_1.sleep)(800);
        console.log(`💥 ${acao.descricao.toUpperCase()}!`);
        console.log(`🩸 DANO APLICADO: ${acao.valorDano.toFixed(1)}`);
        (0, utils_1.sleep)(1500);
    }
    console.log("\n🛑 REPLAY FINALIZADO.");
    (0, utils_1.pausa)();
}
function resumoBatalha() {
    if (!(0, utils_1.validarExistenciaBatalha)(batalha))
        return;
    console.clear();
    console.log("╔══════════════════════════════════════╗");
    console.log("║      🏆  RELATÓRIO PÓS-GUERRA    🏆  ║");
    console.log("╚══════════════════════════════════════╝");
    let maiorDano = 0;
    let mvpNome = "Ninguém";
    batalha.listarPersonagens().forEach(p => {
        let total = batalha.listarAcoes()
            .filter(a => a.origem.id === p.id)
            .reduce((s, a) => s + a.valorDano, 0);
        if (total > maiorDano) {
            maiorDano = total;
            mvpNome = p.nome;
        }
    });
    console.log(`\n🔢 Total de Turnos:  ${batalha.listarAcoes().length}`);
    console.log(`💪 MVP (Maior Dano): ${mvpNome} (Total: ${maiorDano.toFixed(1)})`);
    try {
        let winner = batalha.verificarVencedor();
        console.log(`👑 VENCEDOR FINAL:   ${winner.nome} (HP Restante: ${winner.vida.toFixed(1)})`);
    }
    catch (e) {
        console.log("👑 VENCEDOR FINAL:   Indefinido (Batalha em andamento ou Empate)");
    }
    (0, utils_1.pausa)();
}
function salvarArquivo() {
    if (!(0, utils_1.validarExistenciaBatalha)(batalha))
        return;
    try {
        let nomeVencedor = "Indefinido (Batalha em andamento ou Empate)";
        try {
            const v = batalha.verificarVencedor();
            nomeVencedor = `${v.nome} (${v.constructor.name})`;
        }
        catch (e) { }
        let personagens = batalha.listarPersonagens().map(p => {
            return {
                id: p.id,
                nome: p.nome,
                classe: p.constructor.name,
                vida: p.vida,
                ataque: p.ataque,
                status: p.estaVivo() ? "Vivo" : "Morto"
            };
        });
        let historico = batalha.listarAcoes().map(acao => {
            return {
                turno: acao.id,
                origem: acao.origem.nome,
                alvo: acao.alvo.nome,
                descricao: acao.descricao,
                dano: acao.valorDano,
                data: acao.dataHora
            };
        });
        const dados = {
            meta: {
                dataGravacao: new Date(),
                totalTurnos: batalha.listarAcoes().length,
                resultadoFinal: nomeVencedor
            },
            personagens: personagens,
            historico: historico,
            logTexto: batalha.listarExtrato()
        };
        fs_1.default.writeFileSync('log_batalha.json', JSON.stringify(dados, null, 2));
        console.log("\n💾 Arquivo 'log_batalha.json' salvo com sucesso!");
        console.log("   (Inclui status final, vencedor e histórico completo)");
    }
    catch (e) {
        console.log("\n❌ Erro ao salvar arquivo: " + e.message);
    }
    (0, utils_1.pausa)();
}
function carregarArquivo() {
    try {
        if (!fs_1.default.existsSync('log_batalha.json')) {
            console.log("\n❌ Nenhuma gravação encontrada (log_batalha.json não existe).");
            (0, utils_1.pausa)();
            return;
        }
        let arquivo = fs_1.default.readFileSync('log_batalha.json', 'utf-8');
        let json = JSON.parse(arquivo);
        console.clear();
        console.log("╔════════════════════════════════════════════════════╗");
        console.log("║         📂  REGISTRO DE BATALHA ANTIGA  📂         ║");
        console.log("╚════════════════════════════════════════════════════╝");
        console.log(`📅 Data:      ${new Date(json.meta.dataGravacao).toLocaleString()}`);
        console.log(`⚔️  Turnos:    ${json.meta.totalTurnos}`);
        console.log(`🏆 Resultado: ${json.meta.resultadoFinal}`);
        console.log("------------------------------------------------------");
        console.log("\n👥 COMBATENTES:");
        json.personagens.forEach((p) => {
            let icone = p.status === "Vivo" ? "❤️" : "💀";
            console.log(`   [${p.classe}] ${p.nome} - ${icone} ${Math.floor(p.vida)} HP`);
        });
        if (json.logTexto && json.logTexto.length > 0) {
            json.logTexto.forEach((bloco) => {
                console.log(bloco);
                console.log("-----------------------");
            });
        }
    }
    catch (e) {
        console.log("\n❌ Erro ao ler ou processar o arquivo: " + e.message);
    }
    (0, utils_1.pausa)();
}
function modoSimulacao() {
    if (!(0, utils_1.validarExistenciaPersonagens)(batalha))
        return;
    let vivos = batalha.listarPersonagens(2);
    if (vivos.length < 2) {
        console.log("Necessita-se de ao menos 2 combatentes vivos");
        (0, utils_1.pausa)();
        return;
    }
    console.clear();
    console.log("Iniciando sua batalha automática...");
    console.log("-----------------------------------");
    (0, utils_1.sleep)(1000);
    while (vivos.length > 1) {
        let atacante = vivos[Math.floor(Math.random() * vivos.length)];
        let alvos = vivos.filter(p => p.id !== atacante.id);
        let defensor = alvos[Math.floor(Math.random() * alvos.length)];
        if (!atacante || !defensor)
            break;
        try {
            batalha.turno(atacante.id, defensor.id);
            let logs = batalha.listarExtrato();
            let ultimoLog = logs[logs.length - 1];
            console.log(ultimoLog);
            console.log("-----------------------------------");
            (0, utils_1.sleep)(1500);
            vivos = batalha.listarPersonagens(2);
        }
        catch (error) {
            console.log("Erro na simulação: " + error.message);
        }
    }
    console.log("\n🏁 A SIMULAÇÃO TERMINOU!");
    try {
        let v = batalha.verificarVencedor();
        batalha.registrarVitoria(v);
        console.log(`🏆 Resultado Final`);
        console.log(`✔ Vencedor: ${v.nome} – ${v.constructor.name}, sobrevivendo com ${Math.floor(v.vida)} de vida`);
    }
    catch (e) {
        console.log("Houve um empate ou todos morreram.");
    }
    (0, utils_1.pausa)();
}
main();
