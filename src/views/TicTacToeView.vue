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
.game-page { display: grid; gap: 1rem; animation: rise-in 0.5s var(--ease-out) both; }

.hero {
  border-radius: var(--radius-xl);
  padding: 1rem;
  color: #fff;
  background: linear-gradient(135deg, #312e81, #6366f1 50%, #8b5cf6);
  box-shadow: var(--shadow-lg);
  position: relative; overflow: hidden;
}
.hero::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(circle at 84% 10%, rgba(255,255,255,0.08), transparent 30%);
  pointer-events: none;
}

.eyebrow { text-transform: uppercase; letter-spacing: 0.12em; font-size: 11px; opacity: 0.7; font-weight: 600; }

h1 { margin: 0.3rem 0; font-family: var(--font-display); letter-spacing: -0.02em; }

.panel { border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 1rem; background: var(--surface-glass); }

.mode-switch { display: flex; gap: 0.5rem; }

.mode-switch button, .reset {
  border: 1px solid var(--color-border); border-radius: var(--radius-pill);
  background: var(--bg-0); color: var(--accent-600); padding: 0.35rem 0.75rem;
  cursor: pointer; font-size: 0.92rem; transition: all var(--duration-fast) ease;
}

.mode-switch button:hover, .reset:hover { background: var(--accent-bg-subtle); }

.mode-switch button.active { border-color: var(--accent-500); background: var(--accent-bg-light); font-weight: 600; }

.status { margin: 0.75rem 0; font-size: 0.95rem; }

.board { width: min(360px, 100%); display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 0.5rem; }

.cell { aspect-ratio: 1 / 1; border: 1px solid var(--color-border); border-radius: var(--radius-sm); background: var(--bg-0); color: var(--color-heading); font-size: clamp(1.5rem, 5vw, 1.8rem); cursor: pointer; transition: background var(--duration-fast) ease; }
.cell:hover { background: var(--accent-bg-subtle); }

.reset { margin-top: 0.75rem; }
</style>
