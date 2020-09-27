import React, { Component } from "react";
import { connect } from "react-redux";
import { Card } from "react-bootstrap";
import { fetchComments } from "../actions/articleAction";

class CommentList extends Component {
  componentDidMount() {
    !this.props.article.comments &&
      this.props.fetchComments(this.props.article);
  }

  getCommnets = () =>
    this.props.article.comments.map((comment) => (
      <Card style={{ margin: 20 }}>
        <div dangerouslySetInnerHTML={{ __html: comment.text }}></div>
      </Card>
    ));
  render() {
    return (
      <div>
        {this.props.article.comments ? (
          this.getCommnets()
        ) : (
          <span>Loading..</span>
        )}
      </div>
    );
  }
}

export default connect(null, { fetchComments })(CommentList);
