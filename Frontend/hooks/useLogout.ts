import { useState } from 'react';
import axios from "axios";
import IP from '../ipAdress.js'
import AsyncStorage from "@react-native-async-storage/async-storage";

const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const logoutUser = async () => {
        setLoading(true);

        try {
            const response = await axios.get(`${IP}/api/auth/logout`);

            if(response.data.error) {
                throw new Error(response.data.error);
            }

            setSuccess(true);
            await AsyncStorage.removeItem('authUser');
            return response.data
        } catch (error) {
            setError('Network error occurred. Please check your connection and try again.');
        } finally {
            setLoading(false);
        }
    }

    return {
        loading,
        error,
        success,
        logoutUser
    }
}

export default useLogout;
