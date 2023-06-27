import axios from "axios";
function getCookie(name) {
  const cookieValue =
    document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith(name + "="))
      ?.split("=")[1] || "";

  return decodeURIComponent(cookieValue);
}
const instance = axios.create({
  baseURL: "http://127.0.0.1:4000/api/v1",
  headers: {
    //  Authorization: `<Your Auth Token>`,
    "Content-Type": "application/json",
    timeout: 1000,
    withCredentials: true,
  },
  // .. other options
});
instance.interceptors.request.use((config) => {
  const access_token = localStorage.getItem("access");
  if (access_token) {
    config.headers = {
      Authorization: `${access_token}`,
      "Content-Type": "application/json",
    };
  } else {
    config.headers = {
      "Content-Type": "application/json",
    };
  }
  return config;
});

export default instance;
