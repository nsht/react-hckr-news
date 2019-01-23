import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentAlt, faHeart } from "@fortawesome/free-regular-svg-icons";


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
    // TODO make date relative
    // const options = { year: 'numeric', month: 'long', day: 'numeric' };
    let date = new Date(this.props.post.time * 1000).toLocaleDateString();
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
            {this.props.post.score} <FontAwesomeIcon icon={faHeart} />
          </span>
          -
          <a
            href={this.props.post.hckr_url}
            target="_blank"
            rel="noopener noreferrer">
            <span className={"score " + comments_class}>
              {this.props.post.descendants} <FontAwesomeIcon icon={faCommentAlt} />
            </span>
          </a>
        </div>
        <br />
      </li>
    );
  }
}

export default Story;
