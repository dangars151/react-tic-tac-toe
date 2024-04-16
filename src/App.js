import { useState } from 'react';

function Square({ value, onSquareClick, isWin, currentOrder, order }) {
  if (isWin) {
    if (currentOrder === order) {
      return (
        <button style={{ color: "red", backgroundColor: "#e3eba2" }} className="square" onClick={onSquareClick}>
          {value}
        </button>
      );
    }

    return (
      <button style={{ color: "red" }} className="square" onClick={onSquareClick}>
        {value}
      </button>
    );
  }

  if (currentOrder === order) {
    return (
      <button style={{ backgroundColor: "#e3eba2" }} className="square" onClick={onSquareClick}>
        {value}
      </button>
    );
  }

  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay, currentMove, currentOrder }) {
  function handleClick(i) {
    const { winner } = calculateWinner(squares);
    if (winner || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares, i);
  }

  const { winner, a, b, c } = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    if (currentMove == TOTAL_SQUARES) {
      status = 'Result: Draw'
    } else {
      status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }
  }

  return (
    <>
      <div className="status">{status}</div>

      {[[0, 1, 2], [3, 4, 5], [6, 7, 8]].map((row, key) => {
        return <div key={key} className="board-row">
          {row.map((i, key) => {
            return (a === i || b === i || c === i) ? (
              <Square key={key} value={squares[i]} onSquareClick={() => handleClick(i)} isWin={true} currentOrder={currentOrder} order={i} />
            ) : (
              <Square key={key} value={squares[i]} onSquareClick={() => handleClick(i)} currentOrder={currentOrder} order={i} />
            )
          })}
        </div>
      })}

    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const [orders, setOrders] = useState([]);

  function handlePlay(nextSquares, i) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);

    const newOrders = [...orders.slice(0, currentMove + 1), Number(i)];
    setOrders(newOrders);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);

    const newOrders = orders.slice(0, nextMove)
    setOrders(newOrders)
  }

  const moves = history.map((squares, move) => {
    let description;

    if (move > 0 && move == currentMove) {
      return (
        <li key={move}>
          <b onClick={() => jumpTo(move)}>{history[currentMove][orders[currentMove - 1]] + " is at move #" + move + " (row: " + MAPPING_COORDINATES[orders[currentMove - 1]][0] + ", " + "col: " + MAPPING_COORDINATES[orders[currentMove - 1]][1] + ")"}</b>
        </li>
      );
    }

    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} currentOrder={orders[currentMove - 1]} squares={currentSquares} onPlay={handlePlay} currentMove={currentMove} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        a: a,
        b: b,
        c: c,
      };
    }
  }
  return {
    winner: null,
  };
}

const TOTAL_SQUARES = 9

const MAPPING_COORDINATES = [
  [1, 1],
  [1, 2],
  [1, 3],
  [2, 1],
  [2, 2],
  [2, 3],
  [3, 1],
  [3, 2],
  [3, 3],
]