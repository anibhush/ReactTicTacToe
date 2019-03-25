import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//class Square extends React.Component {
/*  constructor(props){
    super(props);
    this.state = {
      value: null,
    };
  } */

  function Square(props) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }
//}

class Board extends React.Component {
/*  constructor(props){
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }*/

  renderSquare(i) {
    return (<Square value={this.props.squares[i]}
      onClick={()=> this.props.onClick(i)}/>);
  }

  render() {
  /*  const winner = calculateWinner(this.state.squares);
    let status;
    if(winner){
      status = 'Winner: ' + winner;
    }
    else{
     status = 'Next player: ' + (this.state.xIsNext ? 'X':'O');
   } */

    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      stepNumber: 0,
      xIsNext: true,
    }
  }

  handleClick(i){
    const history = this.state.history.slice(0, this.state.stepNumber + 1);;
    const current = history[history.length - 1];
    const sqares = current.squares.slice();
    if(calculateWinner(sqares) || sqares[i]){
      return;
    }
    /*if(this.state.xIsNext === true){
      sqares[i] = 'X';
      this.setState({xIsNext: false});
    }
    else{
      sqares[i] = 'O';
      this.setState({xIsNext: true});
    }
    this.setState({squares: sqares});*/
    sqares[i] = this.state.xIsNext ? 'X':'O';
    this.setState({
      history: history.concat([{squares: sqares}]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

 jumpTo(step){
    this.setState({
      stepNumber: step,
      xIsNext: (step%2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? 'Go to move#' + move : 'Go to Game Start';
      return(
        <li key={move}><button onClick={() => this.jumpTo(move)}>{desc}</button></li>
      );
    });

    let gamestatus;

    if (winner) {
      gamestatus = 'Winner: ' + winner;
    } else {
      gamestatus = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares = {current.squares}
           onClick={(i) => this.handleClick(i )}/>
        </div>
        <div className="game-info">
          <div>{gamestatus}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
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
      return squares[a];
    }
  }
  return null;
}
// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
