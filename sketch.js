let xSnake = 200, ySnake = 200, xFood = 0, yFood = 0, direcaoX = 0, direcaoY = 0, ponto = 0, tamanhoDocorpo = 1, xTamanho = 15, yTamanho = 15, recorde;

// Função para criar comida em posições aleatórias
const criarComida = () => {
  xFood = Math.floor(Math.random() * 381);
  yFood = Math.floor(Math.random() * 381);
}


// Função para contar pontos e atualizar a pontuação na tela
const contarPonto = () => {
  ponto += 1;

  if (ponto < 10) {
    document.querySelector('#pontuacao').innerText = `00${ponto}`;
  } else if (ponto < 100) {
    document.querySelector('#pontuacao').innerText = `0${ponto}`;
  } else {
    document.querySelector('#pontuacao').innerText = ponto;
  }
}

// Função para verificar e atualizar o recorde
const addRecorde = () => {
  recorde = localStorage.getItem('ultimaPontuacao') || 0;

  if (ponto >= recorde) {
    localStorage.setItem('ultimaPontuacao', ponto);
    recorde = ponto;
  }

  if (recorde < 10) {
    document.querySelector('#recorde').innerText = `00${recorde}`;
  } else if (recorde < 100) {
    document.querySelector('#recorde').innerText = `0${recorde}`;
  } else {
    document.querySelector('#recorde').innerText = recorde;
  }
}

function setup() {
  createCanvas(400, 400);
  criarComida();
  addRecorde();

  // Funções para mudar a direção do movimento
  function irParaCima() {
    direcaoY = -1;
    direcaoX = 0;
    yTamanho+=tamanhoDocorpo
    xTamanho = 15
  }

  function irParaBaixo() {
    direcaoY = 1;
    direcaoX = 0;
    yTamanho+=tamanhoDocorpo
    xTamanho = 15
  }

  function irParaEsquerda() {
    direcaoX = -1;
    direcaoY = 0;
    xTamanho+=tamanhoDocorpo
    yTamanho = 15
  }

  function irParaDireita() {
    direcaoX = 1;
    direcaoY = 0;
    xTamanho+=tamanhoDocorpo
    yTamanho = 15
  }

  // Adiciona eventos aos botões para mudar a direção do movimento
  document.querySelector('#btnCima').addEventListener('click', irParaCima);
  document.querySelector('#btnBaixo').addEventListener('click', irParaBaixo);
  document.querySelector('#btnEsquerda').addEventListener('click', irParaEsquerda);
  document.querySelector('#btnDireita').addEventListener('click', irParaDireita);

  // Adiciona eventos para as teclas de seta para mudar a direção do movimento
  document.addEventListener('keydown', function (event) {
    switch (event.key) {
      case 'ArrowUp':
        irParaCima();
        break;
      case 'ArrowDown':
        irParaBaixo();
        break;
      case 'ArrowLeft':
        irParaEsquerda();
        break;
      case 'ArrowRight':
        irParaDireita();
        break;
    }
  });
}

function draw() {


  background('#0EA6E6');

  fill('#A020F0');
  circle(xFood, yFood, 15);

  fill('#F80A0A');
  rect(xSnake, ySnake,xTamanho, yTamanho);

  xSnake += direcaoX;
  ySnake += direcaoY;

  // Verifica colisão com as bordas do canvas
  if (xSnake <= 0 || xSnake >= 385 || ySnake <= 0 || ySnake >= 385) {
    addRecorde();
    xSnake = 200;
    ySnake = 200;
    direcaoX = 0;
    direcaoY = 0;
    ponto = 0;
    xTamanho = 15;
    yTamanho = 15;
    tamanhoDocorpo = 1
    document.querySelector('#pontuacao').innerText = `00${ponto}`;
    criarComida();
  }

  // Verifica colisão com a comida
  if (xSnake < xFood + 15 && xSnake + 15 > xFood && ySnake < yFood + 15 && ySnake + 15 > yFood) {
    tamanhoDocorpo++;
    criarComida();
    contarPonto();
    tamanhoDocorpo += 15
  }
}
