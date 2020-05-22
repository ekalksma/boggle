import React from 'react';
import Board from './board';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      isLoaded: false,
      board: Array(9).fill(null),
      error: null
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
            board: result.board
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

  render() {
    if (!this.state.isLoaded) return <div>Is loading</div>;

    return (
      <div className="game">
        <div className="game-board">
          <Board
          id = {this.state.id}
          letters = {this.state.board} />
        </div>
        <div className="game-info">
          <div></div>
          <ol></ol>
        </div>
      </div>
    );
  }
}
