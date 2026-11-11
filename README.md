# Sistema Acadêmico — Atividade 1: Rotas e navegação no Next.js

Aplicação para consultar e cadastrar alunos e matrículas e consultar as disciplinas do curso.

## Executar

```bash
npm install
npm run dev
```

Acesse http://localhost:3000.

## Rotas

| Rota | Descrição |
| --- | --- |
| `/` | Página inicial com links para as áreas |
| `/alunos` | Lista de alunos com total de registros |
| `/alunos/[ra]` | Detalhes do aluno pelo RA |
| `/alunos/novo` | Cadastro de aluno |
| `/disciplinas` | Catálogo fixo com as 39 disciplinas em cartões |
| `/matriculas` | Tabela de matrículas com nomes de alunos e disciplinas |
| `/matriculas/nova` | Cadastro de matrícula |

## Organização

- `src/app/` — páginas e layouts (App Router), incluindo a página 404.
- `src/components/` — cabeçalho, rodapé, menu lateral e contexto da aplicação.
- `src/data/` — arquivos de dados fornecidos na atividade.

## Estado

Alunos e matrículas ficam em um contexto React (`AppProvider`) sincronizado com o `localStorage` do navegador. As disciplinas são uma coleção fixa. Não há banco de dados, API ou autenticação.
