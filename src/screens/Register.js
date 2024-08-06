import {
  Alert,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Background, Gap} from '../component';
import {useState} from 'react';
import CheckBox from '@react-native-community/checkbox';
import FormInput from '../component/FormInput';

export default function Register({navigation}) {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState('');

  const submitRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Registrasi Gagal', 'Passwords tidak sama.');
      return;
    }
    try {
      const response = await axios.post(
        'https://todo-api-omega.vercel.app/api/v1/auth/register',
        {
          userName,
          email,
          password,
          confirmPassword,
        },
      );
      if (response.data.user) {
        console.log(response.data.user);
      }
      // navigation.replace('Login');
    } catch (error) {
      console.log(error.response.data);
      Alert.alert('Registrasi Gagal', 'Silahkan Coba Lagi');
    }
  };

  return (
    <View style={{flex: 1}}>
      <Background />
      <StatusBar backgroundColor={'#a1a1a1'} />
      <View style={styles.viewSignin}>
        <Text style={styles.textSignIn}>Sign Up</Text>
        <View style={styles.viewModal}>
          <Gap height={20} />
          <FormInput
            title="Username"
            iconName="account"
            placeholder="Masukkan Username..."
            autoCapitalize={'words'}
            onChangeText={userName => setUserName(userName)}
          />

          <Gap height={5} />

          <FormInput
            title="Email"
            placeholder="Masukkan Email..."
            autoCapitalize={'none'}
            keyboardType={'email-address'}
            onChangeText={email => setEmail(email)}
          />

          <Gap height={5} />

          <FormInput
            title="Password"
            iconName="lock"
            placeholder="Masukkan Password..."
            autoCapitalize={'none'}
            password={true}
            onChangeText={password => setPassword(password)}
          />

          <Gap height={5} />

          <FormInput
            title="Password"
            iconName="lock"
            placeholder="Masukkan Password..."
            autoCapitalize={'none'}
            password={true}
            onChangeText={confirmPassword =>
              setConfirmPassword(confirmPassword)
            }
          />
          <Gap height={10} />
          <View style={styles.viewRememberMe}>
            <CheckBox
              onChange={() => setRememberMe(!rememberMe)}
              value={rememberMe}
              tintColors={{true: 'white', false: 'white'}}
            />
            <Text
              style={{fontWeight: '500', color: 'white'}}
              onPress={() => setRememberMe(!rememberMe)}>
              Ingat Saya
            </Text>
          </View>
          <Gap height={5} />
          <TouchableOpacity style={styles.btnLogin} onPress={submitRegister}>
            <Text style={styles.textLogin}>Daftar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.btnLogin,
              backgroundColor: '#9A4242',
              width: 100,
            }}
            onPress={() => navigation.goBack()}>
            <Text style={styles.textLogin}>Kembali</Text>
          </TouchableOpacity>
          <Gap height={20} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewRememberMe: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginHorizontal: 20,
  },
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
