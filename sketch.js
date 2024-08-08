let xSnake = 200, 
    ySnake = 200, 
    xFood = 0, 
    yFood = 0, 
    direcaoX = 0, 
    direcaoY = 0, 
    ponto = 0, 
    tamanhoDocorpo = 15, 
    recorde;

const cobra = [{ x: 200, y: 200 }];

// Função para criar comida em posições aleatórias
const criarComida = () => {
  xFood = Math.floor(Math.random() * (width - tamanhoDocorpo));
  yFood = Math.floor(Math.random() * (width - tamanhoDocorpo));
}

// Função para desenhar o corpo da cobra
const corpoSnake = () => {
  cobra.forEach((position, index) => {
    fill(index == cobra.length - 1 ? 'blue' : 'green');
    rect(position.x, position.y, tamanhoDocorpo, tamanhoDocorpo);
  });
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
  frameRate(10)
  criarComida();
  addRecorde();

  // Funções para mudar a direção do movimento
  function irParaCima() {
    direcaoY = -1;
    direcaoX = 0;
  }

  function irParaBaixo() {
    direcaoY = 1;
    direcaoX = 0;
  }

  function irParaEsquerda() {
    direcaoX = -1;
    direcaoY = 0;
  }

  function irParaDireita() {
    direcaoX = 1;
    direcaoY = 0;
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
  corpoSnake();

  // Movimenta a cobra
  xSnake += direcaoX * tamanhoDocorpo;
  ySnake += direcaoY * tamanhoDocorpo;

  cobra.push({ x: xSnake, y: ySnake });
  if (cobra.length > ponto + 1) {
    cobra.shift();
  }

  // Verifica colisão com as bordas do canvas
  if (xSnake < 0 || xSnake > width - tamanhoDocorpo || ySnake < 0 || ySnake > height - tamanhoDocorpo) {
    addRecorde();
    xSnake = 200;
    ySnake = 200;
    direcaoX = 0;
    direcaoY = 0;
    ponto = 0;
    cobra.splice(1);
    document.querySelector('#pontuacao').innerText = `00${ponto}`;
    criarComida();
  }

  // Verifica colisão com a comida
  if (xSnake < xFood + 15 && xSnake + 15 > xFood && ySnake < yFood + 15 && ySnake + 15 > yFood) {
    contarPonto();
    criarComida();
    cobra.push({ x: xSnake, y: ySnake });
  }
}
