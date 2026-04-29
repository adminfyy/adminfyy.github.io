export type Player = 'X' | 'O'
export type Cell = Player | null
export type Board = Cell[]

const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

export function checkWinner(board: Board): Player | null {
  for (const [a, b, c] of WIN_LINES) {
    const first = board[a]
    if (first && first === board[b] && first === board[c]) return first
  }
  return null
}

export function isDraw(board: Board): boolean {
  return !checkWinner(board) && board.every((cell) => cell !== null)
}

const emptyIndexes = (board: Board) =>
  board.map((value, index) => (value === null ? index : -1)).filter((index) => index >= 0)

function findWinningMove(board: Board, player: Player): number | null {
  for (const index of emptyIndexes(board)) {
    const snapshot = [...board]
    snapshot[index] = player
    if (checkWinner(snapshot) === player) return index
  }
  return null
}

export function chooseComputerMove(board: Board, ai: Player, human: Player): number | null {
  const winMove = findWinningMove(board, ai)
  if (winMove !== null) return winMove

  const blockMove = findWinningMove(board, human)
  if (blockMove !== null) return blockMove

  if (board[4] === null) return 4

  const corners = [0, 2, 6, 8].filter((index) => board[index] === null)
  if (corners.length) return corners[0]

  const empties = emptyIndexes(board)
  return empties.length ? empties[0] : null
}
