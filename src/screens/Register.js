import {
  Button,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Gap} from '../component';
import Splashscreen from './Splashscreen';
import Login from './Login';

export default function Register({navigation, routes}) {
  return (
    <ImageBackground source={require('../assets/background.jpg')}>
      <View>
        <StatusBar backgroundColor={'#a1a1a1'} />
        <View style={styles.viewSingin}>
          <Text style={styles.textSignUp}>Sign Up</Text>
          <View style={styles.viewModal}>
            <Gap height={20} />
            <Text style={styles.textModal}>Username</Text>
            <TextInput
              placeholder="Masukkan username disini"
              placeholderTextColor={'grey'}
              backgroundColor="white"
              style={styles.textInputModal}
            />
            <Text style={styles.textModal}>Email</Text>
            <TextInput
              placeholder="Masukkan email disini"
              placeholderTextColor={'grey'}
              backgroundColor="white"
              style={styles.textInputModal}
            />
            <Text style={styles.textModal}>Password</Text>
            <TextInput
              placeholder="Masukkan password disini"
              placeholderTextColor={'grey'}
              backgroundColor="white"
              style={styles.textInputModal}
            />
            <Text style={styles.textModal}>Confirm password</Text>
            <TextInput
              placeholder="Masukkan  password disini"
              placeholderTextColor={'grey'}
              backgroundColor="white"
              style={styles.textInputModal}
            />
            <Gap height={10} />
            <TouchableOpacity
              style={styles.btnLogin}
              onPress={() => navigation.reset({routes: [{name: 'Login'}]})}>
              <Text style={styles.textBtnLogin}>Daftar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.btnLogin,
                backgroundColor: '#9A4242',
                width: 100,
              }}
              onPress={() => navigation.goBack()}>
              <Text style={styles.textBtnLogin}>Kembali</Text>
            </TouchableOpacity>
            <Gap height={20} />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBtnLogin: {
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
  textSignUp: {
    fontSize: 36,
    color: 'white',
    fontWeight: '700',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
