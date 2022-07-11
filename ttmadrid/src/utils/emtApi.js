import axios from "axios";

const service = axios.create({
  baseURL: "https://openapi.emtmadrid.es/",
});

export default service;
