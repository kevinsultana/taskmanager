import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from '../screens/Login';
import Home from '../screens/Home';
import Register from '../screens/Register';
import Splashscreen from '../screens/Splashscreen';

const Stack = createNativeStackNavigator();

export default function Navigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Splash Screen" component={Splashscreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}
