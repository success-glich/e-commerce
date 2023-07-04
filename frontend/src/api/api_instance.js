import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:4000/api/v1",
  headers: {
    //  Authorization: `<Your Auth Token>`,
    "Content-Type": "application/json",
    withCredentials: true,
  },
});
instance.interceptors.request.use((config) => {
  const access_token = localStorage.getItem("token");
  console.log({ token: access_token });
  if (access_token) {
    config.headers = {
      Authorization: `${access_token}`,
      "Content-Type": "application/json",
      withCredentials: true,
    };
  } else {
    config.headers = {
      "Content-Type": "application/json",
      withCredentials: true,
    };
  }
  return config;
});
instance.interceptors.request.use(
  function (config) {
    // const URLS = []; // list of urls which use access token

    // if (URLS.include(config.url)) {
    //   config.headers = {
    //     Authorization: "Bearer ${token}",
    //   };
    // }
    console.log("REQUEST", config);
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    console.log("RESPONSE", response);

    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default instance;
