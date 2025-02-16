import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Gap from '../gap';

export default function HeaderHome({onPressLogOut, textUserName}) {
  return (
    <View style={styles.header}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={onPressLogOut}>
          <Icon
            name={'exit-to-app'}
            size={50}
            color={'white'}
            style={{transform: [{rotate: '180deg'}]}}
          />
        </TouchableOpacity>
        <Gap width={10} />
        <View>
          <Text style={styles.textHi}>Hi,</Text>
          <Text style={styles.textUser}>{textUserName}</Text>
        </View>
      </View>
      <Icon name={'account-circle-outline'} size={50} color={'white'} />
    </View>
  );
}

const styles = StyleSheet.create({
  textUser: {
    color: 'white',
    fontSize: 22,
    fontWeight: '700',
  },
  textHi: {
    color: 'white',
    fontSize: 15,
  },
  header: {
    marginHorizontal: 30,
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
