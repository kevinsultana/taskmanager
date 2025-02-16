import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  textEmptyComponent: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  viewLineDiagonal: {
    alignSelf: 'center',
    width: '80%',
    height: 2,
    backgroundColor: 'white',
    marginVertical: 30,
    transform: [{rotate: '-3deg'}],
  },
  viewLocBtnAddTugas: {
    alignSelf: 'center',
    justifyContent: 'center',
    bottom: 30,
  },
  viewBtnAddTugas: {
    height: 40,
    borderRadius: 40 / 2,
    paddingHorizontal: 15,
    backgroundColor: '#00677E',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  textAddTugas: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default styles;
