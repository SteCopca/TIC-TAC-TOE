/* CONSTANTES */
const STATUS_DISPLAY = document.querySelector('.game-notification'),
GAME_STATE = ['','','','','','','','',''],
/* VECES QUE EL JUGADOR GANA */
WINNINGS= [
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]
],
/* MENSAJES */
WIN_MESSAGE= () =>`¡El jugador ${currentPlayer} ha ganado!`,
DRAW_MESSAGE = () => `El juego se empató :( `,
CURRENT_PLAYER_TURN = () => `Turno del jugador ${currentPlayer}`
/* VARIABLES */
let gameActive = true,
currentPlayer = 'O'

/* FUNCIONES */
function main(){
handleStatusDisplay(CURRENT_PLAYER_TURN())
listeners()
}
main()
function handleStatusDisplay(message){
STATUS_DISPLAY.innerHTML= message
}
function listeners(){
document.querySelector('.game-container').addEventListener('click',handleCellClick)
document.querySelector('.game-restart').addEventListener('click',handleRestartGame)
}
function handleCellClick(clickedEvent){
const clickedCell = clickedEvent.target
if(clickedCell.classList.contains('game-cell')){
const clickedCellIndex = Array.from(clickedCell.parentNode.children).indexOf(clickedCell)
console.log(clickedCellIndex)
if(GAME_STATE[clickedCellIndex] !== '' || !gameActive){
	return
}
handleCellPlayed(clickedCell, clickedCellIndex)
handleResultValidation()
}
console.log(clickedCell)
}
function handleRestartGame(){
  gameActive = true 
  currentPlayer = 'O',
  restartGameState()
  handleStatusDisplay(CURRENT_PLAYER_TURN())
  document.querySelectorAll('.game-cell').forEach(cell => cell.innerText ='')
}
function restartGameState(){
  let i = GAME_STATE.length
  while(i--){
    GAME_STATE[i] = ''
  }
}
function handleCellPlayed(clickedCell, clickedCellIndex){
	GAME_STATE[clickedCellIndex] = currentPlayer 
	clickedCell.innerText = currentPlayer
}
function handleResultValidation(){
let roundWon = false
for(let i = 0; i < WINNINGS.length; i++){
const winCondition = WINNINGS[i]
let position1 = GAME_STATE[winCondition[0]],
 position2 = GAME_STATE[winCondition[1]],
 position3 = GAME_STATE[winCondition[2]]
 if(position1 === '' || position2 === '' || position3 === ''){
continue;
 }
 if(position1 === position2 && position2 === position3){
  roundWon = true
  break;
 }
}
if (roundWon) {
handleStatusDisplay(WIN_MESSAGE())
gameActive = false
return
}
let roundDraw = !GAME_STATE.includes('')

if (roundDraw) {
  handleStatusDisplay(DRAW_MESSAGE())
  gameActive = false
  return
}
handlePlayerChange()
}
function handlePlayerChange(){
  currentPlayer = (currentPlayer === 'X') ? 'O' : 'X'
  handleStatusDisplay(CURRENT_PLAYER_TURN())
}
/* NUEVA FUNCIÓN *//*
function switchSheet() {
  let theme = document.getElementById("theme");

  if (theme.getAttribute("href") == "index.css") {
    theme.href = "index2.css";
  } else {
    theme.href = "index.css";
  }
}  */