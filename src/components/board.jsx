'use client'
import React, { useEffect, useState } from 'react'
import Cell from './cell';

export default function Board() {
    const [board, setBoard] = useState(
        Array(9).fill(undefined).map(() => Array(9).fill(''))
    );
    const [solution, setSolution] = useState(
        Array(9).fill(undefined).map(() => Array(9).fill(''))
    )
    const [errors, setErrors] = useState(
        Array(9).fill(undefined).map(() => Array(9).fill(false))
    );
    const [selectedCell, setSelectedCell] = useState({ row: null, col: null });


    function isSafe(board, row, col, num) {
        for (let x = 0; x < 9; x++) if (board[row][x] === num) return false;
        for (let x = 0; x < 9; x++) if (board[x][col] === num) return false;
        const startRow = row - (row % 3);
        const startCol = col - (col % 3);
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[startRow + i][startCol + j] === num) return false;
            }
        }
        return true;
    }

    function fillBoard(board) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === '') {
                    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5);
                    for (let num of numbers) {
                        if (isSafe(board, row, col, num)) {
                            board[row][col] = num;
                            if (fillBoard(board)) return true;
                            board[row][col] = '';
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    function removeCells(board, emptyCount = 40) {
        const newBoard = board.map(row => [...row])

        let removed = 0;
        while (removed < emptyCount) {
            const row = Math.floor(Math.random() * 9)
            const col = Math.floor(Math.random() * 9)

            if (newBoard[row][col] !== '') {
                newBoard[row][col] = ''
                removed++
            }
        }
        return newBoard
    }

    useEffect(() => {
        const solvedBoard = board.map(row => [...row])
        fillBoard(solvedBoard)

        const puzzleBoard = removeCells(solvedBoard, 40)
        setSolution(solvedBoard)
        setBoard(puzzleBoard)

        // setErrors(Array(9).fill(undefined).map(() => Array(9).fill(false)));
    }, []);

    return (
        <div className='grid grid-cols-9 p-2 rounded-xl shadow-lg'>
            {board.map((row, rowIndex) =>
                row.map((val, colIndex) => {
                    // if highlight
                    const isSameRow = rowIndex === selectedCell.row;
                    const isSameCol = colIndex === selectedCell.col;

                    const isSameBox =
                        Math.floor(rowIndex / 3) === Math.floor(selectedCell.row / 3) &&
                        Math.floor(colIndex / 3) === Math.floor(selectedCell.col / 3);

                    const isHighlighted = isSameRow || isSameCol || isSameBox;

                    return (
                        <Cell
                            key={`${rowIndex}-${colIndex}`}
                            value={val}
                            rowIndex={rowIndex}
                            colIndex={colIndex}
                            isErr={errors[rowIndex][colIndex]}
                            isHighlighted={isHighlighted}
                            isSelected={rowIndex === selectedCell.row && colIndex === selectedCell.col}
                            onSelect={() => setSelectedCell({ row: rowIndex, col: colIndex })}
                            onChange={(item) => {
                                const newBoard = [...board];
                                const newErrors = [...errors];
                                if (item === '') {
                                    // newBoard[rowIndex][colIndex] = '';
                                    newErrors[rowIndex][colIndex] = false;
                                } else if (solution[rowIndex][colIndex] === Number(item)) {
                                    // newBoard[rowIndex][colIndex] = item
                                    newErrors[rowIndex][colIndex] = false;
                                } else {
                                    // newBoard[rowIndex][colIndex] = ''
                                    newErrors[rowIndex][colIndex] = true;
                                }
                                newBoard[rowIndex][colIndex] = item

                                setBoard(newBoard);
                                setErrors(newErrors)
                            }}
                        />
                    )
                })
            )}
        </div>
    );
}


