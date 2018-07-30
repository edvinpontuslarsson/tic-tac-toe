'use strict'

import lib from './lib'

/**
 * Appends playing board to HTML,
 * with event listeners on boxes that trigger playerAction()
 * @param {Object} jsBoard - board object
 */
const putHtmlBoard = (jsBoard, game) => {
  lib._('playerTurn').innerHTML = 'Player 1'

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const box = document.createElement('div')
      box.classList.add('board-box')
      box.setAttribute('id', `row:${i}-col:${j}`)

      box.style.gridRowStart = i + 1
      box.style.gridColumnStart = j + 1

      box.addEventListener('click', event => {
        game(event, jsBoard)
      })

      const boardSection = lib._('board')
      boardSection.appendChild(box)
    }
  }
}

export default putHtmlBoard
