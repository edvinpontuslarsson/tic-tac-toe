'use strict'

/**
 * AI,
 * prio 1 if ai has 2 in arr
 * prio 2 if player has that,
 * prio 3 is adding to arr where has 1,
 * prio 4 is blocking if player has 1,
 * else just place in random,
 *
 * Has to see if free also ofc
 */

 // first just click in free

const aiAction = (jsBoard) => {
    const boardBoxes = document
        .getElementsByClassName('board-box')

    spotPlayer2InRow(jsBoard)
    clickFirstFree(boardBoxes)
}

export default aiAction

function spotPlayer2InRow (jsBoard) {
    const jsBoardKeys = Object.keys(jsBoard)

    for (let i = 0; i < jsBoardKeys.length; i++) {
        const XInArr = jsBoard[
            jsBoardKeys[i]
        ].filter(box => 
            box === 'X'
        )
        
        if (XInArr.length === 2) {
            console.log(jsBoardKeys[i])

            break
        }
    }
}

function clickFirstFree (boardBoxes) {
    for (let i = 0; i < boardBoxes.length; i++) {
        if (boardBoxes[i].innerHTML !== 'X' &&
        boardBoxes[i].innerHTML !== 'O') {
            boardBoxes[i].click()
            break
        }
    }
}
