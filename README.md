# ⚔️ Ely-minator: The Miranda Protocol!

> "O Caos Orientado a Objetos"

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![POO](https://img.shields.io/badge/POO-Concepts-orange?style=for-the-badge)

## 📖 Sobre o Projeto

Este projeto é um **RPG de Batalha em Turnos via Terminal (CLI)** desenvolvido como atividade avaliativa da disciplina de Programação Orientada a Objetos (POO) no curso de **Análise e Desenvolvimento de Sistemas (IFPI)**.

O objetivo foi aplicar conceitos sólidos de POO (Herança, Polimorfismo, Encapsulamento) em um sistema divertido e funcional, capaz de simular combates, gerar logs detalhados e persistir dados.

## 🚀 Funcionalidades

O sistema conta com um menu interativo robusto que permite:

- **👥 Gestão de Elenco:**
  - Criação de personagens (Guerreiro, Mago, Arqueiro e Professor).
  - Geração de times pré-definidos (Presets/Atalhos) para testes rápidos.
  - Listagem com filtros inteligentes (Vivos/Mortos).
  
- **⚔️ Sistema de Combate:**
  - **Batalha Manual:** Você escolhe quem ataca e quem defende a cada turno (PvP local).
  - **Modo Simulação:** O computador assume o controle e realiza uma batalha automática até a morte (Auto-Battler).
  
- **📜 Histórico e Logs:**
  - Geração de extrato detalhado "Turno a Turno" com status da vida pós-ação.
  - Cálculo de MVP (Maior Dano) e Vencedor Final.
  - **Replay Visual:** Assista novamente a batalha acontecendo passo a passo.

- **💾 Persistência de Dados (JSON):**
  - Salvar o estado atual da batalha (personagens e histórico) em arquivo.
  - Carregar batalhas antigas para visualizar logs e estatísticas.

## 🧙‍♂️ Classes e Mecânicas

Cada classe possui um comportamento único herdado da classe base `Personagem`:

| Classe | Mecânica Especial (Polimorfismo) |
| :--- | :--- |
| **🛡️ Guerreiro** | **Fúria:** Ganha +30% de ataque quando sua vida cai para menos de 30%. |
| **🔮 Mago** | **Ataque Arcano:** Ignora defesa do oponente, mas sofre dano colateral (custo de mana/vida) ao atacar. |
| **🏹 Arqueiro** | **Mira Letal:** Tem 50% de chance de realizar um ataque crítico (dano multiplicado) ou um ataque normal. |
| **📚 Professor** | **Palestrinha:** A cada turno que ataca, sua Sabedoria aumenta, tornando-o progressivamente mais forte (Scaling infinito). |

## 🛠️ Tecnologias Utilizadas

- **Linguagem:** TypeScript
- **Runtime:** Node.js
- **Bibliotecas:** - `prompt-sync` (Entrada de dados)
  - `fs` (File System para salvar JSON)

## 📦 Como Rodar o Projeto

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/SEU-USUARIO/ely-minator-rpg.git](https://github.com/SEU-USUARIO/ely-minator-rpg.git)
