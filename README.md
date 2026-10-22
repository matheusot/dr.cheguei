# Dr. Cheguei!

Sistema de check-in digital e gestão de fluxo de pacientes desenvolvido para o Ambulatório Pediátrico do Hospital de Clínicas (HC) da Universidade Estadual de Campinas (UNICAMP).

Projeto desenvolvido na disciplina **MC855 — Projeto em Sistemas de Computação (2022)**.

---

## Integrantes

- Felipe Santana Dias — RA: 215775
- Leticia Adrielli Luz — RA: 220208
- Lucas Magri Bueno — RA: 201996
- Matheus Otávio Rodrigues — RA: 222318

---

## Sobre o Projeto

O **Dr. Cheguei** foi concebido para resolver o congestionamento no atendimento do Ambulatório Pediátrico do HC da Unicamp, causado pela chegada simultânea de pacientes com agendamentos de retorno. 

A solução oferece:
1. **Totem/Check-in Digital (Paciente/Acompanhante):** Ao chegar ao hospital, o paciente confirma sua presença digitando o código do prontuário HC. O sistema atualiza o status para "aguardando atendimento" e notifica a equipe médica.
2. **Painel do Médico/Admin (Dashboard):** A equipe médica visualiza em tempo real a fila de pacientes do dia organizados por status (agendado, aguardando, em atendimento, finalizado, cancelado), podendo chamar consultas e gerenciar horários.

---

## Arquitetura & Tecnologias

- **Backend:** Node.js, Express, MySQL2 (`mysql2/promise`), JWT (`jsonwebtoken`), CORS
- **Frontend:** React, TypeScript, CSS Modules, React Router
- **Banco de Dados:** MariaDB / MySQL
- **Ferramentas:** Insomnia (Workspace de testes de API versionado em `.insomnia/`)

---

## Estrutura do Repositório

```text
├── .insomnia/         # Workspace e requisições prontas para o Insomnia
├── frontend/          # Aplicação Web/Totem em React + TypeScript
├── src/               # Código-fonte do Backend (Node.js/Express)
│   ├── configs/       # Configuração de banco de dados e JWT
│   ├── controllers/   # Regras de negócio das rotas
│   ├── middlewares/   # Middlewares (autenticação JWT)
│   ├── models/        # Camada de acesso a dados (SQL queries)
│   └── routes/        # Definição das rotas da API REST
├── dr-cheguei.sql     # Dump completo do esquema e dados de teste do banco
├── index.js           # Ponto de entrada do servidor backend
└── package.json       # Dependências e scripts do backend
```

---

## Como Executar

### Pré-requisitos
- Node.js (v16+) e npm
- Servidor MySQL ou MariaDB

### 1. Banco de Dados

Restaure o banco de dados utilizando o script SQL fornecido na raiz:

```bash
mysql -u root -p < dr-cheguei.sql
```

O script criará o banco `drcheguei` com as tabelas de médicos, pacientes, especialidades, status e agendamentos com dados iniciais.

### 2. Backend (API)

Na raiz do repositório:

```bash
# Instalar dependências
npm install

# (Opcional) Configurar variáveis de ambiente:
# export DB_HOST=localhost
# export DB_PORT=3306
# export DB_USER=drcheguei
# export DB_PASSWORD=suasenha
# export DB_NAME=drcheguei
# export JWT_SECRET=suachavejwt
# export PORT=4000

# Iniciar o servidor Express
npm start
```

O servidor estará ativo em `http://localhost:4000`.

### 3. Frontend

Em outro terminal:

```bash
cd frontend

# Instalar dependências
npm install

# Iniciar a aplicação React
npm start
```

O frontend abrirá automaticamente no navegador em `http://localhost:3000`.

---

## Endpoints da API

| Método | Endpoint | Autenticação | Descrição |
| :--- | :--- | :---: | :--- |
| `POST` | `/session` | Não | Autenticação de médico/admin (retorna JWT) |
| `GET` | `/user` | Sim (JWT) | Informações do usuário logado |
| `GET` | `/appointment` | Sim (JWT) | Lista agendamentos do médico ou paciente |
| `POST` | `/appointment` | Sim (JWT) | Cria novo agendamento (`hc`, `schedule`) |
| `DELETE`| `/appointment/:id` | Sim (JWT) | Remove um agendamento |
| `PUT` | `/appointment/:id/status/:statusId` | Sim (JWT) | Atualiza status da consulta (1: Agendado, 2: Aguardando, 3: Em atendimento, etc.) |
| `PUT` | `/checkin?hc=<codigo>` | Não | Realiza o check-in do paciente via totem/código HC |

> **Dica:** É possível importar a pasta `.insomnia/` diretamente no [Insomnia REST Client](https://insomnia.rest/) para testar todas as rotas com payloads de exemplo.

---

## Licença

Projeto acadêmico desenvolvido para a disciplina MC855 da Universidade Estadual de Campinas (UNICAMP).
