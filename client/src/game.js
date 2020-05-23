import React from 'react';
import Board from './board';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      words: [],
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

  handleSelection(selection) {
    const id = this.state.id;

    fetch(`//localhost:3000/iswordvalid?id=${id}&selection=${selection}`)
      .then(res => res.json())
      .then(
        (result) => {
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
  }


  render() {
    if (!this.state.isLoaded) return <div>Is loading</div>;

    return (
      <div className="game">
        <div className="game-board">
          <Board
          letters = {this.state.board}
          onSelectWord = {this.handleSelection.bind(this)} />
        </div>
        <div className="game-info">
          <div></div>
          <ol></ol>
        </div>
      </div>
    );
  }
}
