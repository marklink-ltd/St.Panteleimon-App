import { useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IP from "../ipAdress.js";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const loginUser = async (emailOrPhone: String, password: String) => {
    if (!handleInputErrors(emailOrPhone, password)) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${IP}/api/auth/login`, 
        { emailOrPhone, password }, 
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      );

      await AsyncStorage.setItem('authUser', JSON.stringify(response.data._id));
      setSuccess(true);
      return response.data;
    } catch (err) {
      setError('Network error occurred. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    success,
    loginUser
  }
}

function handleInputErrors(emailOrPhone: String, password: String) {
  if (!emailOrPhone || !password) {
    return false;
  }
  return true;
}

export default useLogin;
