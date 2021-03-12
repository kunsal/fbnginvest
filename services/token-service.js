import store from '../redux/store';
import { USER_LOGOUT } from '../redux/actionTypes';

export const removeToken = async () => {
    if (isTokenAvailable()) {
        store.dispatch({type: USER_LOGOUT, user: {}})
        return true;
    }
//   return new Promise(async (resolve, reject) => {
//       try {
//           if (isTokenAvailable()) {
//             store.dispatch({type: USER_LOGOUT, user: {}})
//             resolve(true)
//           }
//       } catch (err) {
//           reject(err)
//       }
//   });
}

export const isTokenAvailable = () => {
    const user = store.getState().user;
    return new Promise((resolve, reject) => {
        if (user.message) {
            resolve(true);
        } else {
            reject(false);
        }
    });
}

export const getToken = () => {
    return new Promise((resolve, reject) => {
        isTokenAvailable().then((resp) => {
            const user = store.getState().user;
            if(resp === true) {
                resolve('Bearer ' + user.message);
            } else {
                reject('No token found')
            }
        }).catch(err => {});
    })
}
