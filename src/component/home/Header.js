import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Icon} from 'react-native-vector-icons/MaterialCommunityIcons';
import Gap from '../gap';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';

export default function Header() {
  // const [username, setUsername] = useState('Pengguna');
  // const [loading, setLoading] = useState(false);

  const logout = async _id => {
    Alert.alert('Keluar?', 'Sesi anda akan berakhir', [
      {
        text: 'Keluar',
        onPress: async () => {
          try {
            await EncryptedStorage.removeItem('credentials');
            navigation.replace('Login');
          } catch (error) {
            navigation.replace('Login');
          }
        },
      },
      {
        text: 'Batal',
      },
    ]);
  };

  // const getProfile = async () => {
  //   setLoading(true);
  //   try {
  //     const userResponse = await axios.get(
  //       'https://todo-api-omega.vercel.app/api/v1/profile',
  //       {
  //         headers: {Authorization: `Bearer ${token}`},
  //       },
  //     );
  //     setLoading(false);

  //     setUsername(userResponse.data.user.username);
  //   } catch (error) {
  //     setLoading(false);

  //     console.error('Failed to fetch user data:', error);
  //   }
  // };

  // useEffect(() => {
  //   getProfile();
  // }, []);

  return (
    <View style={styles.header}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={logout}>
          <Icon
            name={'exit-to-app'}
            size={50}
            color={'white'}
            style={{transform: [{rotate: '180deg'}]}}
          />
        </TouchableOpacity>
        <Gap width={10} />
        <View>
          <Text style={{color: 'white', fontSize: 15}}>Hi,</Text>
          <Text style={{color: 'white', fontSize: 22, fontWeight: '700'}}>
            username
          </Text>
        </View>
      </View>
      <Icon name={'account-circle-outline'} size={50} color={'white'} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
