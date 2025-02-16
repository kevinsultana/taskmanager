import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Background, Gap} from '../component';
import {useState} from 'react';
import CheckBox from '@react-native-community/checkbox';
import FormInput from '../component/FormInput';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import styles from '../style/StyleRegister';

export default function Register({navigation}) {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState('');
  const [loading, setLoading] = useState(false);

  const submitRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Registrasi Gagal', 'Passwords tidak sama.');
      return;
    }
    setLoading(true);
    try {
      await axios.post(
        'https://todo-api-omega.vercel.app/api/v1/auth/register',
        {
          username,
          email,
          password,
          confirmPassword,
        },
      );
      if (rememberMe) {
        await EncryptedStorage.setItem(
          'credentials',
          JSON.stringify({email, password}),
        );
      }

      setLoading(false);
      navigation.replace('Login');
    } catch (error) {
      setLoading(false);
      Alert.alert('Registrasi Gagal', error.response.data.message);
    }
  };

  return (
    <View style={{flex: 1}}>
      <Background />
      <View style={{flex: 1, justifyContent: 'center'}}>
        <View>
          <ScrollView>
            <View style={styles.viewSignin}>
              <Text style={styles.textSignIn}>Sign Up</Text>
              <View style={styles.viewModal}>
                <Gap height={20} />
                <FormInput
                  value={username}
                  title="Username"
                  iconName="account"
                  placeholder="Masukkan Username..."
                  autoCapitalize={'words'}
                  onChangeText={username => setUserName(username)}
                />

                <Gap height={5} />

                <FormInput
                  value={email}
                  title="Email"
                  placeholder="Masukkan Email..."
                  autoCapitalize={'none'}
                  keyboardType={'email-address'}
                  onChangeText={email => setEmail(email)}
                />

                <Gap height={5} />

                <FormInput
                  value={password}
                  title="Password"
                  iconName="lock"
                  placeholder="Masukkan Password..."
                  autoCapitalize={'none'}
                  password={true}
                  onChangeText={password => setPassword(password)}
                />

                <Gap height={5} />

                <FormInput
                  value={confirmPassword}
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
                <TouchableOpacity
                  style={styles.btnLogin}
                  onPress={submitRegister}
                  disabled={loading}>
                  {loading ? (
                    <ActivityIndicator color={'white'} size={'small'} />
                  ) : (
                    <Text style={styles.textLogin}>Daftar</Text>
                  )}
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
            <Gap height={50} />
          </ScrollView>
        </View>
      </View>
    </View>
  );
}
