'use strict'

import lib from '../lib/lib'

const buildBoard = (game) => {
  /**
     * @returns {Object} object with arrays
     * to keep track of three-in-rows
     */
  const makeJSBoard = () => {
    const board = {
      topLeftD: [],
      topRightD: []
    }

    for (let i = 0; i < 3; i++) {
      board[`row:${i}`] = []
      board[`col:${i}`] = []
    }

    return board
  }

  /**
     * Appends playing board to HTML,
     * with event listeners on boxes that trigger playerAction()
     * @param {Object} jsBoard - board object
     */
  const putHtmlBoard = (jsBoard) => {
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

  const jsBoard = makeJSBoard()
  putHtmlBoard(jsBoard)
}

export default buildBoard
