import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Background} from '../component';

export default function Splashscreen({navigation}) {
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
