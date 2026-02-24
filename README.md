# IA: Como Fazer a Pergunta Certa?

Versão temática e independente do site educacional, focada em ensinar como formular perguntas melhores para IA.

Esta implementação reutiliza a mesma base visual/funcional do projeto original (IA Descomplicada), mas com conteúdo adaptado para o tema:

- fundamentos da pergunta certa
- técnicas para refinar perguntas/prompts
- debug de perguntas e prompts
- pergunta interativa avançada
- boas práticas de uso e validação

## Objetivo desta versão

Ajudar iniciantes e usuários de IA a:

- transformar pedidos vagos em perguntas claras
- informar contexto, público e formato de saída
- usar técnicas de prompting conforme a tarefa
- revisar respostas e refinar perguntas
- aplicar validação e uso responsável

## Estrutura do projeto

```text

|-- index.html
|-- categoria-bases.html
|-- categoria-shots.html
|-- categoria-raciocinio.html
|-- categoria-controle.html
|-- categoria-qualidade.html
|-- categoria-interacao.html
|-- como-ia-funciona.html
|-- glossario-ia.html
|-- README.md
|-- css/
|   `-- estilos.css
`-- js/
    |-- script.js
    |-- paginas-categorias.js
    `-- glossario.js
```

## Páginas e conteúdo

- `index.html`
  - página principal da trilha “Como Fazer a Pergunta Certa?”
  - módulos, fundamentos, técnicas, prática guiada, quiz e resumo
- `categoria-*.html`
  - páginas por categoria com exemplos, fundamentação e aplicação
- `como-ia-funciona.html`
  - explica como a IA interpreta perguntas (objetivo, contexto, formato)
- `glossario-ia.html`
  - glossário temático para termos da pergunta certa e prompting

## Recursos implementados (nesta versão)

- navegação modular e por categorias
- biblioteca de técnicas com filtro e busca
- exemplos práticos de perguntas/prompts por técnica
- construtor rápido da pergunta certa
- debug de perguntas/prompts com diagnóstico e versão refinada
- pergunta interativa avançada com coleta de dados
- quiz avaliativo com correção automática
- checklist e blocos de apoio (“Saída+”)
- glossário temático com busca e filtro

## Arquivos principais para manutenção

- `js/script.js`
  - dados de técnicas, exemplos, busca/filtros e interações da página principal
- `js/paginas-categorias.js`
  - configuração e renderização das páginas de categoria
- `js/glossario.js`
  - termos, categorias e filtro do glossário
- `index.html`
  - estrutura da home e textos fixos da trilha

## Como executar

### Opção rápida

Abra `index.html` no navegador.

### Opção recomendada

Use um servidor local (ex.: Live Server no VS Code), especialmente para melhor compatibilidade com cópia de texto e navegação.

## Observações

- O foco desta versão é “como fazer a pergunta certa”, então ajustes de conteúdo devem preservar esse eixo temático.
