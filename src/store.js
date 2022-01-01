import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import authReducer from "./reducers/authReducer";
import postReducer from "./reducers/postReducer";

const initialState = {
  auth: {
    authData: localStorage.getItem("profile")
      ? JSON.parse(localStorage.getItem("profile"))
      : null,
  },
};

const reducer = combineReducers({
  posts: postReducer,
  auth: authReducer,
});

const composeEnhanser = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhanser(applyMiddleware(thunk))
);

export default store;
