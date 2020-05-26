import React from 'react';

export default class ScoreBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scores: {}
    }
  }

  render() {
    return (
      <div>
      {this.props.wordsWithScore.map(wordWithScore => (
        <div key = {wordsWithScore.word}>
          <span className="word">{wordWithScore.word}</span>
          <span className="score">{wordWithScore.score}</span>
        </div>
      ))}
      </div>
    );
  }

}
