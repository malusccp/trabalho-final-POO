import PromptSync from "prompt-sync";
import fs from 'fs';
import { Batalha } from "./batalha";
import { Guerreiro } from "./guerreiro";
import { Mago } from "./mago";
import { Arqueiro } from "./arqueiro";
import { Professor } from "./professor";
import { 
    lerNumero, 
    inRange, 
    pausa, 
    sleep, 
    validarExistenciaPersonagens, 
    validarExistenciaBatalha,
    lerNomeUnico 
} from "./utils";

let input = PromptSync()
let batalha = new Batalha()
let idGerado = 1

function main(){
    let opcao = 0;

    while (opcao !== 11) { 
        console.clear();
        console.log("⚔️   Ely-minator: The Miranda Protocol: O CAOS ORIENTADO  ⚔️  ");

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

        opcao = inRange("Sua escolha: ", 1, 11)

        switch (opcao) {
            case 1: menuAddPersonagem(); break;
            case 2: ListarPersonagens(); break;
            case 3: verEstatisticas(); break; 
            case 4: realizarTurno(); break;
            case 5: modoSimulacao(); break; 
            case 6: verHistorico(); break; 
            case 7: replayBatalha(); break; 
            case 8: resumoBatalha(); break; 
            case 9: salvarArquivo(); break; 
            case 10: carregarArquivo(); break; 
            case 11: console.log("Saindo..."); break;
        }
    }
}

function realizarTurno() {
    if (!validarExistenciaPersonagens(batalha)) return;

    let verificacaoInicial = batalha.listarPersonagens(2);
    if (verificacaoInicial.length < 2) {
        console.log("⚠️  Impossível iniciar batalha: É necessário no mínimo 2 combatentes vivos.");
        pausa();
        return;
    }

    while (true) {
        let vivos = batalha.listarPersonagens(2);

        if (vivos.length < 2) {
            console.clear();
            console.log("⚔️ FIM DA BATALHA ⚔️")
            try {
                let v = batalha.verificarVencedor();
                batalha.registrarVitoria(v); 

                console.log(`\n🏆 Resultado Final`);
                console.log(`✔ Vencedor: ${v.nome} – ${v.constructor.name}, sobrevivendo com ${Math.floor(v.vida)} de vida`);
            } catch (e) {
                console.log("Resultado: Todos morreram ou empate.");
            }
            pausa();
            break; 
        }

        console.clear();
        console.log("⚔️  MODO BATALHA ⚔️ ");
        console.log("(Digite 0 no ID para voltar ao menu)\n");
        
        console.log("COMBATENTES VIVOS:");
        vivos.forEach(p => {
            console.log(`[ID: ${p.id}] ${p.nome.padEnd(10)} | ❤️  ${Math.floor(p.vida)}`);
        });
        console.log("------------------------------------------");

        let rawAtk = input("🗡️  ID Atacante: ");
        
        if (rawAtk === "0") {
            break; 
        }

        let idAtk = Number(rawAtk);
        if (isNaN(idAtk) || rawAtk === "") {
             continue; 
        }

        let rawDef = input("🛡️  ID Alvo:     ");

        if (rawDef === "0") {
            break;
        }

        let idDef = Number(rawDef);
        if (isNaN(idDef) || rawDef === "") {
             continue;
        }

        try {
            batalha.turno(idAtk, idDef);
            
            let logs = batalha.listarExtrato();
            console.log("\n✅ AÇÃO REALIZADA:");
            console.log(logs[logs.length - 1]);
            
            console.log("\n(Próximo turno em 3 segundos...)");
            sleep(3000); 

        } catch (e: any) {
            console.log(`\n❌ Erro: ${e.message}`);
            pausa(); 
        }
    }
}

