let xSnack = 200, ySnack = 200, xFood = 0, yFood = 0, direcaoX = 0, direcaoY = 0;

const criarComida = () => {
  xFood = Math.floor(Math.random() * 381)
  yFood = Math.floor(Math.random() * 381)
}

function setup() {
  createCanvas(400, 400);
  criarComida()

  document.querySelector('#btnEsquerda').addEventListener('click', () => {
    direcaoX = -1;
    direcaoY = 0
  });
  document.querySelector('#btnCima').addEventListener('click', () => {
    direcaoY = -1;
    direcaoX = 0
  });
  document.querySelector('#btnBaixo').addEventListener('click', () => {
    direcaoY = 1;
    direcaoX = 0
  });
  document.querySelector('#btnDireita').addEventListener('click', () => {
    direcaoX = 1;
    direcaoY = 0
  });
}

function draw() {
  background('#0EA6E6');

  fill('#A020F0')
  circle(xFood, yFood, 15)

  fill('#F80A0A');
  square(xSnack, ySnack, 15);

  xSnack += direcaoX;
  ySnack += direcaoY;

  if (xSnack <= 0 || xSnack >= 385 || ySnack <= 0 || ySnack >= 385) {
    alert('Game Over!');
    xSnack = 200;
    ySnack = 200;
    direcaoX = 0;
    direcaoY = 0;
    criarComida()
  }

  if (xSnack <= xFood + 15 && xSnack + 15 >= xFood && ySnack <= yFood + 15 && ySnack + 15 >= yFood) {
    console.log('comeu');
    criarComida();
  }
}