let o_class = "o";
let x_class = "x";
let x_Src = "./img/Group.png";
let o_Src = "./img/Group (1).png";
const cellElement = document.querySelectorAll("[data-cell]");

const winText=document.getElementById("win-text")

const winMsge=document.getElementById("win-msge")

const  restartBtn=document.getElementById("restart")

restartBtn.addEventListener("click" , function(){
  location.reload();
})

let WIN= [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

let circleturn;

let circleturnSrc;

cellElement.forEach((cell) => {
  cell.addEventListener("click", handleClick, { once: true });
});

function handleClick(e) {
  let cell = e.target.firstElementChild;
  let currentClass = circleturn ? o_class : x_class;
  let currentSrc = circleturnSrc ? o_Src : x_Src;
  placeMarke(cell, currentClass ,currentSrc);
  // swapTurns()
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
  }
}

function isDraw() {
  return [...cellElement].every(cell => {
    return cell.firstElementChild.classList.contains(x_class) || cell.firstElementChild.classList.contains(o_class)
  })
}



function placeMarke(cell, currentClass ,currentSrc) {
  cell.src = currentSrc;
  cell.classList.add(currentClass)
}


function swapTurns(){
  circleturnSrc=!circleturnSrc
  circleturn=!circleturn
}



function endGame(draw) {
  if (draw) {
    winText.innerText = 'Draw!'
  } else {
    winText.innerText = `${circleturn ? "O" : "X"} Wins!`
  }
  winMsge.classList.add('show')
}


function checkWin(currentClass) {
  return WIN.some(combination => {
    return combination.every(index => {
      return cellElement[index].firstElementChild.classList.contains(currentClass)
    })
  })
}