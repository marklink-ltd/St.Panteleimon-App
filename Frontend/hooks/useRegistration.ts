import { useState } from "react";
import axios from "axios";
import IP from "ipAdress";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useRegistration = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const registerUser = async (fullName: String, email: String, phoneNumber: String, password: String, confirmPassword: String) => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        `${IP}/api/auth/signup`,
        {
          fullName,
          email,
          phoneNumber,
          password,
          confirmPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Ensure this is correct for your setup
        }
      );

      // Assuming successful registration
      setSuccess(true);
      // console.log("User registered successfully:", response.data);
      await AsyncStorage.setItem('authUser', JSON.stringify(response.data._id));
      // return response.data; // Optionally return data if needed
    } catch (error: any) {
      console.error("Registration failed:", error);
      if (error.response) {
        // Server responded with a status other than 200 range
        console.error("Error response data:", error.response.data);
        setError(error.response.data.error || "Registration failed. Please try again.");
      } else if (error.request) {
        // Request was made but no response received
        console.error("No response received:", error.request);
        setError("No response from server. Please check your network connection.");
      } else {
        // Something else happened in setting up the request
        console.error("Error setting up request:", error.message);
        setError("An unexpected error occurred. Please try again.");
      }
      throw error; // Re-throw error to propagate to caller (SignUp component)
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    success,
    registerUser,
  };
};

export default useRegistration;
