import React, { Component } from "react";
import CommentList from "./CommentList";

// to fetch the list of comments present in the article
export default class Comments extends Component {
  render() {
    return (
      <div>
        {!this.props.article.kids ? (
          <span>No Comments</span>
        ) : (
          <CommentList article={this.props.article} />
        )}
      </div>
    );
  }
}
