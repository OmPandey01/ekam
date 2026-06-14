import api from "@/api-contollers/api"; // Fixed typo: api-contollers -> api-controllers
import { create } from "zustand";

const useAuthStore = create((set, get) => ({
  user: null,
  isLoading: false,
  error: null,

  login: async ({ email, password }) => {
    set({ isLoading: true, error: null });

    try {
      const response = await api.post("/auth/login", { email, password });

      // Check if response is successful
      if (response.status === 200 || response.status === 201) {
        set({ user: response.data, isLoading: false });

        return {
          success: true,
          data: response.data,
          user: response.data,
        };
      }

      // If we get here, response wasn't successful
      throw new Error("Login failed");
    } catch (error: any) {
      // Safe error logging
      console.error("Login error details:", {
        message: error?.message,
        response: error?.response?.data,
        status: error?.response?.status,
        isAxiosError: error?.isAxiosError,
      });

      // Check for verification error
      const needsVerification = error?.response?.data?.isVerified === false;
      const userId = error?.response?.data?.userId;

      if (needsVerification) {
        set({
          error: "User not verified. Please verify your email.",
          isLoading: false,
        });

        return {
          success: false,
          needsVerification: true,
          userId: userId,
          error: "User not verified",
        };
      }

      // Handle other errors
      const errorMessage =
        error?.response?.data?.message || error?.message || "Login failed";

      set({ error: errorMessage, isLoading: false });

      return {
        success: false,
        error: errorMessage,
      };
    }
  },

  register: async ({ email, password, name }) => {
    set({ isLoading: true, error: null });

    try {
      const response = await api.post(
        "/auth/register",
        { email, password, name },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );

      // Check if response is successful
      if (response.status === 200 || response.status === 201) {
        set({ isLoading: false });

        console.log("Registration response:", response.data);

        return {
          success: true,
          data: response.data,
          user: response.data.user || response.data,
          userId: response.data.user?.id || response.data.id,
          status: response.status,
        };
      }

      // If we get here, response wasn't successful
      throw new Error("Registration failed");
    } catch (error: any) {
      // Safe error logging
      console.error("Registration error details:", {
        message: error?.message,
        response: error?.response?.data,
        status: error?.response?.status,
        isAxiosError: error?.isAxiosError,
      });

      // Check for existing user (409 Conflict)
      if (error?.response?.status === 409) {
        set({
          error: "User already exists. Please login instead.",
          isLoading: false,
        });

        return {
          success: false,
          exists: true,
          error: "User already exists",
        };
      }

      // Check for unverified user
      if (error?.response?.data?.isVerified === false) {
        set({
          error:
            "User already exists but not verified. Please verify your email.",
          isLoading: false,
        });

        return {
          success: false,
          needsVerification: true,
          userId: error?.response?.data?.userId,
          error: "User not verified",
        };
      }

      // Handle other errors
      const errorMessage = {
        message:
          error?.response?.data?.message ||
          error?.message ||
          "Registration failed",
        response: error?.response?.data,
        status: error?.response?.status,
        isAxiosError: error?.isAxiosError,
        needsVerification: error?.response?.data?.isVerified === false,
      };

      set({ error: errorMessage, isLoading: false });

      return {
        success: false,
        error: errorMessage,
      };
    }
  },

  verifyOtp: async ({ userId, otp }) => {
    set({ isLoading: true, error: null });

    try {
      const response = await api.post("/auth/verify-otp", { userId, otp });

      if (response.status === 200 || response.status === 201) {
        set({ isLoading: false });

        return {
          success: true,
          data: response.data,
        };
      }

      throw new Error("Verification failed");
    } catch (error: any) {
      console.error("OTP verification error details:", {
        message: error?.message,
        response: error?.response?.data,
        status: error?.response?.status,
      });

      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Verification failed";

      set({ error: errorMessage, isLoading: false });

      return {
        success: false,
        error: errorMessage,
      };
    }
  },

  logout: () => {
    api
      .post("/auth/logout", {}, { withCredentials: true })
      .catch((error: any) => {
        console.error("Logout error:", error?.message);
      });
    set({ user: null, error: null });

    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  },

  isAuthenticated: () => {
    const { user } = get();
    return !!user;
  },

  clearError: () => set({ error: null }),

  checkAuth: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get("/auth/me");
      set({ user: response.data, isLoading: false });
      return true;
    } catch (error: any) {
      console.error("Check auth error:", error?.message);
      set({ user: null, isLoading: false });
      return false;
    }
  },
}));

export default useAuthStore;
