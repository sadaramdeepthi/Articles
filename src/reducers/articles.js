import {
  FETCH_ARTICLES,
  DELETE_ARTICLE,
  ON_READ,
  FETCH_COMMENTS,
} from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_ARTICLES:
      return [...action.payload];
    case DELETE_ARTICLE:
      return state.filter((article) => article.id != action.payload);
    case ON_READ:
      return state.map((article) => ({
        ...article,
        isRead: article.id == action.payload ? true : false,
      }));
    case FETCH_COMMENTS:
      return state.map((article) =>
        article.id == action.payload.id
          ? { ...article, comments: action.payload.data }
          : article
      );
    default:
      return state;
  }
};
