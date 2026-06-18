import api from "@/api-controllers/api";
import { error } from "node:console";
import { IoEllipsisVertical } from "react-icons/io5";
import { create } from "zustand";

type User = {
  id: string;
  name: string;
  email: string;
};

type LoginResponse = {
  success: boolean;
  user: User;
  isVerified: boolean;
  statusCode: number;
};

interface AuthType {
  user: any | null;
  isLoading: boolean;
  error: string | null;
  verifyOtp: ({
    userId,
    otp,
  }: {
    userId: string;
    otp: string;
  }) => Promise<{ success: boolean; data: any; user: any }>;
  register: ({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name: string;
  }) => Promise<{ success: boolean; data: any; user: any }>;
  login: ({ email, password }: { email: string; password: string }) => Promise<{
    success: boolean;
    data: any;
    user: User | null;
    status?: number;
  }>;
  logout: () => void;
  isAuthenticated: () => boolean;
  clearError: () => void;
  checkAuth: () => Promise<boolean>;
}

const useAuthStore = create<AuthType>((set, get) => ({
  user: null,
  isLoading: false,
  error: null,
  isVerified: false,

  login: async ({ email, password }) => {
    set({ isLoading: true, error: null });

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const loginResponse: LoginResponse = response.data;

      if (loginResponse.success) {
        set({ user: loginResponse.user, isLoading: false });
        return loginResponse;
      }
      throw new Error("Login failed it is a test message");
    } catch (error: any) {
      // console.error("Login error details:", error.response);
      if (error.response.status === 401) {
        console.log("Invalid credentials");
        set({ error: "Invalid credentials", isLoading: false });
        return {
          success: false,
          data: null,
          user: null,
          isVerified: false,
          status: 401,
        };
      } else if (error.response.status === 403) {
        console.log("👊 Needs verification", error.response);
        set({ error: "Verification required", isLoading: false });
        return {
          success: false,
          data: null,
          user: error.response.data.user,
          isVerified: false,
          status: 403,
        };
      }

      const needsVerification = error?.response?.data?.isVerified === false;
      const userId = error?.response?.data?.userId;

      if (needsVerification) {
        const errorMsg = "User not verified. Please verify your email.";
        set({
          error: errorMsg,
          isLoading: false,
        });

        return {
          success: false,
          data: null,
          user: null,
          needsVerification: true,
          userId: userId,
          error: errorMsg,
        };
      }

      const errorMessage =
        error?.response?.data?.message || error?.message || "Login failed";

      set({ error: errorMessage, isLoading: false });

      return {
        success: false,
        data: error?.response?.data,
        user: null,
        statusCode: error?.response?.status,
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

      throw new Error("Registration failed");
    } catch (error: any) {
      console.log(error.response);

      if (error?.response?.status === 409) {
        const errorMsg = "User already exists. Please login instead.";
        set({
          error: errorMsg,
          isLoading: false,
        });

        return {
          success: false,
          data: null,
          user: null,
          exists: true,
          error: errorMsg,
        };
      }
      if (error?.response?.status === 409) {
        const errorMsg = "User already exists. Please login instead.";
        set({
          error: errorMsg,
          isLoading: false,
        });

        return {
          success: false,
          data: null,
          user: null,
          exists: true,
          error: errorMsg,
        };
      }
      if (error?.response?.status === 409) {
        const errorMsg = "User already exists. Please login instead.";
        set({
          error: errorMsg,
          isLoading: false,
        });

        return {
          success: false,
          data: null,
          user: null,
          exists: true,
          error: errorMsg,
        };
      }
      if (error?.response?.status === 403) {
        const errorMsg = "User Not verified";
        set({
          error: errorMsg,
          isLoading: false,
        });

        return {
          success: false,
          data: null,
          user: null,
          exists: true,
          error: errorMsg,
          userId: error?.response?.data?.userId,
          isVerified: false,
          status: 403,
        };
      }
      if (error?.response?.data?.isVerified === false) {
        const errorMsg =
          "User already exists but not verified. Please verify your email.";
        set({
          error: errorMsg,
          isLoading: false,
        });

        return {
          success: false,
          data: null,
          user: null,
          needsVerification: true,
          userId: error?.response?.data?.userId,
          error: errorMsg,
        };
      }

      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Registration failed";

      // Log the full error details for debugging
      console.error("Full registration error:", {
        message: errorMessage,
        response: error?.response?.data,
        status: error?.response?.status,
        isAxiosError: error?.isAxiosError,
        needsVerification: error?.response?.data?.isVerified === false,
      });

      set({ error: errorMessage, isLoading: false });

      return {
        success: false,
        data: null,
        user: null,
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
          user: response.data.user || null,
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
        data: null,
        user: null,
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
