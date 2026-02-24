const termosGlossario = [
  { termo: "Pergunta vaga", categoria: "fundamentos", explicacao: "Pedido amplo, sem objetivo claro, que gera respostas genericas.", exemplo: "Ex.: 'Me ajuda com IA?'." },
  { termo: "Prompt", categoria: "fundamentos", explicacao: "Instrucao ou pergunta enviada para orientar a resposta da IA.", exemplo: "Ex.: 'Resuma este texto em 5 topicos'." },
  { termo: "Objetivo", categoria: "estrutura", explicacao: "Acao principal que voce espera da IA (explicar, comparar, listar, criar).", exemplo: "Ex.: 'Compare duas opcoes de curso'." },
  { termo: "Contexto", categoria: "estrutura", explicacao: "Cenario, dados ou situacao que ajudam a IA a responder com aderencia.", exemplo: "Ex.: 'Sou iniciante, tenho 30 min por dia'." },
  { termo: "Publico-alvo", categoria: "estrutura", explicacao: "Para quem a resposta sera escrita, o que ajusta linguagem e profundidade.", exemplo: "Ex.: 'Explique para estudantes do ensino medio'." },
  { termo: "Formato de saida", categoria: "estrutura", explicacao: "Estrutura esperada para a resposta (lista, tabela, passos, checklist).", exemplo: "Ex.: 'Entregue em checklist com prioridades'." },
  { termo: "Restricoes", categoria: "estrutura", explicacao: "Limites que definem o que incluir, evitar ou tamanho da resposta.", exemplo: "Ex.: 'No maximo 150 palavras e sem jargoes'." },
  { termo: "Criterios de qualidade", categoria: "qualidade", explicacao: "Regras para avaliar se a resposta esta boa (clareza, precisao, utilidade).", exemplo: "Ex.: 'Priorize clareza e aplicabilidade'." },
  { termo: "Delimitadores", categoria: "estrutura", explicacao: "Tags ou marcadores que separam contexto, dados e tarefa.", exemplo: "Ex.: <contexto>...</contexto> <tarefa>...</tarefa>." },
  { termo: "Persona", categoria: "tecnicas", explicacao: "Papel atribuido a IA para orientar tom e especializacao da resposta.", exemplo: "Ex.: 'Atue como orientador de estudos'." },
  { termo: "Zero-shot", categoria: "tecnicas", explicacao: "Pedido sem exemplos previos; a IA responde apenas com base na instrucao.", exemplo: "Ex.: 'Classifique o sentimento desta frase'." },
  { termo: "One-shot", categoria: "tecnicas", explicacao: "Pedido com um exemplo para mostrar o padrao esperado.", exemplo: "Ex.: mostrar 1 modelo e pedir outro no mesmo formato." },
  { termo: "Few-shot", categoria: "tecnicas", explicacao: "Pedido com alguns exemplos para reforcar estilo, formato ou classificacao.", exemplo: "Ex.: 3 exemplos de saida antes da tarefa principal." },
  { termo: "Chain-of-Thought (CoT)", categoria: "tecnicas", explicacao: "Tecnica que solicita raciocinio por etapas para tarefas complexas.", exemplo: "Ex.: 'Resolva passo a passo antes da resposta final'." },
  { termo: "Prompt chaining", categoria: "tecnicas", explicacao: "Encadeamento de perguntas em etapas, usando a saida anterior como entrada.", exemplo: "Diagnostico -> plano -> checklist final." },
  { termo: "Metaprompt", categoria: "tecnicas", explicacao: "Prompt que ajuda a criar, revisar ou melhorar outros prompts.", exemplo: "Ex.: 'Revise minha pergunta e sugira melhorias'." },
  { termo: "Refinamento", categoria: "qualidade", explicacao: "Processo de ajustar a pergunta apos testar a resposta.", exemplo: "Adicionar contexto, formato ou restricoes apos a primeira tentativa." },
  { termo: "Ambiguidade", categoria: "qualidade", explicacao: "Quando a pergunta permite varias interpretacoes e confunde a resposta.", exemplo: "Ex.: 'Faça um plano bom' sem dizer para que situacao." },
  { termo: "Verificacao", categoria: "qualidade", explicacao: "Checagem de fatos, coerencia e limites antes de usar a resposta.", exemplo: "Confirmar dados sensiveis em fontes confiaveis." },
  { termo: "Alucinacao", categoria: "qualidade", explicacao: "Quando a IA gera informacao plausivel, mas incorreta.", exemplo: "Inventar dado, referencia ou passo inexistente." },
  { termo: "Iteracao", categoria: "qualidade", explicacao: "Ciclo de perguntar, testar, avaliar e melhorar.", exemplo: "Comparar duas versoes da mesma pergunta." },
  { termo: "Saida util", categoria: "fundamentos", explicacao: "Resposta que pode ser aplicada no seu contexto real, e nao apenas 'bonita'.", exemplo: "Checklist acionavel em vez de texto generico." }
];

document.addEventListener("DOMContentLoaded", () => {
  const campoBusca = document.getElementById("buscaGlossario");
  const campoCategoria = document.getElementById("filtroCategoriaGlossario");
  const botaoLimpar = document.getElementById("botaoLimparBuscaGlossario");
  const contador = document.getElementById("contadorGlossario");
  const grade = document.getElementById("gradeGlossario");

  if (!campoBusca || !campoCategoria || !grade) {
    return;
  }

  const normalizarTexto = (texto) => String(texto).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const escaparHtml = (texto) => String(texto).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/'/g, "&#039;");

  function renderizar(lista) {
    if (contador) {
      contador.textContent = `${lista.length} termos`;
    }

    if (!lista.length) {
      grade.innerHTML = `<div class="col-12"><div class="alerta-vazio">Nenhum termo encontrado com esse filtro.</div></div>`;
      return;
    }

    grade.innerHTML = lista
      .map((item) => `
        <div class="col-12 col-md-6">
          <article class="card card-tecnica h-100">
            <div class="card-body">
              <div class="cabecalho-tecnica mb-2">
                <h3 class="h5 mb-0">${escaparHtml(item.termo)}</h3>
                <span class="etiqueta-categoria">${escaparHtml(item.categoria)}</span>
              </div>
              <p class="mb-2"><strong>Explicacao:</strong> ${escaparHtml(item.explicacao)}</p>
              <div class="caixa-saida-mais mt-2">
                <h4 class="h6 mb-2">Exemplo pratico</h4>
                <p class="mb-0">${escaparHtml(item.exemplo)}</p>
              </div>
            </div>
          </article>
        </div>
      `)
      .join("");
  }

  function aplicarFiltros() {
    const termo = normalizarTexto(campoBusca.value.trim());
    const categoria = campoCategoria.value;

    const filtrados = termosGlossario.filter((item) => {
      const categoriaOk = categoria === "todas" || item.categoria === categoria;
      if (!categoriaOk) return false;
      if (!termo) return true;

      const base = normalizarTexto(`${item.termo} ${item.explicacao} ${item.exemplo} ${item.categoria}`);
      return base.includes(termo);
    });

    renderizar(filtrados);
  }

  campoBusca.addEventListener("input", aplicarFiltros);
  campoCategoria.addEventListener("change", aplicarFiltros);

  if (botaoLimpar) {
    botaoLimpar.addEventListener("click", () => {
      campoBusca.value = "";
      campoCategoria.value = "todas";
      aplicarFiltros();
    });
  }

  renderizar(termosGlossario);
});
