import axios from "axios";

const server = process.env.REACT_APP_SERVER;

export const getExistingToken = () => {
  const tokens = [
    localStorage.getItem("adminToken"),
    localStorage.getItem("inchargeToken"),
    localStorage.getItem("facultyToken"),
    localStorage.getItem("studentToken"),
  ];
  return tokens.find((token) => token) || null; // Get first available token
};

const removeTokens = () => {
  localStorage.removeItem("adminToken");
  localStorage.removeItem("inchargeToken");
  localStorage.removeItem("facultyToken");
  localStorage.removeItem("studentToken");

  localStorage.removeItem("adminExist");
  localStorage.removeItem("inchargeExist");
  localStorage.removeItem("facultyExist");
  localStorage.removeItem("studentExist");
};

const api = axios.create({
  baseURL: server,
  timeout: 240000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getExistingToken();
    if (token) {
      const formattedToken = token.replace(/"/g, "");
      // console.log("🔑 Using Token:", formattedToken);
      config.headers.Authorization = `Bearer ${formattedToken}`;
    } else {
      console.warn("⚠️ No Token Found in Local Storage!");
    }
    // console.log("🚀 Sending Request:", config.method, config.url);
    return config;
  },
  (error) => Promise.reject(error)
);

// 🔹 Response Interceptor for Error Handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;
      switch (status) {
        case 400:
          alert("Bad Request: Please check your input.");
          removeTokens();
          window.location.href = "/nechostelapp";
          break;
        case 401:
          alert("Session Expired: Please log in again.");
          removeTokens();
          window.location.href = "/nechostelapp";
          break;
        case 403:
          alert("Forbidden: You don't have permission.");
          removeTokens();
          window.location.href = "/nechostelapp";
          break;
        case 404:
          alert("Not Found: Requested resource not found.");
          removeTokens();
          window.location.href = "/nechostelapp";
          break;
        case 500:
          alert("Server Error: Please try again later.");
          removeTokens();
          window.location.href = "/nechostelapp";
          break;
        default:
          alert("Something went wrong. Please try again.");
          removeTokens();
          window.location.href = "/nechostelapp";
      }
    } else if (error.request) {
      alert("No response from the server. Please try again.");
      removeTokens();
      window.location.href = "/nechostelapp";
    } else {
      alert("Error: " + error.message);
      removeTokens();
      window.location.href = "/nechostelapp";
    }
    return Promise.reject(error);
  }
);

export default api;
