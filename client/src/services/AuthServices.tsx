import Axios from "axios";

// const baseURL = "http://localhost:3004/";
const baseURL = 'https://chat-web-app-1358486b4ea0.herokuapp.com/'

export const AuthServices = Axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
