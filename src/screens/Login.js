import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Gap} from '../component';
import axios from 'axios';
import {useState} from 'react';

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    <ImageBackground source={require('../assets/background.jpg')}>
      <View>
        <StatusBar backgroundColor={'#a1a1a1'} />
        <View style={styles.viewSingin}>
          <Text style={styles.textSignIn}>Sign in</Text>
          <View style={styles.viewModal}>
            <Gap height={20} />
            <Text style={styles.textModal}>Email</Text>
            <TextInput
              placeholder="Masukkan email disini"
              placeholderTextColor={'grey'}
              backgroundColor="white"
              style={styles.textInputModal}
              value={email}
              onChangeText={setEmail}
            />
            <Text style={styles.textModal}>Password</Text>
            <TextInput
              placeholder="Masukkan password disini"
              placeholderTextColor={'grey'}
              backgroundColor="white"
              style={styles.textInputModal}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <Gap height={10} />
            <TouchableOpacity
              style={styles.btnLogin}
              onPress={() => navigation.navigate('Home')}>
              <Text style={styles.textLogin}>Login</Text>
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
    </ImageBackground>
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
    borderRadius: 20,
    marginHorizontal: 20,
    elevation: 5,
    paddingHorizontal: 20,
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
  viewSingin: {
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
