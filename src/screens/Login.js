import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Background, Gap} from '../component';
import axios from 'axios';
import {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckBox from '@react-native-community/checkbox';

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);

  function submitLogin() {
    axios
      .post('https://todo-api-omega.vercel.app/api/v1/auth/login', {
        email: email,
        password: password,
      })
      .then(Response => {
        Response.data.user.token;
        navigation.navigate('Home');
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <View>
      <Background />
      <StatusBar backgroundColor={'#a1a1a1'} />
      <View style={styles.viewSignin}>
        <Text style={styles.textSignIn}>Sign in</Text>
        <View style={styles.viewModal}>
          <Gap height={20} />
          <Text style={styles.textModal}>Email</Text>
          <View style={styles.textInputModal}>
            <Icon name="email" size={20} color="black" />
            <Gap width={5} />
            <TextInput
              placeholder="Masukkan email disini"
              placeholderTextColor={'grey'}
              backgroundColor="white"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <Text style={styles.textModal}>Password</Text>
          <View style={styles.textInputModal}>
            <Icon name="lock" size={20} color="black" />
            <Gap width={5} />
            <TextInput
              placeholder="Masukkan password disini"
              placeholderTextColor={'grey'}
              backgroundColor="white"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={secure}
              style={{flex: 1, color: 'black'}}
            />
            <TouchableOpacity onPress={() => setSecure(!secure)}>
              <Icon name={secure ? 'eye-off' : 'eye'} size={20} color="black" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              marginHorizontal: 20,
            }}>
            <CheckBox
              value={true}
              tintColors={{true: 'white', false: 'white'}}
              style={{transform: [{scale: 0.8}]}}
            />
            <Text style={{fontWeight: '500', color: 'white'}}>Ingat Saya</Text>
          </View>
          <Gap height={5} />
          <TouchableOpacity
            style={styles.btnLogin}
            onPress={() => navigation.replace('Home')}>
            <Text style={styles.textLogin}>Masuk</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.btnLogin,
              backgroundColor: '#9A4242',
              width: 100,
            }}
            onPress={() => navigation.navigate('Register')}>
            <Text style={styles.textLogin}>Daftar</Text>
          </TouchableOpacity>
          <Gap height={20} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textLogin: {
    fontSize: 19,
    fontWeight: '700',
    alignItems: 'center',
    color: 'white',
  },
  btnLogin: {
    backgroundColor: '#00677E',
    width: 185,
    height: 40,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 40 / 2,
    elevation: 5,
  },
  textInputModal: {
    borderRadius: 25,
    marginHorizontal: 20,
    elevation: 5,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textModal: {
    marginHorizontal: 30,
    marginVertical: 10,
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
  },
  viewModal: {
    backgroundColor: '#d1d1d196',
    width: '80%',
    borderRadius: 25,
    alignContent: 'center',
  },
  viewSignin: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  textSignIn: {
    fontSize: 36,
    color: 'white',
    fontWeight: '700',
  },
});
