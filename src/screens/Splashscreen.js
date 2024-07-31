import {View, Button, ImageBackground, Image} from 'react-native';

export default function Splashscreen({navigation}) {
  return (
    <ImageBackground
      source={require('../assets/background.jpg')}
      style={{flex: 1}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          source={require('../assets/planning 2.jpg')}
          style={{
            width: 200,
            height: 200,
            resizeMode: 'cover',
          }}></Image>
        <Button title="login" onPress={() => navigation.replace('Login')} />
      </View>
    </ImageBackground>
  );
}
