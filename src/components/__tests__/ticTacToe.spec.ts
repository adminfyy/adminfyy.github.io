import { describe, expect, it } from 'vitest'

import { checkWinner, chooseComputerMove, isDraw } from '@/utils/ticTacToe'

describe('tic tac toe rules', () => {
  it('detects row winner', () => {
    const board = ['X', 'X', 'X', null, null, null, null, null, null]
    expect(checkWinner(board)).toBe('X')
  })

  it('detects diagonal winner', () => {
    const board = ['O', null, null, null, 'O', null, null, null, 'O']
    expect(checkWinner(board)).toBe('O')
  })

  it('detects draw with no winner', () => {
    const board = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X']
    expect(checkWinner(board)).toBe(null)
    expect(isDraw(board)).toBe(true)
  })

  it('computer chooses winning move first', () => {
    const board = ['O', 'O', null, 'X', 'X', null, null, null, null]
    expect(chooseComputerMove(board, 'O', 'X')).toBe(2)
  })

  it('computer blocks opponent winning move', () => {
    const board = ['X', 'X', null, 'O', null, null, null, null, null]
    expect(chooseComputerMove(board, 'O', 'X')).toBe(2)
  })
})
