import React from 'react'
import Board from "../components/board";

export default function Home() {
  return (
    <main className='min-h-screen flex flex-col items-center justify-center bg-white text-black'>
      <h1 className='text-3xl font-bold mb-6'>Sudoku Game</h1>
      <Board />
    </main>
  )
}

