import React from 'react';
import Square from './square';

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      selectedSquareIndices: [],
      words: [],
      isMouseDown: false,
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
            id: result.id,
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
      onMouseDown={ () => this.handleOnMouseDown(i) }
      onMouseUp={ () => this.handleOnMouseUp() }
    />);
  }

  handleOnMouseEnter(i) {
    if (this.isSquareSelected(i) || !this.state.isMouseDown) {
      return;
    }

    const selectedSquareIndices = this.state.selectedSquareIndices.slice();
    selectedSquareIndices.push(i);
    this.setState({selectedSquareIndices});
  }

  handleOnMouseDown(i) {
    if (this.isSquareSelected(i)) {
      return;
    }

    this.setState({isMouseDown: true});

    const selectedSquareIndices = this.state.selectedSquareIndices.slice();
    selectedSquareIndices.push(i);
    this.setState({selectedSquareIndices});
  }

  handleOnMouseUp() {
    if (!this.state.isMouseDown) {
      return;
    }
    console.log(this.state.id);


    const id = this.state.id;
    let selectedSquareIndices = this.state.selectedSquareIndices.slice();

    fetch(`//localhost:3000/iswordvalid?id=${id}&selection=${selectedSquareIndices}`)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result.validWord);
          if(!result.validWord) return;

          const word = result.word;
          console.log(word);

          if (!this.state.words.includes(this.word)) {
            const words = this.state.words.slice();
            words.push(word);
            this.setState({words});
          }

          fetch(`http://localhost:3000/getwordscore?word=${word}`)
            .then(res => res.json())
            .then(
              (result) => {
                console.log(result.score);
              },
              (error) => { this.setState({error}); }
            );
        },
        (error) => { this.setState({error}); }
      );

    selectedSquareIndices = [];
    this.setState({selectedSquareIndices, isMouseDown: false});
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
          {this.renderSquare(3)}
        </div>
        <div className="board-row">
          {this.renderSquare(4)}
          {this.renderSquare(5)}
          {this.renderSquare(6)}
          {this.renderSquare(7)}
        </div>
        <div className="board-row">
          {this.renderSquare(8)}
          {this.renderSquare(9)}
          {this.renderSquare(10)}
          {this.renderSquare(11)}
        </div>
        <div className="board-row">
          {this.renderSquare(12)}
          {this.renderSquare(13)}
          {this.renderSquare(14)}
          {this.renderSquare(15)}
        </div>
      </div>
    );
  }
}
