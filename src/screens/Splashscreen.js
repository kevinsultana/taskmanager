import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {Background} from '../component';
import EncryptedStorage from 'react-native-encrypted-storage';

export default function Splashscreen({navigation}) {
  async function refreshToken() {
    try {
      const userToken = await EncryptedStorage.getItem('userToken');
      if (userToken) {
        setTimeout(() => {
          navigation.replace('Home');
        }, 2000);
      } else {
        setTimeout(() => {
          navigation.replace('Login');
        }, 2000);
      }
    } catch (error) {
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
