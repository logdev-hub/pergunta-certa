document.addEventListener("DOMContentLoaded", () => {
  const categoriaAtual = document.body.getAttribute("data-categoria");
  const dados = Array.isArray(window.dadosPrompting) ? window.dadosPrompting : [];
  const obterExemplosDiaADia = window.obterExemplosDiaADia || ((tecnica) => tecnica.exemplos || []);
  const gerarFundamentacaoSimples = window.gerarFundamentacaoSimples || (() => "Fundamentacao nao disponivel.");
  const gerarDesafioRapido = window.gerarDesafioRapido || (() => "Desafio nao disponivel.");

  const configuracaoCategorias = {
    bases: {
      titulo: "Bases da Pergunta Certa",
      descricao: "Fundamentos para formular perguntas claras, com objetivo, contexto, publico e estrutura consistente.",
      campos: ["Estudo", "Atendimento", "Comunicacao do dia a dia", "Planejamento de rotina"],
      analogiaGeral: "Perguntar bem e como passar um briefing: quando faltam detalhes, a resposta tende a sair incompleta.",
      desafioPagina: "Desafio da pagina: pegue uma pergunta vaga do seu dia a dia e refaca com objetivo, contexto, publico e formato."
    },
    shots: {
      titulo: "Tecnicas por Shots",
      descricao: "Modelos com zero, um ou varios exemplos para controlar padrao e formato da resposta da IA.",
      campos: ["Mensagens", "Listas", "Classificacao de textos", "Padronizacao de conteudos"],
      analogiaGeral: "E como ensinar por demonstracao: um exemplo mostra o caminho, varios exemplos reduzem interpretacoes erradas.",
      desafioPagina: "Desafio da pagina: monte um one-shot e um few-shot para a mesma pergunta e compare a consistencia da saida."
    },
    raciocinio: {
      titulo: "Raciocinio e Encadeamento",
      descricao: "Abordagens para formular perguntas por etapas, com planejamento e comparacao de caminhos.",
      campos: ["Decisoes pessoais", "Planejamento de viagem", "Organizacao financeira", "Resolucao de problemas"],
      analogiaGeral: "E igual resolver um problema de transito: voce compara rotas antes de escolher a melhor.",
      desafioPagina: "Desafio da pagina: escolha uma decisao real e escreva uma pergunta em etapas antes de pedir a conclusao."
    },
    controle: {
      titulo: "Controle da Resposta",
      descricao: "Ajustes de complexidade, tom, sentimento, foco e estilo para diferentes publicos.",
      campos: ["Textos formais", "Mensagens casuais", "Resumo e detalhamento", "Comunicao adaptada"],
      analogiaGeral: "Pense num controle de volume: a pergunta mira o mesmo tema, mas a intensidade muda conforme o contexto.",
      desafioPagina: "Desafio da pagina: escreva o mesmo tema em dois tons diferentes e analise o impacto no leitor."
    },
    qualidade: {
      titulo: "Verificacao e Refinamento",
      descricao: "Tecnicas para revisar respostas, reduzir alucinacoes e melhorar confiabilidade com refinamento.",
      campos: ["Checagem de informacoes", "Revisao critica", "Textos sensiveis", "Aprimoramento continuo"],
      analogiaGeral: "E como revisar um contrato: voce nao confia na primeira versao sem checar pontos criticos.",
      desafioPagina: "Desafio da pagina: escolha uma resposta longa e aplique verificacao com 3 perguntas de auditoria."
    },
    interacao: {
      titulo: "Interacao e Refinamento Guiado",
      descricao: "Formulacao colaborativa para construir perguntas melhores com refinamento guiado e otimizacao automatica.",
      campos: ["Briefing guiado", "Coleta de dados do usuario", "Refino colaborativo", "Otimizacao de pergunta/prompt"],
      analogiaGeral: "Funciona como uma entrevista bem feita: primeiro voce coleta dados, depois entrega a solucao.",
      desafioPagina: "Desafio da pagina: construa uma pergunta/prompt que faca perguntas numeradas antes de gerar a resposta final."
    }
  };

  const informacoes = configuracaoCategorias[categoriaAtual];
  const elementoTitulo = document.getElementById("tituloCategoria");
  const elementoDescricao = document.getElementById("descricaoCategoria");
  const elementoCampos = document.getElementById("listaCamposCategoria");
  const elementoContador = document.getElementById("contadorPromptsCategoria");
  const elementoGrade = document.getElementById("gradeCategoria");
  const elementoFundamentacao = document.getElementById("fundamentacaoCategoria");
  const elementoDesafioPagina = document.getElementById("desafioCategoriaPagina");

  const formularioAplicacao = document.getElementById("formularioAplicacaoCategoria");
  const campoObjetivoAplicacao = document.getElementById("campoObjetivoAplicacao");
  const campoPublicoAplicacao = document.getElementById("campoPublicoAplicacao");
  const campoContextoAplicacao = document.getElementById("campoContextoAplicacao");
  const campoFormatoAplicacao = document.getElementById("campoFormatoAplicacao");
  const saidaAplicacao = document.getElementById("saidaAplicacaoCategoria");
  const botaoCopiarAplicacao = document.getElementById("botaoCopiarAplicacaoCategoria");
  const saidaMaisAplicacao = document.getElementById("saidaMaisAplicacaoCategoria");

  if (!informacoes || !elementoGrade) {
    return;
  }

  function escaparHtml(texto) {
    return String(texto)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  const listaFiltrada = dados.filter((item) => item.categoria === categoriaAtual);

  if (elementoTitulo) {
    elementoTitulo.textContent = informacoes.titulo;
  }
  if (elementoDescricao) {
    elementoDescricao.textContent = informacoes.descricao;
  }
  if (elementoContador) {
    elementoContador.textContent = `${listaFiltrada.length} tecnicas nesta categoria`;
  }
  if (elementoCampos) {
    elementoCampos.innerHTML = informacoes.campos.map((campo) => `<li>${escaparHtml(campo)}</li>`).join("");
  }
  if (elementoFundamentacao) {
    elementoFundamentacao.innerHTML = `
      <p class="mb-2"><strong>Fundamentacao da categoria:</strong> ${escaparHtml(informacoes.analogiaGeral)}</p>
      <p class="mb-0">Objetivo didatico: transformar tecnicas em perguntas melhores e praticas aplicaveis, com linguagem simples e foco em situacoes reais.</p>
    `;
  }
  if (elementoDesafioPagina) {
    elementoDesafioPagina.textContent = informacoes.desafioPagina;
  }

  if (!listaFiltrada.length) {
    elementoGrade.innerHTML = `
      <div class="col-12">
        <div class="alerta-vazio">Nenhuma tecnica encontrada para esta categoria.</div>
      </div>
    `;
    return;
  }

  elementoGrade.innerHTML = listaFiltrada
    .map((tecnica) => {
      const exemplosCotidianos = obterExemplosDiaADia(tecnica).slice(0, 2);
      const exemplosHtml = exemplosCotidianos
        .map((exemplo) => {
          const promptCodificado = encodeURIComponent(exemplo.prompt);
          return `
            <article class="item-exemplo">
              <h4>${escaparHtml(exemplo.titulo)}</h4>
              <pre class="codigo-prompt">${escaparHtml(exemplo.prompt)}</pre>
              <button type="button" class="btn btn-sm btn-outline-primary btn-copiar" data-texto="${promptCodificado}">Copiar exemplo</button>
            </article>
          `;
        })
        .join("");

      return `
        <div class="col-12">
          <article class="card card-tecnica">
            <div class="card-body">
              <div class="cabecalho-tecnica mb-2">
                <h3 class="h5 mb-0">${escaparHtml(tecnica.nome)}</h3>
                <span class="etiqueta-categoria">${escaparHtml(categoriaAtual)}</span>
              </div>
              <p class="texto-explicacao-categoria"><strong>Explicacao objetiva:</strong> ${escaparHtml(tecnica.resumo)}</p>
              <p class="texto-explicacao-categoria"><strong>Fundamentacao simples:</strong> ${escaparHtml(gerarFundamentacaoSimples(tecnica))}</p>
              <p class="texto-explicacao-categoria"><strong>Analogia:</strong> ${escaparHtml(tecnica.analogia)}</p>
              <p class="texto-explicacao-categoria"><strong>Quando usar:</strong> ${escaparHtml(tecnica.quandoUsar)}</p>
              <p class="texto-explicacao-categoria mb-3"><strong>Campos de aplicacao:</strong> ${escaparHtml(informacoes.campos.join(", "))}.</p>
              <div class="lista-exemplos">${exemplosHtml}</div>
              <div class="caixa-saida-mais mt-3">
                <h4 class="h6 mb-2">Desafio rapido da tecnica</h4>
                <p class="mb-0">${escaparHtml(gerarDesafioRapido(tecnica))}</p>
              </div>
            </div>
          </article>
        </div>
      `;
    })
    .join("");

  function mostrarToastLocal(mensagem) {
    const elementoToast = document.getElementById("toastCopia");
    const elementoMensagem = document.getElementById("mensagemToast");
    if (!elementoToast || !elementoMensagem) {
      return;
    }
    elementoMensagem.textContent = mensagem;
    const toast = new bootstrap.Toast(elementoToast, { delay: 1800 });
    toast.show();
  }

  async function copiarTexto(texto) {
    try {
      await navigator.clipboard.writeText(texto);
      mostrarToastLocal("Pergunta/prompt copiado com sucesso.");
    } catch (erro) {
      mostrarToastLocal("Nao foi possivel copiar automaticamente.");
    }
  }

  if (formularioAplicacao && saidaAplicacao) {
    formularioAplicacao.addEventListener("submit", (evento) => {
      evento.preventDefault();
      const objetivo = campoObjetivoAplicacao ? campoObjetivoAplicacao.value.trim() : "";
      const publico = campoPublicoAplicacao ? campoPublicoAplicacao.value.trim() : "";
      const contexto = campoContextoAplicacao ? campoContextoAplicacao.value.trim() : "";
      const formato = campoFormatoAplicacao ? campoFormatoAplicacao.value.trim() : "";

      if (!objetivo || !publico) {
        mostrarToastLocal("Preencha objetivo e publico para gerar a pergunta/prompt.");
        return;
      }

      const linhas = [
        `Atue como especialista em formular perguntas na categoria ${informacoes.titulo}.`,
        `Objetivo: ${objetivo}.`,
        `Publico-alvo: ${publico}.`,
        `Contexto: ${contexto || "nao informado"}.`,
        `Formato de saida: ${formato || "lista objetiva em topicos"}.`,
        `Campos prioritarios de aplicacao: ${informacoes.campos.join(", ")}.`,
        "Se necessario, faca ate 3 perguntas de refinamento antes da resposta final.",
        "Finalize com um bloco de orientacoes praticas e uma versao pronta para copiar."
      ];

      saidaAplicacao.value = linhas.join("\n");
      if (saidaMaisAplicacao) {
        saidaMaisAplicacao.innerHTML = `
          <h3 class="h6 mb-2">Saida+ | Informacoes complementares</h3>
          <p class="mb-2"><strong>Checklist:</strong> confirme que a pergunta/prompt inclui contexto real, publico e formato de resposta.</p>
          <p class="mb-0">Teste recomendado: execute 2 vezes com pequenas variacoes para validar consistencia.</p>
        `;
      }
      mostrarToastLocal("Pergunta/prompt da categoria gerado.");
    });
  }

  if (botaoCopiarAplicacao && saidaAplicacao) {
    botaoCopiarAplicacao.addEventListener("click", () => {
      if (!saidaAplicacao.value.trim()) {
        mostrarToastLocal("Gere uma pergunta/prompt de aplicacao antes de copiar.");
        return;
      }
      copiarTexto(saidaAplicacao.value);
    });
  }

  document.addEventListener("click", (evento) => {
    const botao = evento.target.closest(".btn-copiar");
    if (!botao) return;
    const textoCodificado = botao.getAttribute("data-texto");
    if (!textoCodificado) return;
    copiarTexto(decodeURIComponent(textoCodificado));
  });
});
