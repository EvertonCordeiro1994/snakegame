let xSnack = 200, ySnack = 200, xFood = 0, yFood = 0, direcaoX = 0, direcaoY = 0, ponto = 0, recorde;

// Função para criar comida em posições aleatórias
const criarComida = () => {
  xFood = Math.floor(Math.random() * 381);
  yFood = Math.floor(Math.random() * 381);
}

// Função para contar pontos e atualizar a pontuação na tela
const contarPonto = () => {
  ponto += 1;
  document.querySelector('#pontuacao').innerText = `00${ponto}`;
}

// Função para verificar e atualizar o recorde
const addRecorde = () => {
  recorde = localStorage.getItem('ultimaPontuacao') || 0;

  if (ponto >= recorde) {
    localStorage.setItem('ultimaPontuacao', ponto);
    recorde = ponto;
  }

  document.querySelector('#recorde').innerText = `00${recorde}`;
}

function setup() {
  createCanvas(400, 400);
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
  square(xSnack, ySnack, 15);

  xSnack += direcaoX;
  ySnack += direcaoY;

  // Verifica colisão com as bordas do canvas
  if (xSnack <= 0 || xSnack >= 385 || ySnack <= 0 || ySnack >= 385) {
    addRecorde();
    alert('Game Over!');
    xSnack = 200;
    ySnack = 200;
    direcaoX = 0;
    direcaoY = 0;
    ponto = 0;
    document.querySelector('#pontuacao').innerText = `00${ponto}`;
    criarComida();
  }

  // Verifica colisão com a comida
  if (xSnack <= xFood + 15 && xSnack + 15 >= xFood && ySnack <= yFood + 15 && ySnack + 15 >= yFood) {
    console.log('comeu');
    criarComida();
    contarPonto();
  }
}
