import {Image} from 'react-native';
import React from 'react';

export default function Background() {
  return (
    <Image
      source={require('../assets/background.jpg')}
      style={{width: '100%', height: '100%', position: 'absolute'}}
    />
  );
}
