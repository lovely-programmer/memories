import { GOOGLE_AUTH, LOGOUT, SIGNUP, SIGNIN } from "../constants/actionTypes";

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case GOOGLE_AUTH:
    case SIGNIN:
    case SIGNUP:
      return { ...state, authData: action?.payload };

    case LOGOUT:
      return { ...state, authData: null };

    default:
      return state;
  }
};

export default authReducer;
