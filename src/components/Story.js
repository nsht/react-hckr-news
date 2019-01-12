import React from "react";

class Story extends React.Component {
  render() {
    let score;
    if (this.props.post.score > 100) {
      score = (
        <span className="score score-highlight">{this.props.post.score}</span>
      );
    } else {
      score = (
        <span className="score score-normal">{this.props.post.score}</span>
      );
    }
    return (
      <li>
        <a href={this.props.post.url} target="_blank" rel="noopener noreferrer">
          <span>{this.props.post.title}</span>
        </a>
        <span className="hacker-news-link">
          <a
            href={this.props.post.hckr_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Hacker News URL
          </a>
        </span>
        <div>
          {score} Points by {this.props.post.by}
        </div>
        <br />
        <br />
      </li>
    );
  }
}

export default Story;
