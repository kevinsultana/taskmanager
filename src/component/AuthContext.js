import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const loadAuthData = async () => {
      try {
        const savedToken = await AsyncStorage.getItem('token');
        const savedUserId = await AsyncStorage.getItem('userId');
        if (savedToken && savedUserId) {
          setToken(savedToken);
          setUserId(savedUserId);
        }
      } catch (error) {
        console.error('Failed to load auth data', error);
      }
    };

    loadAuthData();
  }, []);

  const login = async (newToken, newUserId) => {
    try {
      await AsyncStorage.setItem('token', newToken);
      await AsyncStorage.setItem('userId', newUserId);
      setToken(newToken);
      setUserId(newUserId);
    } catch (error) {
      console.error('Failed to save auth data', error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('userId');
      setToken(null);
      setUserId(null);
    } catch (error) {
      console.error('Failed to remove auth data', error);
    }
  };

  return (
    <AuthContext.Provider value={{token, userId, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};
