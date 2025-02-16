import {
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import CheckBox from '@react-native-community/checkbox';
import Gap from '../gap';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function RenderTask({
  item,
  onCheckList,
  onPressDetail,
  index,
  selectedIndex,
  onPressDelete,
  onPressEdit,
}) {
  return (
    <View style={styles.viewRenderContainer}>
      <View style={styles.viewRenderHeader}>
        <CheckBox
          onChange={onCheckList}
          value={item.checked}
          tintColors={{true: 'white', false: 'white'}}
        />
        <View style={styles.viewhHeaderTitle}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.textRenderHeader}>{item.title}</Text>
            <Gap width={10} />
            <TouchableNativeFeedback useForeground onPress={onPressDetail}>
              <View style={styles.btnBackdrop}>
                <Icon
                  name={index == selectedIndex ? 'chevron-up' : 'chevron-down'}
                  color={'white'}
                  size={35}
                />
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </View>
      {index == selectedIndex && (
        <View>
          <Text style={styles.textRenderDesc}>{item.desc}</Text>
          <Gap height={30} />
          <View style={styles.viewEditHapus}>
            <View style={styles.viewBtnHapus}>
              <TouchableOpacity onPress={onPressDelete}>
                <Icon name={'trash-can'} color={'white'} size={22} />
              </TouchableOpacity>
            </View>
            <Gap width={10} />
            <View style={styles.viewBtnEdit}>
              <TouchableOpacity onPress={onPressEdit}>
                <View style={{flexDirection: 'row'}}>
                  <Icon name={'lead-pencil'} color={'white'} size={22} />
                  <Gap width={10} />
                  <Text style={styles.textBtnEdit}>Edit</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      {/* view line border */}
      <View style={styles.viewLineBorder} />
    </View>
  );
}

const styles = StyleSheet.create({
  viewLineBorder: {
    alignSelf: 'center',
    width: '90%',
    height: 1,
    backgroundColor: '#ffffffb3',
    marginVertical: 10,
    flex: 1,
  },
  viewRenderContainer: {
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
  },
  viewRenderHeader: {
    flexDirection: 'row',
    margin: 20,
    justifyContent: 'space-between',
  },
  viewhHeaderTitle: {
    flex: 1,
  },
  textRenderHeader: {
    textAlign: 'right',
    flex: 1,
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  btnBackdrop: {
    backgroundColor: '#00000066',
    borderRadius: 35 / 2,
    width: 35,
    height: 35,
    overflow: 'hidden',
  },
  textRenderDesc: {
    color: 'white',
    marginHorizontal: 35,
    fontSize: 16,
    fontWeight: '500',
  },
  viewEditHapus: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    marginHorizontal: 25,
  },
  viewBtnHapus: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
    backgroundColor: '#9A4242',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewBtnEdit: {
    width: 85,
    height: 35,
    borderRadius: 35 / 2,
    backgroundColor: '#00677E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBtnEdit: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
