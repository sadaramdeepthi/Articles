import React, { Component } from "react";
import { connect } from "react-redux";
import Article from "./components/Article";
import { fetchArticles } from "./actions/articleAction";
import { Navbar, Spinner } from "react-bootstrap";
import "./App.css";

class App extends Component {
  state = {
    loading: false,
  };
  // fetches the articles from API
  componentDidMount = () => {
    this.props.fetchArticles();
  };

  render() {
    return (
      <div>
        <Navbar className="mb-3" expand="lg" bg="primary">
          <Navbar.Brand>Articles</Navbar.Brand>
        </Navbar>
        {this.props.articles.length > 0 ? (
          this.props.articles.map((article) => <Article article={article} />)
        ) : (
          <Spinner animation="border" />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  articles: state.articles,
});
export default connect(mapStateToProps, {
  fetchArticles,
})(App);
