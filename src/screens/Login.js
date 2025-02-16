import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Background, Gap} from '../component';
import axios from 'axios';
import {useState} from 'react';
import CheckBox from '@react-native-community/checkbox';
import EncryptedStorage from 'react-native-encrypted-storage';
import FormInput from '../component/FormInput';
import styles from '../style/StyleLogin';

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [rememberMe, setRememberMe] = useState(false);

  const [loading, setLoading] = useState(false);

  const submitLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        'https://todo-api-omega.vercel.app/api/v1/auth/login',
        {email, password},
      );
      if (rememberMe) {
        await EncryptedStorage.setItem(
          'credentials',
          JSON.stringify({email, password}),
        );
      }
      setLoading(false);
      navigation.replace('Home', {token: response.data.user.token});
    } catch (error) {
      setLoading(false);
      Alert.alert(
        'Gagal Login',
        'Silahkan cek kembali Koneksi Internet, Email, dan Passwordnya. atau Daftar.',
      );
    }
  };

  return (
    <View style={{flex: 1}}>
      <Background />
      <View style={{flex: 1, justifyContent: 'center'}}>
        <View>
          <ScrollView>
            <View style={styles.viewSignin}>
              <Text style={styles.textSignIn}>Sign in</Text>
              <View style={styles.viewModal}>
                <Gap height={10} />

                <FormInput
                  value={email}
                  title="Email"
                  placeholder="Masukkan Email..."
                  keyboardType={'email-address'}
                  autoCapitalize={'none'}
                  onChangeText={email => setEmail(email)}
                />

                <Gap height={10} />

                <FormInput
                  value={password}
                  title="Password"
                  placeholder="Kata Sandi..."
                  iconName="lock"
                  password={true}
                  autoCapitalize={'none'}
                  onChangeText={password => setPassword(password)}
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

                <Gap height={10} />

                <TouchableOpacity
                  style={styles.btnLogin}
                  onPress={submitLogin}
                  disabled={loading}>
                  {loading ? (
                    <ActivityIndicator color={'white'} size={'small'} />
                  ) : (
                    <Text style={styles.textLogin}>Masuk</Text>
                  )}
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
                <Gap height={10} />
              </View>
            </View>
            <Gap height={70} />
          </ScrollView>
        </View>
      </View>
    </View>
  );
}
