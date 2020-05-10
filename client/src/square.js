import React from 'react';

export default class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null
    };
  }

  render() {
    return (
      <div className={`square ${this.props.isSelected ? 'selected' : ''}`}
           onMouseEnter={() => this.props.onMouseEnter()}>
        {this.props.value}
      </div>
    );
  }
}
