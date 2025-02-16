import {StyleSheet} from 'react-native';

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
    maxWidth: 480,
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

export default styles;
