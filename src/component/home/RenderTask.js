import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CheckBox from '@react-native-community/checkbox';
import Gap from '../gap';
import Icon from 'react-native-vector-icons';
import Collapsible from 'react-native-collapsible';

export default function RenderTask() {
  return (
    <View>
      <View style={styles.viewRenderHeader}>
        <CheckBox
          onChange={() => {
            checkistTask(item);
          }}
          value={item.checked}
          tintColors={{true: 'white', false: 'white'}}
        />
        <View style={styles.viewhHeaderTitle}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.textRenderHeader}>{item.title}</Text>
            <Gap width={10} />
            <TouchableOpacity>
              <Icon
                name={collapsed ? 'chevron-down' : 'chevron-up'}
                color={'white'}
                size={35}
                onPress={() => toggleCollapse(item._id)}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View>
        <Collapsible collapsed={!collapsed[item._id]}>
          <Text style={styles.textRenderDesc}>{item.desc}</Text>
          <Gap height={30} />
          <View style={styles.viewEditHapus}>
            <View style={styles.viewBtnHapus}>
              <TouchableOpacity
                onPress={() => {
                  confirmDelete(item._id);
                }}>
                <Icon name={'trash-can'} color={'white'} size={22} />
              </TouchableOpacity>
            </View>
            <Gap width={10} />
            <View style={styles.viewBtnEdit}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(true);
                  setEditedTodos(item);
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Icon name={'lead-pencil'} color={'white'} size={22} />
                  <Gap width={10} />
                  <Text style={styles.textBtnEdit}>Edit</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Collapsible>
      </View>

      {/* view line border */}
      <View style={styles.viewLineBorder} />
    </View>
  );
}

const styles = StyleSheet.create({});