function menuAddPersonagem(): void {
    console.clear();
    console.log("🧙‍♂️  MENU DE CRIAÇÃO DE PERSONAGEM 🧙‍♂️");
    console.log("  1. Criar Personagem Manualmente    ");
    console.log("  2. Gerar time pré-definido         ");

    let modo = inRange("👉 Escolha uma opção (1 ou 2): ", 1, 2);

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

        let personagem = inRange("Personagem: ", 1, 4);
        
        let nome = lerNomeUnico("Nome: ", batalha);
        
        let ataque = lerNumero("Ataque: ");
        let novoPersonagem;

        try {
            if (personagem === 1) {
                let def = lerNumero("Defesa: ");
                novoPersonagem = new Guerreiro(idGerado, nome, ataque, def);
            } else if (personagem === 2) {
                novoPersonagem = new Mago(idGerado, nome, ataque);
            } else if (personagem === 3) {
                let ataqueCritico = lerNumero("Ataque Múltiplo: ");
                novoPersonagem = new Arqueiro(idGerado, nome, ataque, ataqueCritico);
            } else {
                let sab = lerNumero("Sabedoria: ");
                novoPersonagem = new Professor(idGerado, nome, ataque, sab);
            }

            if (novoPersonagem) {
                batalha.adicionarPersonagem(novoPersonagem);
                console.log(`✅ ${nome} invocado com sucesso! (ID: ${idGerado})`);
                idGerado++;
                pausa();
            }

        } catch (e: any) {
            console.log(`❌ Erro: ${e.message}`);
            pausa();
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

        let op = inRange("Escolha um preset: ", 1, 3);

        try {
            if (op === 1) {
                batalha.adicionarPersonagem(new Professor(idGerado++, "Ely", 25, 15));
                batalha.adicionarPersonagem(new Mago(idGerado++, "Rogério", 30));
                batalha.adicionarPersonagem(new Arqueiro(idGerado++, "Ricardo", 15, 3));
                console.log("\n✅ Time Épico invocado com sucesso!");
            } 
            else if (op === 2) {
                batalha.adicionarPersonagem(new Guerreiro(idGerado++, "Edu Falaschi", 18, 5));
                batalha.adicionarPersonagem(new Guerreiro(idGerado++, "Andre Matos", 12, 10));
                batalha.adicionarPersonagem(new Arqueiro(idGerado++, "Fabio Lione", 10, 2));
                console.log("\n✅ Time Angra invocado com sucesso!");
            }
            else if (op === 3) {
                batalha.adicionarPersonagem(new Mago(idGerado++, "Harry", 25));
                batalha.adicionarPersonagem(new Mago(idGerado++, "Voldemort", 28));
                console.log("\n✅ Duelistas prontos para o combate!");
            }
            pausa();

        } catch (e: any) {
            console.log(`❌ Erro ao gerar atalho: ${e.message}`);
            pausa();
        }
    }
}

