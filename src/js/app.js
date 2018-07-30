'use strict'

import putHTMLBoard from './putHTMLBoard'
import game from './game'

  // runs application
  ;(() => {
  const jsBoard = makeJSBoard()
  putHTMLBoard(jsBoard, game)
})()

/**
 * @returns {Object} object with arrays
 * to keep track of three-in-rows
 */
function makeJSBoard () {
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
