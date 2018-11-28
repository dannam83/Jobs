import { AsyncStorage } from 'react-native';
import {
  FB_LOGIN_SUCCESS
} from './types';

//How to use AsyncStorage:
//AsyncStorage.setItem('fb_token', token);
//AsyncStorage.getItem('fb_token')

export const fbLogin = () => async dispatch => {
  let token = await AsyncStorage.getItem('fb_token');

  if (token) {

  } else {

  }
}
