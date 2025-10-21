## Resposta do Desafio — Sistema de Gestão de Tarefas Colaborativo

Este documento apresenta minha proposta para o desafio: arquitetura, decisões técnicas, como executar, endpoints, eventos e um todo‑list claro das rotas e funcionalidades pendentes/concluídas.

---

### Arquitetura (visão geral)

```mermaid
flowchart LR
  subgraph Client["Web: React + TanStack Router + shadcn/ui"]
    UI[UI/Pages]
  end

  UI -->|HTTP/WS| APIGW((API Gateway - Nest HTTP))

  subgraph Broker[RabbitMQ]
    QUEUE_TASKS[ex: tasks.events]
    QUEUE_NOTIF[ex: notifications.events]
  end

  subgraph Auth[Auth Service]
    A1[JWT/Users]
  end

  subgraph Tasks[Tasks Service]
    T1[Tasks + Comments]
    DB1[(PostgreSQL)]
  end

  subgraph Notifs[Notifications Service]
    N1[Notifications + WS]
    DB2[(PostgreSQL)]
  end

  APIGW -- RPC/Verify --> Auth
  APIGW -- RPC/CRUD --> Tasks
  Tasks -- Publish --> QUEUE_TASKS
  APIGW -- Publish comment --> QUEUE_TASKS
  Notifs -- Consume --> QUEUE_TASKS
  Notifs -- Emit via WS --> UI

  T1 --- DB1
  N1 --- DB2
```

---

### Diagrama Entidade-Relacionamento (ERD)

O diagrama abaixo ilustra o esquema do banco de dados do sistema de gestão de tarefas, mostrando as relações entre as entidades principais:

![Diagrama Entidade-Relacionamento](.github/assets/diagrama-entidade-relacionamento.png)

**Entidades principais:**

- **`users`**: Armazena informações dos usuários (id, username, email, password, timestamps)
- **`tasks`**: Gerencia as tarefas com campos como título, descrição, prazo, prioridade e status
- **`tasks_users`**: Tabela de junção para relacionamento many-to-many entre tarefas e usuários
- **`comments`**: Comentários associados às tarefas, vinculados ao usuário que os criou

**Relacionamentos:**

- Um usuário pode ter múltiplas tarefas atribuídas (via `tasks_users`)
- Uma tarefa pode ter múltiplos usuários atribuídos (via `tasks_users`)
- Uma tarefa pode ter múltiplos comentários
- Um comentário pertence a uma tarefa e a um usuário específico

**Enums utilizados:**

- `task_priority_enum`: LOW, MEDIUM, HIGH, URGENT
- `task_status_enum`: TODO, IN_PROGRESS, REVIEW, DONE

---

### Cronograma de Desenvolvimento

O desenvolvimento deste projeto foi realizado seguindo uma metodologia estruturada, com foco no aprendizado de novas tecnologias e implementação de uma arquitetura de microserviços robusta:

#### Fase 1: Estudo e Preparação (1 semana)

- **NestJS e TypeORM**: Aprendizado completo do framework NestJS e integração com TypeORM para ORM
- **Fundamentos**: Estudo de arquitetura de microserviços, padrões de comunicação e boas práticas

#### Fase 2: Desenvolvimento Paralelo (7 dias)

**Configuração da Infraestrutura (4 dias)**

- **RabbitMQ** (2 dias): Configuração e integração do message broker para comunicação assíncrona
- **TypeORM** (2 dias): Setup de migrations, entidades e configuração de banco de dados

**Implementação do Backend (3 dias)**

- **Desenvolvimento de APIs**: Implementação completa de todas as rotas e endpoints
- **Integração de Serviços**: Comunicação entre microserviços via RPC e eventos
- **Autenticação e Autorização**: Sistema JWT centralizado com guards e middleware

_Nota: A configuração da infraestrutura ocorreu em paralelo ao desenvolvimento das rotas._

#### Fase 3: Desenvolvimento do Frontend (2 dias)

- **Interface de Usuário**: Implementação completa da aplicação React com TanStack Router
- **Integração em Tempo Real**: WebSocket para notificações e atualizações dinâmicas
- **Adaptação Backend**: Ajustes contínuos no backend durante o desenvolvimento do frontend

#### Total: **2 semanas** de desenvolvimento intensivo

_Tempo total de trabalho: 1 semana (estudo) + 7 dias (desenvolvimento paralelo) + 2 dias (frontend) = 2 semanas_

---

### Decisões técnicas

- **Nest.js + TypeORM (PostgreSQL)**: padroniza repositórios, migrations e entidades.
- **RabbitMQ**: eventos assíncronos para criação/atualização/comentários de tarefas.
- **API Gateway**: único ponto HTTP/Swagger e rate limiting.
- **JWT centralizado no Auth Service**: emissão/validação via RPC.
- **WebSocket no Notifications Service**: entrega de eventos em tempo real.
- **Monorepo (Turborepo + pnpm)**: reuso de `packages` e configs compartilhadas.

---

### Como executar (Docker Compose)

Pré‑requisitos: Docker e Docker Compose, Node 20+, pnpm.

1. Instale dependências na raiz:
   - `pnpm install`
2. Suba os serviços:
   - `docker compose up -d --build`
