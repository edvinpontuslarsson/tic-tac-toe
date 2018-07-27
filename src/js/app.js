'use strict'

import buildBoard from './view/buildBoard'
import game from './game/game'

/**
 * @param {String} id - element id
 */
const _ = id => document.getElementById(id)

;(() => {
  buildBoard(_, game)
})()
