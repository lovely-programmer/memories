import axios from "axios";

const instance = axios.create({
  baseURL: "https://memories-my-backend.herokuapp.com",
});

export default instance;
