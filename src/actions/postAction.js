import axios from "../axios";
import {
  FETCH_ALL,
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
  LIKE_POST,
  SEARCHED_POST,
  START_LOADING,
  END_LOADING,
} from "../constants/actionTypes";

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({type: START_LOADING})
    const { data } = await axios.get(`/api/posts?page=${page}`);
    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({type: END_LOADING})
  } catch (error) {
    console.log(error.message);
  }
};

export const getPostBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({type: START_LOADING})
    const { data } = await axios.get(
      `/api/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
        searchQuery.tags
      }`
    );

    dispatch({ type: SEARCHED_POST, payload: data });
    dispatch({type: END_LOADING})
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    dispatch({type: START_LOADING})
    const { data } = await axios.post("/api/posts", post, {
      headers: {
        token: "Bearer:" + JSON.parse(localStorage.getItem("profile")).token,
      },
    });
    dispatch({ type: CREATE_POST, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await axios.put("/api/posts/" + id, post, {
      headers: {
        token: "Bearer:" + JSON.parse(localStorage.getItem("profile")).token,
      },
    });
    dispatch({ type: UPDATE_POST, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await axios.delete("/api/posts/" + id, {
      headers: {
        token: "Bearer:" + JSON.parse(localStorage.getItem("profile")).token,
      },
    });
    dispatch({ type: DELETE_POST, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};

export const likePost = (id, userId) => async (dispatch) => {
  try {
    const { data } = await axios.put("/api/posts/" + id + "/like", { userId });
    dispatch({ type: LIKE_POST, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
