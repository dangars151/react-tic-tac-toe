import { useState } from 'react';

function Square({ value, onSquareClick, isWin }) {
  if (isWin) {
    return (
      <button style={{ color: "red" }} className="square" onClick={onSquareClick}>
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

function Board({ xIsNext, squares, onPlay }) {
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
    onPlay(nextSquares);
  }

  const { winner, a, b, c } = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        {(a === 0 || b === 0 || c === 0) ? (
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} isWin={true} />
        ) : (
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        )}
        {(a === 1 || b === 1 || c === 1) ? (
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} isWin={true} />
        ) : (
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        )}
        {(a === 2 || b === 2 || c === 2) ? (
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} isWin={true} />
        ) : (
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        )}
      </div>
      <div className="board-row">
        {(a === 3 || b === 3 || c === 3) ? (
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} isWin={true} />
        ) : (
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        )}
        {(a === 4 || b === 4 || c === 4) ? (
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} isWin={true} />
        ) : (
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        )}
        {(a === 5 || b === 5 || c === 5) ? (
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} isWin={true} />
        ) : (
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        )}
      </div>
      <div className="board-row">
        {(a === 6 || b === 6 || c === 6) ? (
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} isWin={true} />
        ) : (
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        )}
        {(a === 7 || b === 7 || c === 7) ? (
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} isWin={true} />
        ) : (
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        )}
        {(a === 8 || b === 8 || c === 8) ? (
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} isWin={true} />
        ) : (
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        )}
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;

    if (move > 0 && move == currentMove) {
      return (
        <li key={move}>
          <b onClick={() => jumpTo(move)}>{"You are at move #" + move}</b>
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
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
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
