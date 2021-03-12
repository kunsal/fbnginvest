const url = 'https://localhost:3001/api/v1/user/';

import store from '../redux/store';
import { USER_LOGIN } from '../redux/actionTypes';

export const login = async (email, password) => {
  const credentials = { email, password }
  const endpoint = 'login';

  try {
    //const token = await getToken(username, password);
    const data = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    }
    const response = await fetch(url + endpoint, data);
    const user = await response.json();
    if ('error' in user) throw new Error(user.error);
    if (user.code == 200) {
      // await store.dispatch({type: USER_LOGIN, user});
      console.log(user);
      return user;
    } else {
      throw new Error(user.message);
    }
  } catch (error) {
    throw new Error(error);
  }
}

