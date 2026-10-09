# nest-api-treinos

API REST de treinos construída com **NestJS**, **TypeScript** e **PostgreSQL** (via TypeORM). Projeto de estudo: um CRUD simples para praticar a estrutura do NestJS.

## O que tem aqui

- **Módulos, controllers e services** do NestJS (`src/treinos`)
- **Entidade** TypeORM mapeada para uma tabela no PostgreSQL
- **Validação** de entrada com `class-validator` (DTOs)
- **Tratamento de erros** (`404` quando o treino não existe)
- **Testes unitários** do service com Jest

## Como rodar

Pré-requisitos: Node.js 20+ e Docker (para o PostgreSQL).

```bash
# 1. subir o PostgreSQL
docker compose up -d

# 2. configurar as variáveis de ambiente
cp .env.example .env

# 3. instalar e iniciar
npm install
npm run start:dev
```

A API sobe em `http://localhost:3000`. A tabela `treinos` é criada automaticamente (`synchronize: true`, só para desenvolvimento).

## Endpoints

| Método | Rota | Descrição |
|---|---|---|
| POST | `/treinos` | Cria um treino |
| GET | `/treinos` | Lista os treinos |
| GET | `/treinos/:id` | Busca um treino |
| PATCH | `/treinos/:id` | Atualiza campos do treino |
| DELETE | `/treinos/:id` | Remove um treino |

Exemplo:

```bash
curl -X POST http://localhost:3000/treinos \
  -H "Content-Type: application/json" \
  -d '{"exercicio":"Supino","series":4,"repeticoes":10,"carga":60}'
```

## Testes

```bash
npm test
npm run test:cov
```

## Estrutura

```
src/
  main.ts              # inicialização e validação global
  app.module.ts        # configuração do banco (PostgreSQL)
  treinos/
    treino.entity.ts   # tabela
    treinos.controller.ts
    treinos.service.ts
    treinos.module.ts
    dto/               # validação de entrada
```

## Próximos passos

- Migrations no lugar de `synchronize`
- Autenticação com JWT
- Testes de integração (end-to-end)
