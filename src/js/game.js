'use strict'

import lib from './lib'
import aiAction from './aiPlayer'

/**
 * Triggers game logic when unfilled box gets clicked
 * @param {event} event
 * @param {Object} jsBoard - board object
 */
const playerAction = (event, jsBoard) => {
  if (event.target.className !==
          'filled-board-box') {
    // Player 1 / Player 2
    const player = lib._('playerTurn')

    const boxId = event.target.id
    const box = lib._(boxId)

    // boxMark marks html box and returns mark
    const playerMark = boxMark(player, box)

    // to remove eventListener
    box.outerHTML = box.outerHTML

    updateBoardValue(boxId, jsBoard, playerMark)
    const gameOver = isGameOver(jsBoard)

    if (gameOver) {
      theWinnerTakesItAll(player)
    } else {
      changeTurn(player)

      if (box.innerHTML === 'X') {
        aiAction(jsBoard)
      }
    }
  }
}

export default playerAction

/**
 * Registers clicked box by player in js board object
 * @param {String} boxId - id of HTML-element
 * @param {Object} jsBoard - board object
 * @param {string} playerMark - X/O
 */
function updateBoardValue (boxId, jsBoard, playerMark) {
  const rowNrIndex = parseInt(boxId.indexOf('row:') + 4)
  const colNrIndex = parseInt(boxId.indexOf('col:') + 4)

  const rowNr = parseInt(boxId.charAt(rowNrIndex))
  const colNr = parseInt(boxId.charAt(colNrIndex))

  jsBoard[`row:${rowNr}`][colNr] = playerMark
  jsBoard[`col:${colNr}`][rowNr] = playerMark

  if (colNr === rowNr) {
    jsBoard.topLeftD[colNr] = playerMark
  }

  if ((colNr === 0 && rowNr === 2) ||
      (colNr === 1 && rowNr === 1) ||
      (colNr === 2 && rowNr === 0)) {
    jsBoard.topRightD[colNr] = playerMark
  }
}

/**
 * Updates HTML with mark in clicked box
 * @param {HTMLElement} player - current player
 * @param {String} boxId - id of HTML-element
 */
function boxMark (player, box) {
  const mark = player.innerHTML === 'Player 1'
    ? 'X'
    : 'O'

  box.innerHTML = mark

  box.classList.add('filled-board-box')

  return mark
}

/**
 * Updates HTML, switches player
 * @param {HTMLElement} player - current player
 */
function changeTurn (player) {
  const newPlayer = player.innerHTML === 'Player 1'
    ? 'AI'
    : 'Player 1'

  player.innerHTML = newPlayer
}

/**
   * Runs through board object to see if there is a winner
   * @param {Object} jsBoard - board object
   * @returns {Boolean} true if there is a winner
   */
function isGameOver (jsBoard) {
  const boardKeys = Object.keys(jsBoard)
  let isOver = false

  boardKeys.forEach(key => {
    for (let i = 0; i < 3; i++) {
      if (jsBoard[key][0] && // to make sure it's not undefined
                  jsBoard[key][0] === jsBoard[key][1] &&
                  jsBoard[key][1] === jsBoard[key][2]) {
        isOver = true
        break
      }
    }
  })

  return isOver
}

/**
 * Updates HTML, stops clickability and displays who the winner is
 * @param {HTMLElement} player - current player
 */
function theWinnerTakesItAll (player) {
  const boardBoxes = document
    .getElementsByClassName('board-box')

  // to remove event listener from each box
  for (let i = 0; i < boardBoxes.length; i++) {
    boardBoxes[i].outerHTML =
              boardBoxes[i].outerHTML
  }

  player.innerHTML = `${player.innerHTML} wins!`
}
