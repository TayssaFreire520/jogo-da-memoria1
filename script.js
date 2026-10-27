const tabuleiro = document.getElementById("tabuleiro");
const mensagem = document.getElementById("mensagem");
const reiniciar = document.getElementById("reiniciar");

let cartas = ["1", "2", "1", "2"];
let primeiraCarta = null;
let segundaCarta = null;
let paresEncontrados = 0;
let bloqueado = false;

function iniciarJogo() {
  tabuleiro.innerHTML = "";

  primeiraCarta = null;
  segundaCarta = null;
  paresEncontrados = 0;
  bloqueado = false;

  cartas.sort(() => Math.random() - 0.5);

  cartas.forEach((numero) => {
    const botao = document.createElement("button");

    botao.textContent = "?";
    botao.className = "carta";
    botao.type = "button";
    botao.dataset.numero = numero;
    botao.setAttribute("aria-label", "Carta fechada");

    botao.addEventListener("click", () => {
      virarCarta(botao);
    });

    tabuleiro.appendChild(botao);
  });

  mensagem.textContent = "Escolha uma carta para começar.";
}

function virarCarta(carta) {
  if (bloqueado) return;
  if (carta === primeiraCarta) return;
  if (carta.classList.contains("encontrada")) return;

  carta.textContent = carta.dataset.numero;
  carta.classList.add("selecionada");
  carta.setAttribute("aria-label", "Carta " + carta.dataset.numero);

  if (primeiraCarta === null) {
    primeiraCarta = carta;
    mensagem.textContent = "Agora escolha outra carta.";
    return;
  }

  segundaCarta = carta;

  if (primeiraCarta.dataset.numero === segundaCarta.dataset.numero) {
    primeiraCarta.classList.add("encontrada");
    segundaCarta.classList.add("encontrada");

    primeiraCarta.setAttribute(
      "aria-label",
      "Carta encontrada: " + primeiraCarta.dataset.numero,
    );

    segundaCarta.setAttribute(
      "aria-label",
      "Carta encontrada: " + segundaCarta.dataset.numero,
    );

    paresEncontrados++;

    mensagem.textContent = "Muito bem! Você encontrou um par.";

    primeiraCarta = null;
    segundaCarta = null;

    if (paresEncontrados === 2) {
      mensagem.textContent = "Parabéns! Você terminou o jogo!";
    }
  } else {
    bloqueado = true;

    mensagem.textContent = "As cartas são diferentes. Vamos fechá-las.";

    const primeira = primeiraCarta;
    const segunda = segundaCarta;

    const botaoFechar = document.createElement("button");
    botaoFechar.textContent = "Fechar cartas";
    botaoFechar.type = "button";

    mensagem.appendChild(document.createElement("br"));
    mensagem.appendChild(botaoFechar);

    botaoFechar.focus();

    botaoFechar.addEventListener("click", () => {
      primeira.textContent = "?";
      segunda.textContent = "?";

      primeira.classList.remove("selecionada");
      segunda.classList.remove("selecionada");

      primeira.setAttribute("aria-label", "Carta fechada");
      segunda.setAttribute("aria-label", "Carta fechada");

      primeiraCarta = null;
      segundaCarta = null;
      bloqueado = false;

      mensagem.textContent = "Tente novamente.";
      primeira.focus();
    });
  }
}

reiniciar.addEventListener("click", iniciarJogo);

iniciarJogo();
