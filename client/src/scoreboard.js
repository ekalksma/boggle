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
        <div className="word" key={wordWithScore.word} >{wordWithScore.word} {wordWithScore.score}</div>
      ))}
    </div>
    );
  }

}
