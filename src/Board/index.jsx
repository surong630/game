import React from 'react';
import ReactDOM from 'react-dom';

import Square from '../Square'

export default class Board extends React.Component {
  // 双循环建立出表格
  show() {
    let squares = [];
    for(let i=0;i<3;i++) {
      let rows=[]
      for(let j=0;j<3;j++) {
        let k = i*3 +j;
        rows.push( <Square key={j}
          value={this.props.squares[k]}
          onClick={() => {this.props.onClick(k)}}
        />)}
        squares.push(
            <div key={i} className='board-row'>
              {rows}
            </div>
        )
      }
      // 渲染界面
      return (
        <div>
          {squares.map((item) =>{
            return item
          })}
        </div>
      )
    }
  render() {
    console.log(this.props);
    const {winner, xIsNext} = this.props
    let status
    // 判断是胜利还是下一步
    if(winner) {
      status = 'Winner' + winner
    }else {
      status = `Next player:${xIsNext? 'X': 'O'} `;
    }
    return (
      <div>
        {this.show()}
      </div>
    );
  }
}