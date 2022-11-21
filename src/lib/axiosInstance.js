import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api",
});

axiosInstance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject({
      status: error.response.status,
      message:
        typeof error.response.data.message !== "undefined"
          ? error.response.data.message
          : "Erreur inconnue",
    });
  }
);

export default axiosInstance;
