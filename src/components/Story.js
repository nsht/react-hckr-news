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
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    let date = new Date(this.props.post.time * 1000).toLocaleDateString("en-US");
    if (this.props.post.score > 100) {
      score_class = "score-highlight";
    } else {
      score_class = "score-normal";
    }
    if (this.props.post.descendants > 50) {
      comments_class = "score-highlight";
    } else {
      comments_class = "score-normal";
    }

    return (
      <li className="story-item">
        <a href={this.props.post.url} target="_blank" rel="noopener noreferrer">
          <span>{this.props.post.title} </span>
        </a>
        <div className="hostname">{this.getHostName(this.props.post.url)}
          <span className="post-date">{date} </span>
        </div>
        <div>
          <span className={"score " + score_class}>
            {this.props.post.score} Points
          </span>
          -
          <a
            href={this.props.post.hckr_url}
            target="_blank"
            rel="noopener noreferrer">
            <span className={"score " + comments_class}>
              {this.props.post.descendants} Comments
            </span>
            <span className="score hckr-news-url">(Hacker News URL) </span>
          </a>
        </div>
        <br />
      </li>
    );
  }
}

export default Story;
