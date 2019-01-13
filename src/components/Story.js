import React from "react";

class Story extends React.Component {
  render() {
    let score;
    let comments;
    if (this.props.post.score > 100) {
      score = (
        <span className="score score-highlight">{this.props.post.score}</span>
      );
    } else {
      score = (
        <span className="score score-normal">{this.props.post.score}</span>
      );
    }
    if (this.props.post.descendants > 100) {
      comments = (
        <span className="score score-highlight">{this.props.post.descendants}</span>
      );
    } else {
      comments = (
        <span className="score score-normal">{this.props.post.descendants}</span>
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
          {comments} Comments
        </div>

        <br />
        <br />
      </li>
    );
  }
}

export default Story;
