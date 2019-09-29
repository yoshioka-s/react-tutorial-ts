import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

type cell = 'X' | 'O' | ''
interface SquareProps {
  value: cell
  onClick: () => void
}

const Square: React.FC<SquareProps> = props => (
  <button className="square" onClick={props.onClick}>
    {props.value}
  </button>
)

interface BoardState {
  squares: cell[]
  xIsNext: boolean
}

class Board extends React.Component<{}, BoardState> {
  constructor(props: any) {
    super(props)
    this.state = {
      squares: Array(9).fill(''),
      xIsNext: true
    }
  }

  public render() {
    let status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`
    const winner = calculateWinner(this.state.squares)
    if (winner) {
      status = `Winner ${winner}`
    }

    const numCols = 3
    const numRows = this.state.squares.length / numCols
    const rows = Array(numRows)
      .fill(null)
      .map((n, i) => {
        const cells = Array(numCols)
          .fill(null)
          .map((m, j) => this.renderSquare(i * 3 + j))
        return <div className="board-row">{cells}</div>
      })
    return (
      <div>
        <div className="status">{status}</div>
        {rows}
      </div>
    )
  }

  private handleClick(i: number) {
    const squares = this.state.squares.slice()
    if (calculateWinner(squares)) {
      return
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O'
    const xIsNext = !this.state.xIsNext
    this.setState({ squares, xIsNext })
  }

  private renderSquare(i: number) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    )
  }
}

type player = 'X' | 'O' | null
function calculateWinner(squares: cell[]): player {
  const rows = convertSquaresToRows(squares)
  if (hasHorizontal('X', rows)) {
    return 'X'
  }
  if (hasHorizontal('O', rows)) {
    return 'O'
  }
  if (hasVertical('X', rows)) {
    return 'X'
  }
  if (hasVertical('O', rows)) {
    return 'O'
  }
  if (hasDiagonal('X', rows)) {
    return 'X'
  }
  if (hasDiagonal('O', rows)) {
    return 'O'
  }
  return null
}

function hasHorizontal(p: player, rows: cell[][]): boolean {
  return rows.some(row => {
    return row.every(c => c === p)
  })
}

function hasVertical(p: player, rows: cell[][]): boolean {
  return Array.from(Array(3).keys()).some(colIndex => {
    return rows.every(row => {
      return row[colIndex] === p
    })
  })
}

function hasDiagonal(p: player, rows: cell[][]): boolean {
  return (
    Array.from(Array(3).keys()).every(i => {
      return rows[i][i] === p
    }) ||
    Array.from(Array(3).keys()).every(i => {
      return rows[i][3 - 1 - i] === p
    })
  )
}

function convertSquaresToRows(squares: cell[]): cell[][] {
  return Array(3)
    .fill(null)
    .map((n, i) => {
      return squares.slice(i * 3, (i + 1) * 3)
    })
}
class Game extends React.Component {
  public render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    )
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'))
