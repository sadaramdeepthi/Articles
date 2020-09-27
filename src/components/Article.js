import React, { Component } from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { onRead, deleteArticle } from "../actions/articleAction";
import { connect } from "react-redux";
import Comments from "./Comments";

class Article extends Component {
  state = {
    isCommentsOpen: false,
  };

  onRead = (article) => {
    this.props.onRead(article.id);
    window.open(article.url, "_blank");
  };

  onCommnetsClick = () => {
    this.setState({ isCommentsOpen: !this.state.isCommentsOpen });
  };

  render() {
    let { article } = this.props;
    let dt = new Date(article.time);
    return (
      //displayed list of articles in Card model.
      <Card
        key={article.id}
        className="ml-3 mr-3 mb-4 mt-2"
        // marking the clicked article as read by changing background color.
        style={{
          backgroundColor: article.isRead ? "  rgb(245, 237, 237)" : "white",
        }}
      >
        <Card.Body id={article} onClick={() => this.onRead(article)}>
          <Card.Title>{article.title}</Card.Title>
          <Card.Text className="mb-1"> Written by - {article.by} </Card.Text>
          <Card.Link href={article.url}>{article.url} </Card.Link>
          <Card.Text className="mb-1">
            The story votes - {article.score}
          </Card.Text>
          <Card.Text>Posted on :- {dt.toLocaleString()}</Card.Text>
        </Card.Body>

        <Card.Footer>
          <Button
            variant="primary"
            size="sm"
            id={article.kids}
            onClick={this.onCommnetsClick}
          >
            Comments{" "}
            {article.kids && (
              <Badge variant="light">{article.kids.length}</Badge>
            )}
          </Button>
          <Button
            size="sm"
            className="ml-2 mr-2"
            variant="danger"
            id={article.id}
            onClick={(e) => this.props.deleteArticle(e.target.id)}
          >
            Delete
          </Button>
        </Card.Footer>

        {this.state.isCommentsOpen && <Comments article={article} />}
      </Card>
    );
  }
}

export default connect(null, { deleteArticle, onRead })(Article);
