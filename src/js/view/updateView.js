'use strict'

import lib from '../lib/lib'

/**
 * Object with functions to update view
 */
const updateView = {
  /**
     * Updates HTML with mark in clicked box
     * @param {HTMLElement} player - current player
     * @param {String} boxId - id of HTML-element
     */
  markBox: (player, boxId) => {
    const box = lib._(boxId)
    const mark = player.innerHTML === 'Player 1'
      ? 'X'
      : 'O'

    box.innerHTML = mark

    box.classList.add('filled-board-box')

    return mark
  },

  /**
     * Updates HTML, switches player
     * @param {HTMLElement} player - current player
     */
  changeTurn (player) {
    const newPlayer = player.innerHTML === 'Player 1'
      ? 'Player 2'
      : 'Player 1'

    player.innerHTML = newPlayer
  },

  /**
   * Updates HTML, stops clickability and displays who the winner is
   * @param {HTMLElement} player - current player
   */
  theWinnerTakesItAll: (player) => {
    const boardBoxes = document
      .getElementsByClassName('board-box')

    // to remove event listener from each box
    for (let i = 0; i < boardBoxes.length; i++) {
      boardBoxes[i].outerHTML =
                boardBoxes[i].outerHTML
    }

    player.innerHTML = `${player.innerHTML} wins!`
  }
}

export default updateView