function ListarPersonagens() {
    if (batalha.listarPersonagens().length === 0) {
        console.log("\nNenhum personagem cadastrado ainda.");
        pausa();
        return;
    }

    console.clear();
    console.log("📜  LISTAGEM DOS COMBATENTES  📜  ");
    console.log("1. Ver Todos                        ");
    console.log("2. Apenas Vivos   ");
    console.log("3. Apenas Mortos");
    
    let opcao = inRange("👉 Escolha o filtro: ", 1, 3);
    
    let lista = batalha.listarPersonagens(opcao);

    console.log("ID  | CLASSE      | NOME           | VIDA       | ATAQUE");

    if (lista.length === 0) {
        console.log("   (Nenhum personagem encontrado neste filtro)");
    } else {
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
    
    pausa();
}

function verEstatisticas() {
    if (batalha.listarPersonagens().length === 0) {
        console.log("Adicione os personagens primeiro.");
        pausa();
        return;
    }
    if (batalha.listarAcoes().length === 0) {
        console.log("⚠️  A batalha ainda não começou! Nenhuma ação registrada.");
        pausa();
        return;
    }

    console.clear();

    console.log("📊  ESTATÍSTICAS DAS BATALHAS ");
    batalha.listarPersonagens().forEach(p => {
        console.log(`[ID: ${p.id}] ${p.nome}`);
    });
    console.log("----------------------------------------");

    let id = lerNumero("Digite o ID do personagem para ver a ficha: ");
    
    let personagem = batalha.consultarPersonagemPorId(id);

    if (!personagem) {
        console.log("❌ Personagem não encontrado!");
        pausa();
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

    pausa();
}

function verHistorico() {
    if (!validarExistenciaBatalha(batalha)) return;

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
    
    pausa();
}

function replayBatalha() {
    if (!validarExistenciaBatalha(batalha)) return;

    console.clear();
    console.log("🎬 REPLAY DA BATALHA...");
    sleep(1500);

    let acoes = batalha.listarAcoes();
    
    for (let i = 0; i < acoes.length; i++) {
        let acao = acoes[i];
        if (!acao) continue;
        console.clear();
        console.log(`\n🔴 TURNO ${i + 1}/${acoes.length}`);
        console.log("----------------------------------------");
        console.log(`⚔️  ATACANTE: ${acao.origem.nome}`);
        console.log(`🛡️  ALVO:     ${acao.alvo.nome}`);
        console.log("----------------------------------------");
        
        console.log("... Preparando ataque ...");
        sleep(800);
        
        console.log(`💥 ${acao.descricao.toUpperCase()}!`);
        console.log(`🩸 DANO APLICADO: ${acao.valorDano.toFixed(1)}`);
        
        sleep(1500);
    }

    console.log("\n🛑 REPLAY FINALIZADO.");
    pausa();
}

function resumoBatalha() {
    if (!validarExistenciaBatalha(batalha)) return;

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
    } catch (e) {
        console.log("👑 VENCEDOR FINAL:   Indefinido (Batalha em andamento ou Empate)");
    }
    
    pausa();
}

function salvarArquivo() {
    if (!validarExistenciaBatalha(batalha)) return;

    try {
        let nomeVencedor = "Indefinido (Batalha em andamento ou Empate)";
        try {
            const v = batalha.verificarVencedor();
            nomeVencedor = `${v.nome} (${v.constructor.name})`;
        } catch (e) {}

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

        fs.writeFileSync('log_batalha.json', JSON.stringify(dados, null, 2));
        
        console.log("\n💾 Arquivo 'log_batalha.json' salvo com sucesso!");
        console.log("   (Inclui status final, vencedor e histórico completo)");

    } catch (e: any) {
        console.log("\n❌ Erro ao salvar arquivo: " + e.message);
    }
    pausa();
}


function carregarArquivo() {
    try {
        if (!fs.existsSync('log_batalha.json')) {
            console.log("\n❌ Nenhuma gravação encontrada (log_batalha.json não existe).");
            pausa();
            return;
        }

        let arquivo = fs.readFileSync('log_batalha.json', 'utf-8');
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
        json.personagens.forEach((p: any) => {
            let icone = p.status === "Vivo" ? "❤️" : "💀";
            console.log(`   [${p.classe}] ${p.nome} - ${icone} ${Math.floor(p.vida)} HP`);
        });

        if (json.logTexto && json.logTexto.length > 0) {
            json.logTexto.forEach((bloco: string) => {
                console.log(bloco);
                console.log("-----------------------");
            });
        }

    } catch (e: any) {
        console.log("\n❌ Erro ao ler ou processar o arquivo: " + e.message);
    }
    pausa();
}

function modoSimulacao() {
    if (!validarExistenciaPersonagens(batalha)) return;

    let vivos = batalha.listarPersonagens(2);

    if (vivos.length < 2) {
        console.log("⚠️  Impossível iniciar simulação: É necessário no mínimo 2 combatentes vivos.");
        pausa();
        return;
    }

    console.clear();
    console.log("Iniciando sua batalha automática...");
    console.log("-----------------------------------");
    sleep(1000);

    while (vivos.length > 1) {
        let atacante = vivos[Math.floor(Math.random() * vivos.length)];
        
        let alvos = vivos.filter(p => p.id !== atacante.id);
        let defensor = alvos[Math.floor(Math.random() * alvos.length)];

        if (!atacante || !defensor) break;

        try {
            batalha.turno(atacante.id, defensor.id);

            let logs = batalha.listarExtrato();
            let ultimoLog = logs[logs.length - 1];
            
            console.log(ultimoLog);
            console.log("-----------------------------------");

            sleep(1500); 
            
            vivos = batalha.listarPersonagens(2);

        } catch (error: any) {
            console.log("Erro na simulação: " + error.message);
        }
    }

    console.log("\n🏁 A SIMULAÇÃO TERMINOU!");
    try {
        let v = batalha.verificarVencedor();
        batalha.registrarVitoria(v);
        
        console.log(`🏆 Resultado Final`);
        console.log(`✔ Vencedor: ${v.nome} – ${v.constructor.name}, sobrevivendo com ${Math.floor(v.vida)} de vida`);
    } catch (e) { 
        console.log("Houve um empate ou todos morreram."); 
    }
    
    pausa();
}
main()