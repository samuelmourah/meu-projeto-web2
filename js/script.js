
const titulo = document.getElementById("titulo");
const placar = document.getElementById("placar");
const vezDoJogador = document.getElementById("vezDoJogador");
const celulas = document.getElementsByClassName("celula");
const mensagem = document.querySelector("#mensagem");
const botaoReiniciar = document.querySelector("#reiniciar");
const todasCelulas = document.querySelectorAll(".celula");


let proximoJogador = "X";
let jogadorAtual = "X";
let jogoAtivo = true;
let pontosX = 0;
let pontosO = 0;


const combinacoes = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];


todasCelulas.forEach((celula, index) => {
  celula.addEventListener("click", () => jogar(index));
});

function jogar(index) {
  if (!jogoAtivo || todasCelulas[index].textContent !== "") return;

  todasCelulas[index].textContent = jogadorAtual;

  if (verificarVencedor()) {
    mensagem.textContent = `Jogador ${jogadorAtual} venceu!`;
    jogoAtivo = false;
    atualizarPlacar();
    return;
  }

  if (empate()) {
    mensagem.textContent = "Empate!";
    jogoAtivo = false;
    return;
  }


  jogadorAtual = jogadorAtual === "X" ? "O" : "X";
  vezDoJogador.textContent = `Vez do jogador: ${jogadorAtual}`;
}


function verificarVencedor() {
  return combinacoes.some(combinacao => {
    const [a, b, c] = combinacao;
    if (
      todasCelulas[a].textContent &&
      todasCelulas[a].textContent === todasCelulas[b].textContent &&
      todasCelulas[a].textContent === todasCelulas[c].textContent
    ) {
      todasCelulas[a].classList.add("vencedor");
      todasCelulas[b].classList.add("vencedor");
      todasCelulas[c].classList.add("vencedor");
      return true;
    }
    return false;
  });
}


function empate() {
  return [...todasCelulas].every(celula => celula.textContent !== "");
}


function atualizarPlacar() {
  if (jogadorAtual === "X") {
    pontosX++;
  } else {
    pontosO++;
  }
  placar.textContent = `Placar - X: ${pontosX} | O: ${pontosO}`;
}


botaoReiniciar.addEventListener("click", () => {
  
  for (let i = 0; i < celulas.length; i++) {
    celulas[i].textContent = "";
    celulas[i].classList.remove("vencedor");
  }

  
  jogadorAtual = proximoJogador;
  proximoJogador = proximoJogador === "X" ? "O" : "X";

  
  jogoAtivo = true;
  mensagem.textContent = "";
  vezDoJogador.textContent = `Vez do jogador: ${jogadorAtual}`;
});
