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
      <div className="square">
        {this.props.value}
      </div>
    );
  }
}
