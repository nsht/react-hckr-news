import React from "react";

class Story extends React.Component {
  componentDidUpdate() {
    console.log("updated!!!");
  }

  render() {
    return <li>{this.props.index}</li>;
  }
}

export default Story;
