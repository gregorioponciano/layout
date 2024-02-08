const symbols = ["1", "2", "3", "4", "5", "6", "7"];
const numReels = 3; //quantidade de linha do jogo horizontal
const numRows = 3; //quantidade de linha do jogo vertical

let playerChips = 100; //quantidade de fichas de um usuario
let selectedBet = 1;

// Combinações vencedoras
const winningCombinations = [
  ["1", "1", "1"],
  ["2", "2", "2"],
  ["3", "3", "3"],
  ["4", "4", "4"],
  ["5", "5", "5"],
  ["6", "6", "6"],
  ["7", "7", "7"]

];

function getRandomSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function placeBet() {
  selectedBet = parseInt(document.getElementById('bet-amount').value);
  if (playerChips >= selectedBet) {
    playerChips -= selectedBet;
    updatePlayerChips();

    let result = [];
    for (let i = 0; i < numReels; i++) {
      let column = [];
      for (let j = 0; j < numRows; j++) {
        column.push(getRandomSymbol());
      }
      result.push(column);
    }

    displayResult(result, selectedBet);
  } else {
    alert("Você não tem fichas suficientes para fazer essa aposta.");
  }
}

function displayResult(result, betAmount) {
  let reels = document.getElementById('reels');
  reels.innerHTML = '';

  for (let i = 0; i < numReels; i++) {
    let reel = document.createElement('div');
    reel.classList.add('reel');
    for (let j = 0; j < numRows; j++) {
      let symbol = document.createElement('div');
      symbol.classList.add('symbol');
      symbol.innerText = result[i][j];
      reel.appendChild(symbol);
    }
    reels.appendChild(reel);
  }

  setTimeout(() => {
    stopSpinning();
    checkWin(result, betAmount);
  }, 3000); // Tempo de girar (em milissegundos)
}

function stopSpinning() {
  const symbols = document.querySelectorAll('.symbol');
  symbols.forEach(symbol => {
    symbol.style.animation = 'none'; // Parar a animação de giro
  });
}


function checkWin(result, betAmount) {
  let win = false;

  // Verificar se alguma combinação vencedora ocorreu
  for (let i = 0; i < winningCombinations.length; i++) {
    let [symbol1, symbol2, symbol3] = winningCombinations[i];
    for (let j = 0; j < numReels; j++) {
      if (result[j][0] === symbol1 && result[j][1] === symbol2 && result[j][2] === symbol3) {
        win = true;
        break;
      }
    }
  }

  let resultText = document.getElementById('result');
  if (win) {
    resultText.innerText = "Parabéns! Você ganhou!";
    resultText.style.color = "green";
    playerChips += betAmount * 100; // Exemplo: ganha o dobro da aposta
  } else {
    resultText.innerText = "Você perdeu! Tente novamente.";
    resultText.style.color = "red";
  }
  updatePlayerChips();
}

function updatePlayerChips() {
  document.getElementById('player-chips').innerText = playerChips;
}