3. Acesse:
   - API Gateway: `http://localhost:3001`
   - Swagger: `http://localhost:3001/api/docs` (quando habilitado)
   - RabbitMQ UI: `http://localhost:15672` (admin/admin)
   - Postgres: `localhost:5432` (postgres/password)

---

### Serviços e portas (planejado)

- API Gateway (Nest HTTP): `3001`
- Auth Service (Nest microservice): `3002`
- Tasks Service (Nest microservice): `3003`
- Notifications Service (Nest microservice + WS): `3004`
- RabbitMQ (broker): `5672` e UI `15672`
- PostgreSQL: `5432`

---

### Endpoints HTTP (Gateway)

```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/refresh

GET    /api/tasks?page=&size=
POST   /api/tasks
GET    /api/tasks/:id
PUT    /api/tasks/:id
DELETE /api/tasks/:id

POST   /api/tasks/:id/comments
GET    /api/tasks/:id/comments?page=&size=
```

Campos principais de tarefa: título, descrição, prazo, prioridade (`LOW|MEDIUM|HIGH|URGENT`), status (`TODO|IN_PROGRESS|REVIEW|DONE`), atribuídos (múltiplos usuários).

---

### Eventos WebSocket (Notifications Service)

- `task:created` — nova tarefa criada
- `task:updated` — tarefa atualizada (inclui mudança de status/atribuições)
- `comment:new` — novo comentário adicionado

---

### Todo‑list — Rotas e Funcionalidades

Autenticação (API Gateway + Auth Service)

- [x] `POST /api/auth/register` — cadastrar usuário (hash com bcrypt/argon2)
- [x] `POST /api/auth/login` — autenticar e emitir `accessToken`/`refreshToken`
- [x] `POST /api/auth/refresh` — renovar `accessToken`
- [x] Guard JWT no Gateway protegendo rotas `/api/tasks*`
- [x] Rate limiting no Gateway (10 req/s)
- [x] Swagger com esquemas (DTOs) e exemplos

Tarefas e Comentários (API Gateway + Tasks Service)

- [x] `GET /api/tasks` — paginação, filtros básicos (status, prioridade, busca)
- [x] `POST /api/tasks` — criar tarefa (publicar `task.created`)
- [x] `GET /api/tasks/:id` — detalhe da tarefa
- [x] `PUT /api/tasks/:id` — atualizar (publicar `task.updated`)
- [x] `DELETE /api/tasks/:id` — remover tarefa
- [x] `POST /api/tasks/:id/comments` — criar comentário (publicar `comment.new`)
- [x] `GET /api/tasks/:id/comments` — listar comentários com paginação
- [x] Entidades TypeORM: `Task`, `Comment`, `TaskUser`
- [x] Migrations TypeORM aplicadas no start
- [ ] Audit log simplificado (histórico de alterações)

Notificações & Tempo Real (Notifications Service)

- [x] Estrutura básica do serviço (controller + service)
- [x] Consumir eventos do RabbitMQ (criação, atualização, comentário)
- [ ] Persistir notificações por usuário
- [x] WebSocket: broadcast básico implementado
- [x] Eventos: `task:created`, `task:updated`, `comment:new`

Frontend

- [x] Páginas: Login/Register, Lista de Tarefas, Detalhe (com comentários)
- [x] Estado de auth (Context/Zustand), validação (`react-hook-form` + `zod`)
- [x] UI com shadcn/ui + Tailwind (≥5 componentes)
- [x] WebSocket para notificações em tempo real
- [x] Loading/Error states (skeleton + toasts)

Infra/DevX

- [x] Docker Compose com serviços, Postgres e RabbitMQ
- [ ] Health checks/observabilidade (diferencial)
- [ ] Logs estruturados (Winston/Pino) (diferencial)
- [ ] Testes unitários de serviços críticos (diferencial)

Status atual do repositório

- [x] Monorepo organizado com `apps/` e `packages/`
- [x] Serviços completos (`api-gateway`, `auth-service`, `tasks-service`, `notifications-service`)
- [x] Integração completa com RabbitMQ (package compartilhado)
- [x] Implementação completa de DTOs/Guards (JWT Auth)
- [x] Implementação completa dos endpoints de autenticação e tarefas
- [x] CRUD completo de tarefas e comentários
- [x] WebSocket básico para notificações em tempo real
- [x] Rate limiting no Gateway
- [x] Swagger/OpenAPI documentation
- [ ] Persistência de notificações por usuário
- [ ] Audit log de alterações

---

### Fluxos (alto nível)

Autenticação

1. `register` cria usuário e retorna tokens.
2. `login` retorna tokens após validação.
3. Gateway protege rotas e valida `accessToken`; `refresh` renova.

CRUD de Tarefas

1. Criação/atualização no Tasks Service via Gateway.
2. Publicação de eventos no RabbitMQ.
3. Notifications Service consome e envia via WebSocket aos interessados.

Comentários

1. Gateway recebe comentário; Tasks Service persiste.
2. Evento é publicado; Notifications entrega `comment:new` aos participantes.

---

### Como testar rapidamente

- Usar `client.http` na raiz com uma extensão REST Client (VS Code) ou `curl`/Postman.
- Conferir logs dos containers: `docker compose logs -f <service>`.
- Acompanhar filas no RabbitMQ UI (`http://localhost:15672`).

---

Obrigado pela avaliação! Qualquer dúvida, fico à disposição.
