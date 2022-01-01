import { GOOGLE_AUTH, LOGOUT, SIGNUP, SIGNIN } from "../constants/actionTypes";
import axios from "../axios";

export const googleAuth = (result, token) => async (dispatch) => {
  try {
    const data = { result, token };
    dispatch({ type: GOOGLE_AUTH, payload: { result, token } });
    localStorage.setItem("profile", JSON.stringify({ ...data }));
  } catch (error) {
    console.log(error);
  }
};

export const signUp = (formData) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/user/signup", formData);
    dispatch({ type: SIGNUP, payload: data });
    localStorage.setItem("profile", JSON.stringify({ ...data }));
  } catch (error) {
    console.log(error);
  }
};

export const signIn = (formData) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/user/signin", formData);
    dispatch({ type: SIGNIN, payload: data });
    localStorage.setItem("profile", JSON.stringify({ ...data }));
  } catch (error) {
    console.log(error);
  }
};

export const LogOut = () => async (dispatch) => {
  localStorage.removeItem("profile");
  dispatch({ type: LOGOUT });
};
