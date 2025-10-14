# Dr. Cheguei!

Repositório para o projeto de MC855 - Pediatria HC — Unicamp

---

## Autores

- Felipe Santana Dias — 215775
- Leticia Adrielli Luz — 220208
- Lucas Magri Bueno — 201996
- Matheus Otávio Rodrigues — 222318

---

## Sobre o Projeto

O **Dr. Cheguei** foi desenvolvido para solucionar o congestionamento no atendimento do Ambulatório Pediátrico do HC da Unicamp, causado pela chegada simultânea de pacientes de retorno. A solução permite que o paciente realize o check-in digital ao chegar no hospital, notificando automaticamente o médico responsável, agilizando o processo e otimizando a comunicação entre as equipes.

---

## Fluxo de Funcionamento

- **Paciente/Acompanhante:** Informa o código HC no totem/tablet ou web app ao chegar. O sistema registra a presença e avisa o médico automaticamente.
- **Médico/Admin:** Visualiza os pacientes do dia, seus status, realiza agendamentos e atualizações via painel web (acesso autenticado).

---

## Aspectos Técnicos do Projeto

### Backend:

#### Principais Endpoints da API

- **POST `/session`**  
  Login do usuário (médico/admin). Retorna JWT.

- **GET `/user`**  
  Retorna informações do usuário autenticado (JWT).

- **POST `/appointment`**  
  Cria agendamento de consulta (JWT).
  ```json
  {
    "hc": <int>,
    "schedule": <date>
  }
  ```
- **GET `/appointment`**  
  Lista consultas do médico ou paciente autenticado (JWT).

- **DELETE `/appointment/:appointmentId`**  
  Remove agendamento específico (JWT).

- **PUT `/appointment/:appointmentId/status/:statusId`**  
  Atualiza status da consulta (JWT).

- **PUT `/checkin?hc=<codigo>`**  
  Faz check-in do paciente pelo código HC.


### 2. Frontend (React)

#### Instalação e Execução

1. Acesse o diretório do frontend:
   ```bash
   cd frontend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o frontend:
   ```bash
   npm start
   ```
   O aplicativo estará disponível em `http://localhost:3000`.

---

## Estrutura do Projeto

- `frontend/` — Aplicação React para pacientes e médicos
- `src/` — Backend Node.js/Express (API)
- Banco de dados relacional (MariaDB) rodando localmente ou em nuvem

---

## Licença

Projeto desenvolvido para a disciplina MC855 da Unicamp. Uso acadêmico.

---
