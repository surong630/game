import React from 'react';
import ReactDOM from 'react-dom';

import Board from './Board'

import './index.css';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      // 下一个是X 还是 O 
      xIsNext:true,
      // 是否胜利
      winner: undefined,
      // 步数
      stepNumber: 0
    }
  }
  isWinner = (squares) => {
    // 创建胜利条件
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
    // 循环找出是否胜利
    for(let i=0;i<lines.length;i++) {
      const [a,b,c] = lines[i];
      if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        alert(`${this.state.xIsNext? 'X': 'O'}赢了`)
      }
    }
    if(this.state.history.length === 9) {
      alert('平局了')
      return
    }
    console.log(this.state.history.length);
    return null
  }
  // 点击棋盘改变历史纪录 , 棋子是X还是O
  handleClick = (i) => {
    if(this.state.winner) {
      return 
    }
    let step
    if(i<=3) {
      step = `'第一行:', ${i+1}列`
    }else if(i>3 && i<=6) {
      step = `'第二行:', ${i+1}列`
    }else if(i>6) {
      step = `'第三行:', ${i+1}列`
    }
    const history = this.state.history
    const current = history[history.length - 1]
    const squares = current.squares.slice()
    squares[i] = this.state.xIsNext? 'X': 'O'
    const winner = this.isWinner(squares)
    // 重新渲染
    this.setState({history: history.concat([{squares: squares, step}]), xIsNext: !this.state.xIsNext, winner})
  }
  // 显示历史记录
  steps() {
    const Moves = this.state.history.map((step, move) => {
      const desc = move? 
        'Go to move #' + step.step:
        'Go to start'
      return (
        <li className={move === this.state.history.length-1? 'active': null} key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      )
    })
    return Moves
  }
  // 点击哪一项就返回到哪一步
  jumpTo(step) {
    const history = this.state.history.slice(0, step + 1)
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
      history
    })
  }
  render() {
    const { history, winner,xIsNext } = this.state
    return (
      <div className="game">
        <div className="game-board">
          <Board squares={history[history.length - 1].squares} onClick={this.handleClick} winner={winner} xIsNext={xIsNext}/>
        </div>
        <div className="game-info">
          <ol>{this.steps()}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
