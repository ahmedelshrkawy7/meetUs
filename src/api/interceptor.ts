import axios, {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { useToast } from "@/hooks/use-toast";
import { getToken, removeToken } from "@/utils/auth"; // Adjust with your token management functions
import { redirect } from "react-router-dom";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const { toast } = useToast();

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: baseURL,
});

// Helper function to display toast
export const showToast = (
  title: string,
  description: string,
  variant: "destructive" | "default" = "destructive"
) => {
  toast({
    title,
    description,
    duration: 3000,
    variant,
  });
};

// Token refreshing function
const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const refreshToken = getToken().refreshToken; // Retrieve the refresh token
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const response = await axios.post(`${baseURL}/auth/refresh`, {
      refreshToken,
    });
    const newAccessToken = response.data.token;
    const newRefreshToken = response.data.refresh;

    // Save the new tokens
    // setToken(newAccessToken, newRefreshToken);

    return newAccessToken;
  } catch (error) {
    showToast("Error", "Session expired. Please log in again.");
    removeToken(); // Clear tokens from storage
    redirect("/login");
    return null;
  }
};

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error: AxiosError) => {
    showToast("Error", "An error occurred while making the request.");
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      }
    }

    if (error.response?.status === 401) {
      showToast("Error", "Unauthorized access. Please log in.");
      removeToken(); // Clear tokens from storage
      window.location.href = "/"; // Redirect to login
    } else if (error.response?.status === 500) {
      showToast("Error", "Internal Server Error");
    } else {
      showToast(
        "Error",
        error.response?.data?.message || "An unknown error occurred."
      );
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
