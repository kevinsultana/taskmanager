import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Gap from './gap';
import {useState} from 'react';

export default function FormInput({
  title = 'Nama Input',
  titleShow = true,
  iconName = 'gmail',
  password = false,
  onChangeText = '',
  placeholder = 'Placeholder',
  keyboardType = 'default',
  autoCapitalize = 'sentence',
  counter = {
    show: false,
    value: '',
    valueMinimum: 5,
    valueMaximum: 255,
  },
}) {
  const [secure, setSecure] = useState(true);

  return (
    <View>
      {titleShow && <Text style={styles.textModal}>{title}</Text>}
      <View style={styles.textInputModal}>
        <Icon name={iconName} size={20} color="black" />
        <Gap width={5} />
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={'grey'}
          backgroundColor="white"
          onChangeText={onChangeText}
          secureTextEntry={password && secure}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          style={{flex: 0.96, color: 'black'}}
        />
        {password && (
          <TouchableOpacity onPress={() => setSecure(!secure)}>
            <Icon name={secure ? 'eye' : 'eye-off'} size={20} color="black" />
          </TouchableOpacity>
        )}
      </View>
      {counter.show && (
        <Text
          style={{
            ...styles.textCounter,
            color:
              counter.value.length < counter.valueMinimum ? '#FF4242' : 'white',
          }}>
          {counter.value.length}/{counter.valueMaximum}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  textCounter: {
    color: 'white',
    alignSelf: 'flex-end',
    right: 20,
    fontSize: 13,
  },
  textModal: {
    marginHorizontal: 30,
    marginVertical: 10,
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
  },
  textInputModal: {
    height: 50,
    borderRadius: 25,
    marginHorizontal: 20,
    elevation: 5,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
