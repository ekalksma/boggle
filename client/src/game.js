import React from 'react';
import ScoreBoard from './scoreboard';
import Board from './board';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      wordsWithScore: [],
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

          if (!this.isWordDuplicate(word)) {
            fetch(`http://localhost:3000/getwordscore?word=${word}`)
            .then(res => res.json())
            .then(
              (result) => {
                const score = result.score;

                const wordsWithScore = this.state.wordsWithScore.slice();
                wordsWithScore.push({word, score});
                this.setState({wordsWithScore});
              },
              (error) => { this.setState({error}); }
            );
          }
        },
        (error) => { this.setState({error} ); }
      );
  }

  isWordDuplicate(word) {
    return this.state.wordsWithScore.some(obj => obj.word === word);
  }

  render() {
    if (!this.state.isLoaded) return <div>Is loading</div>;

    return (
      <div className="game">
        <div className="game-scoreboard">
        <ScoreBoard wordsWithScore = {this.state.wordsWithScore} />
        </div>
        <div className="game-board">
          <Board
          letters = {this.state.board}
          onSelectWord = {this.handleSelection.bind(this)} />
        </div>
      </div>
    );
  }
}
