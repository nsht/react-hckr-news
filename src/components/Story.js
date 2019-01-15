import React from "react";

class Story extends React.Component {
  getHostName = url => {
    if (typeof url !== "undefined") {
      return "(" + new URL(url).hostname + ")";
    }
    return "";
  };
  render() {
    let score_class;
    let comments_class;
    if (this.props.post.score > 100) {
      score_class = "score-highlight";
    } else {
      score_class = "score-normal";
    }
    if (this.props.post.descendants > 100) {
      comments_class = "score-highlight";
    } else {
      comments_class = "score-normal";
    }

    return (
      <li>
        <a href={this.props.post.url} target="_blank" rel="noopener noreferrer">
          <span>{this.props.post.title} </span>
        </a>
        <span className="hacker-news-link" />
        <div className="hostname">{this.getHostName(this.props.post.url)}</div>
        <div>
          <span className={"score " + score_class}>
            {this.props.post.score} Points
          </span>
          -
          <span className={"score " + comments_class}>
            {this.props.post.descendants} Comments
          </span>
          <a
            href={this.props.post.hckr_url}
            target="_blank"
            rel="noopener noreferrer"
            className="score hckr-news-url"
          >
            (Hacker News URL)
          </a>
        </div>
        <br />
      </li>
    );
  }
}

export default Story;
