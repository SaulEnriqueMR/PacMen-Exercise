let pos = 0;
const pacArray = [
  ['./images/PacMan1.png', './images/PacMan2.png'],
  ['./images/PacMan3.png', './images/PacMan4.png'],
];
let direction = 0;
const pacMen = []; // This array holds all the pacmen

// This function returns an object with random values
function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}

// Factory to make a PacMan at a random position with random velocity
function makePac() {
  // returns an object with random values scaled {x: 33, y: 21}
  let velocity = setToRandom(40); // {x:?, y:?}
  let position = setToRandom(200);

  // Add image to div id = game
  let game = document.getElementById('game');
  let newimg = document.createElement('img');
  newimg.style.position = 'absolute';
  newimg.src = './images/PacMan1.png';
  newimg.width = 100;

  // TODO: set position here
  newimg.style.top = `${100}px`;
  newimg.style.left = `${100}px`;

  // TODO add new Child image to game
  game.appendChild(newimg);

  // return details in an object
  return {
    position,
    velocity,
    newimg,
    direction
  };
}

function update() {
  // loop over pacmen array and move each one and move image in DOM
  pacMen.forEach(item => {
    checkCollisions(item);

    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    item.newimg.style.left = `${item.position.x}px`;
    item.newimg.style.top = `${item.position.y}px`;
  });
  setTimeout(update, 75);
}

function checkCollisions(item) {
  const innerWidth = window.innerWidth;
  const innerHeight = window.innerHeight;

  if (item.velocity.x > 0) {
    if (item.position.x + item.velocity.x + 200 > innerWidth) {
      item.velocity.x = item.velocity.x * -1;
    }
    if (item.newimg.src.includes('PacMan1.png')) {
      item.newimg.src = './images/PacMan2.png';
    } else {
      item.newimg.src = './images/PacMan1.png';
    }
  } else {
    if (item.position.x - (item.velocity.x + 100) <= 0) {
      item.velocity.x = item.velocity.x * -1;
    }
    if (item.newimg.src.includes('PacMan3.png')) {
      item.newimg.src = './images/PacMan4.png';
    } else {
      item.newimg.src = './images/PacMan3.png';
    }
  }
  if (item.velocity.y > 0) {
    if (item.position.y + item.velocity.y + 200 > innerHeight) {
      item.velocity.y = item.velocity.y * -1;
    }
  } else {
    if (item.position.y - (item.velocity.y + 100) <= 0) {
      item.velocity.y = item.velocity.y * -1;
    }
  }
}

function makeOne() {
  pacMen.push(makePac()); // add a new PacMan
}

//don't change this line
if (typeof module !== 'undefined') {
  module.exports = { checkCollisions, update, makeOne, pacMen };
}
