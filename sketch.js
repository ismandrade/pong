//variaveis da bolinha

let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;
let raio = diametro / 2;

//velocidade da bolinha

let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

// variaveis raquete

let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 13;
let raqueteAltura = 100;

// variaveis do oponente

let xRaqueteOponente = 583;
let yRaqueteOponente = 150;
let velocidadeYOponente;

let chancedeerrar = 0;

let colidiu = false;

//placar do jogo

let meuspontos = 0;
let pontosoponente = 0;

//sons do jogo

let raquetada;
let ponto;
let trilha;

function preload (){
  trilha = loadSound ("trilha.mp3");
  ponto = loadSound ("ponto.mp3");
  raquetada = loadSound ("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop ();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisao();
  mostraraquete(xRaquete, yRaquete);
  mostraraquete (xRaqueteOponente, yRaqueteOponente);
  movimentoraquete();
  colisaoraquete (xRaquete, yRaquete);
  colisaoraquete (xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  incluirplacar (meuspontos, 200, 26);
  incluirplacar (pontosoponente, 350, 26)
  marcarponto ();
  bolinhaNaoFicaPresa ();
}

function mostraBolinha() {
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisao() {
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXBolinha *= -1;
  }

  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYBolinha *= -1;
  }
}


function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
    xBolinha = 23
    }
}

function mostraraquete(x, y) {
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentoraquete() {
  if (keyIsDown(UP_ARROW)) {
    yRaquete += -10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete -= -10;
  }
}

function colisaoraquete(x, y) {
  colidiu = collideRectCircle(
    x,
    y,
    raqueteComprimento,
    raqueteAltura,
    xBolinha,
    yBolinha,
    raio
  );
  if (colidiu) {
    velocidadeXBolinha *= -1;
    raquetada.play ();
  }
}

function movimentaRaqueteOponente() {
  velocidadeYOponente =
    yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chancedeerrar;
  calcularchancedeerrar ();
}

function incluirplacar (pontos, x, y){
  textAlign (CENTER);
  textSize (20);
  fill (color (255,140,0));
  rect (x, y, 60, 40);
  fill (255);
  text (meuspontos, 230, 53);
  fill (255);
  text (pontosoponente, 380, 53);
}

function marcarponto (){
  if (xBolinha > 590){
    meuspontos += 1;
    ponto.play ();
  }
  if (xBolinha < 10){
    pontosoponente += 1;
    ponto.play ();
  }
}
function calcularchancedeerrar () {
  if (pontosoponente >= meuspontos) {
    chancedeerrar += 1;
    if (chancedeerrar >= 39){
    chancedeerrar = 40;
    }
  } else {
    chancedeerrar -= 1;
    if (chancedeerrar <= 35){
    chancedeerrar = 35;
    }
  }
}