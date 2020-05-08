import React from 'react';
import Square from './square';

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      squares: Array(9).fill(null),
    }
  }

  componentDidMount() {
    fetch("http://localhost:3000/getrandomboard")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            squares: result.board
          });
          console.log(this.state.squares);
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  renderSquare(i) {
    return (<Square value = { i } /> );
    }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(this.state.squares[0])}
          {this.renderSquare(this.state.squares[1])}
          {this.renderSquare(this.state.squares[2])}
        </div>
        <div className="board-row">
          {this.renderSquare(this.state.squares[3])}
          {this.renderSquare(this.state.squares[4])}
          {this.renderSquare(this.state.squares[5])}
        </div>
        <div className="board-row">
          {this.renderSquare(this.state.squares[6])}
          {this.renderSquare(this.state.squares[7])}
          {this.renderSquare(this.state.squares[8])}
        </div>
      </div>
    );
  }
}
