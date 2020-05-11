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
           onMouseEnter={() => this.props.onMouseEnter()}
           onMouseDown={() => this.props.onMouseDown()}
           onMouseUp={() => this.props.onMouseUp()}>
        {this.props.value}
      </div>
    );
  }
}
