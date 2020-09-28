import {
  FETCH_ARTICLES,
  DELETE_ARTICLE,
  ON_READ,
  FETCH_COMMENTS,
} from "./types";
import axios from "axios";

// fetches article from API
export const fetchArticles = () => async (dispatch) => {
  let data = await fetch(
    "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
  );
  data = await data.json();
  let items = data
    .slice(0, 90)
    .map((id) =>
      fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
      )
    );
  let results = await Promise.all(items);
  results = results.map((result) => result.json());
  let articles = await Promise.all(results);
  articles.sort((a, b) => {
    return b.time - a.time;
  });
  let stories = articles.map((article) => {
    return {
      ...article,
      date: new Date(article.time),
      isRead: false,
    };
  });
  dispatch({
    type: FETCH_ARTICLES,
    payload: stories,
  });
};

// delete the article
export const deleteArticle = (id) => ({
  type: DELETE_ARTICLE,
  payload: id,
});

// marking the clicked article as read by changing background color.
export const onRead = (id) => ({
  type: ON_READ,
  payload: id,
});

// fetching comments from articles array in kids
export const fetchComments = (article) => async (dispatch) => {
  let prs = article.kids.map((kid) =>
    axios(`https://hacker-news.firebaseio.com/v0/item/${kid}.json?print=pretty`)
  );
  let comments = await Promise.all(prs);
  let data = comments.map((comment) => comment.data);
  let payload = { id: article.id, data: data };
  dispatch({
    type: FETCH_COMMENTS,
    payload: payload,
  });
};
