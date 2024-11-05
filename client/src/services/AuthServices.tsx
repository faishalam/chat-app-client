import Axios from "axios";

const baseURL = "http://localhost:3002/";
// const baseUrl = 'https://server.kppmonitoring.online/'

export const AuthServices = Axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
