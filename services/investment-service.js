import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';

const url = 'http://192.168.88.17:3001/api/v1/investments';

export const myInvestments = async (user) => {
  try {
    const response = await Axios.get(`${url}/me`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${user.token}`
      }
    });
  
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('An error occurred.');
    }
  } catch (error) {
    return error.response.data;
  }

}

export const totalInvestments = async (user) => {
  try {
    const response = await Axios.get(`${url}/me/total`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${user.token}`
      }
    });
    console.log(response);
    return response.data;
  } catch(e) {
    console.log(e);
  }
}
