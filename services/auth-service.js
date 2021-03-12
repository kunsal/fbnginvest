import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';

const url = 'http://192.168.88.17:3001/api/v1/user/login';

const saveUser = async (user) => {
  try {
    const jsonValue = JSON.stringify(user);
    return await AsyncStorage.setItem('user', jsonValue)
  } catch (e) {
    console.log(e);
  }
}

export const getUser = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('user')
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
}

export const login = async (email, password) => {
  try {
    const response = await Axios.post(`${url}`, { email, password });
  
    if (response.status === 200) {
      await saveUser(response.data);
      return response.data;
    } else {
      throw new Error('An error occurred.');
    }
  } catch (error) {
    return error.response.data;
  }

}

export const isLoggedIn = async () => {
  try {
    const value = await AsyncStorage.getItem('user')
    if(value !== null) {
      return true;
    } 
    return false;
  } catch(e) {
    console.log(e);
  }
}

export const logout = async () => {
  try {
    await AsyncStorage.removeItem('user');
  } catch(e) {
    console.log(e);
  }
  console.log('Done.')
}
