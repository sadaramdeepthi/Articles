import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootreducer";
import { composeWithDevTools } from "redux-devtools-extension";

function configureStore() {
  return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
}

export default configureStore;
