'use strict'

import lib from '../lib/lib'
import updateView from '../view/updateView'

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

    const playerMark = updateView.markBox(player, boxId)
    updateBoardValue(boxId, jsBoard, playerMark)
    const gameOver = isGameOver(jsBoard)

    if (gameOver) {
      updateView.theWinnerTakesItAll(player)
    } else {
      updateView.changeTurn(player)
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
