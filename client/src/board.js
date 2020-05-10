import React from 'react';
import Square from './square';

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSquareIndices: [],
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
    return (<Square
      isSelected={ this.isSquareSelected(i) }
      value={ this.state.squares[i] }
      onMouseEnter={ () => this.handleOnMouseEnter(i) }
    />);
  }

  handleOnMouseEnter(i) {
    if (this.isSquareSelected(i)) {
      return;
    }

    const selectedSquareIndices = this.state.selectedSquareIndices.slice();
    selectedSquareIndices.push(i);
    this.setState({selectedSquareIndices});
  }

  isSquareSelected(i) {
    return this.state.selectedSquareIndices.includes(i);
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
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
