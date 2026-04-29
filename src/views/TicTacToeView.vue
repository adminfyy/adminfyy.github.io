<script setup lang="ts">
import { computed, ref } from 'vue'

import { checkWinner, chooseComputerMove, isDraw } from '@/utils/ticTacToe'
import type { Board, Player } from '@/utils/ticTacToe'

type Mode = 'pvp' | 'pve'

const mode = ref<Mode>('pvp')
const board = ref<Board>(Array(9).fill(null))
const currentPlayer = ref<Player>('X')

const winner = computed(() => checkWinner(board.value))
const draw = computed(() => isDraw(board.value))

const statusText = computed(() => {
  if (winner.value) return `胜者：${winner.value}`
  if (draw.value) return '平局'
  if (mode.value === 'pve') return currentPlayer.value === 'X' ? '你的回合（X）' : '电脑思考中...'
  return `当前回合：${currentPlayer.value}`
})

const resetGame = () => {
  board.value = Array(9).fill(null)
  currentPlayer.value = 'X'
}

const switchMode = (nextMode: Mode) => {
  mode.value = nextMode
  resetGame()
}

const placeMove = (index: number, player: Player) => {
  board.value.splice(index, 1, player)
}

const togglePlayer = () => {
  currentPlayer.value = currentPlayer.value === 'X' ? 'O' : 'X'
}

const makeComputerMove = () => {
  const move = chooseComputerMove(board.value, 'O', 'X')
  if (move === null) return
  placeMove(move, 'O')
}

const handleCellClick = (index: number) => {
  if (board.value[index] || winner.value || draw.value) return

  if (mode.value === 'pvp') {
    placeMove(index, currentPlayer.value)
    if (!checkWinner(board.value) && !isDraw(board.value)) togglePlayer()
    return
  }

  if (currentPlayer.value !== 'X') return
  placeMove(index, 'X')

  if (checkWinner(board.value) || isDraw(board.value)) return

  currentPlayer.value = 'O'
  makeComputerMove()

  if (!checkWinner(board.value) && !isDraw(board.value)) {
    currentPlayer.value = 'X'
  }
}
</script>

<template>
  <main class="game-page">
    <section class="hero">
      <p class="eyebrow">Game</p>
      <h1>井字棋（九宫格）</h1>
      <p>支持本地双人和人机对战（先赢、再防、再占位）。</p>
    </section>

    <section class="panel">
      <div class="mode-switch">
        <button :class="{ active: mode === 'pvp' }" @click="switchMode('pvp')">本地双人</button>
        <button :class="{ active: mode === 'pve' }" @click="switchMode('pve')">人机对战</button>
      </div>
      <p class="status">{{ statusText }}</p>

      <div class="board">
        <button
          v-for="(cell, index) in board"
          :key="index"
          class="cell"
          @click="handleCellClick(index)"
        >
          {{ cell || '' }}
        </button>
      </div>

      <button class="reset" @click="resetGame">重新开始</button>
    </section>
  </main>
</template>

<style scoped>
.game-page {
  display: grid;
  gap: 1rem;
}

.hero {
  border: 1px solid rgba(168, 230, 255, 0.26);
  border-radius: 16px;
  padding: 1rem;
  color: #edf9ff;
  background:
    radial-gradient(circle at 84% 10%, rgba(97, 218, 251, 0.31), transparent 30%),
    linear-gradient(135deg, #081631, #123e4f);
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 12px;
  opacity: 0.82;
}

h1 {
  margin: 0.3rem 0;
  font-family: var(--font-display);
}

.panel {
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 1rem;
  background: var(--surface-glass);
}

.mode-switch {
  display: flex;
  gap: 0.55rem;
}

.mode-switch button,
.reset {
  border: 1px solid var(--color-border);
  border-radius: 999px;
  background: rgba(8, 42, 70, 0.53);
  color: #e4f8ff;
  padding: 0.35rem 0.8rem;
  cursor: pointer;
}

.mode-switch button.active {
  border-color: rgba(97, 218, 251, 0.65);
  background: rgba(24, 73, 109, 0.7);
}

.status {
  margin: 0.75rem 0;
}

.board {
  width: min(360px, 100%);
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.5rem;
}

.cell {
  aspect-ratio: 1 / 1;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  background: rgba(4, 17, 34, 0.46);
  color: #f2fbff;
  font-size: clamp(1.6rem, 5vw, 2rem);
  cursor: pointer;
}

.reset {
  margin-top: 0.8rem;
}
</style>
