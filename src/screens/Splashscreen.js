import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {Background} from '../component';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';

export default function Splashscreen({navigation}) {
  async function refreshToken() {
    try {
      const credentials = await EncryptedStorage.getItem('credentials');
      if (credentials) {
        const response = await axios.post(
          'https://todo-api-omega.vercel.app/api/v1/auth/login',
          JSON.parse(credentials),
        );

        setTimeout(() => {
          navigation.replace('Home', {token: response.data.user.token});
        }, 2000);
      } else {
        setTimeout(() => {
          navigation.replace('Login');
        }, 2000);
      }
    } catch (error) {
      setTimeout(() => {
        navigation.replace('Login');
      }, 2000);
      console.log('gagal di ambil');
    }
  }

  useEffect(() => {
    refreshToken();
  }, []);

  return (
    <View style={style.viewContainer}>
      <Background />
      <Image
        source={require('../assets/icon_logo.png')}
        style={{width: 120, height: 120}}
      />
      <Text style={style.textVer}>v1.0.0-aplha-rc</Text>
    </View>
  );
}

const style = StyleSheet.create({
  textVer: {
    fontWeight: 'bold',
    color: 'white',
    position: 'absolute',
    bottom: 0,
  },
  viewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
