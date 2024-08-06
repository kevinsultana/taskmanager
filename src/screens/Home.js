import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  Pressable,
  TouchableNativeFeedback,
} from 'react-native';
import {Background, Gap} from '../component';
import {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Collapsible from 'react-native-collapsible';
import CheckBox from '@react-native-community/checkbox';
import FormInput from '../component/FormInput';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';

const DATA = [
  {
    id: '1',
    title: 'Tugas Satu',
    desc: 'Deskripsi tugas satu yang sangat panjang sekali',
    checked: false,
  },
];

export default function Home({navigation}) {
  const [collapsed, setCollapsed] = useState({});
  const [checked, setChecked] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const closeModal = () => setModalVisible(false);
  const openModal = () => setModalVisible(true);

  const [modalVisibleAdd, setModalVisibleAdd] = useState(false);
  const closeModalAdd = () => setModalVisibleAdd(false);
  const openModalAdd = () => setModalVisibleAdd(true);

  const toggleCollapse = _id => {
    setCollapsed(prevState => ({
      ...prevState,
      [_id]: !prevState[_id],
    }));
  };

  const [tugas, setTugas] = useState('');
  const [deskripsi, setDeskripsi] = useState('');

  const renderItem = ({item}) => (
    <View>
      <View style={styles.viewRenderHeader}>
        <CheckBox
          onChange={() => {
            setChecked(!checked);
          }}
          value={item.checked}
          tintColors={{true: 'white', false: 'white'}}
        />
        <View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.textRenderHeader}>{item.title}</Text>
            <Gap width={20} />
            <TouchableOpacity>
              <Icon
                name={'chevron-down'}
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
              <TouchableOpacity onPress={deleteTask}>
                <Icon name={'trash-can'} color={'white'} size={20} />
              </TouchableOpacity>
            </View>
            <Gap width={10} />
            <View style={styles.viewBtnEdit}>
              <TouchableOpacity onPress={openModal}>
                <View style={{flexDirection: 'row'}}>
                  <Icon name={'lead-pencil'} color={'white'} size={20} />
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

  const [username, setUsername] = useState('');
  const [todos, setTodos] = useState('');

  useEffect(() => {
    const getProfile = async () => {
      const userToken = await EncryptedStorage.getItem('userToken');
      try {
        const userResponse = await axios.get(
          'https://todo-api-omega.vercel.app/api/v1/profile',
          {
            headers: {Authorization: `Bearer ${userToken}`},
          },
        );
        setUsername(userResponse.data.user.username);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    const getTodos = async () => {
      const userToken = await EncryptedStorage.getItem('userToken');
      try {
        const userResponse = await axios.get(
          'https://todo-api-omega.vercel.app/api/v1/todos',
          {
            headers: {Authorization: `Bearer ${userToken}`},
          },
        );
        setTodos(userResponse.data.data.todos);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };
    getTodos();
    getProfile();
  }, []);

  const addTodo = async () => {
    const userToken = await EncryptedStorage.getItem('userToken');
    try {
      await axios.post(
        'https://todo-api-omega.vercel.app/api/v1/todos',
        {
          title: tugas,
          desc: deskripsi,
        },
        {
          headers: {Authorization: `Bearer ${userToken}`},
        },
      );
      closeModalAdd();
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
  };

  const logout = async () => {
    await EncryptedStorage.removeItem('userToken');
    navigation.replace('Login');
  };

  const deleteTask = async id => {
    const token = await EncryptedStorage.getItem('userToken');
    try {
      await axios.delete(
        `https://todo-api-omega.vercel.app/api/v1/todos${id}`,
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      );
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  return (
    <View style={{flex: 1}}>
      <Background />
      <StatusBar backgroundColor={'#a1a1a1'} />

      {/* header signout, username, profile */}
      <View style={styles.header}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={logout}>
            <Icon
              name={'exit-to-app'}
              size={50}
              color={'white'}
              style={{transform: [{rotate: '180deg'}]}}
            />
          </TouchableOpacity>
          <Gap width={10} />
          <View>
            <Text style={{color: 'white', fontSize: 15}}>Hi,</Text>
            <Text style={{color: 'white', fontSize: 22, fontWeight: '700'}}>
              {username}
            </Text>
          </View>
        </View>
        <Icon name={'account-circle-outline'} size={50} color={'white'} />
      </View>
      <View style={{...styles.viewLineDiagonal, marginTop: 5}} />

      {/* flatlist */}

      <FlatList
        data={todos}
        keyExtractor={item => item._id}
        renderItem={renderItem}
      />

      <View style={{...styles.viewLineDiagonal, marginBottom: 10}} />
      <View style={styles.viewLocBtnAddTugas}>
        <View style={styles.viewBtnAddTugas}>
          <TouchableOpacity onPress={openModalAdd}>
            <View style={{flexDirection: 'row'}}>
              <Icon name={'plus-thick'} color={'white'} size={20} />
              <Gap width={3} />
              <Text style={styles.textAddTugas}>Tambah</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* modal tambah tugas */}
      <Modal
        transparent
        visible={modalVisibleAdd}
        onRequestClose={closeModalAdd}
        animationType="fade">
        <Pressable onPress={closeModalAdd} />
        <View style={styles.viewModal}>
          <View style={styles.viewModalContainer}>
            <View style={styles.viewModalHeader}>
              <Icon name="lead-pencil" color={'white'} size={25} />
              <Text style={styles.textModalHeader}>Tambah Tugas</Text>
              <TouchableOpacity>
                <Icon
                  name="close-circle"
                  color={'white'}
                  size={25}
                  onPress={closeModalAdd}
                />
              </TouchableOpacity>
            </View>

            <Gap height={30} />

            <FormInput
              titleShow={false}
              iconName="post"
              placeholder="Tambah Tugas"
              autoCapitalize={'sentences'}
              onChangeText={tugas => {
                setTugas(tugas);
              }}
              counter={{
                show: true,
                value: tugas,
                valueMaximum: 255,
                valueMinimum: 5,
              }}
            />

            <Gap height={20} />

            <FormInput
              titleShow={false}
              iconName="post"
              placeholder="Tambah Deskripsi"
              autoCapitalize={'sentences'}
              onChangeText={deskripsi => {
                setDeskripsi(deskripsi);
              }}
              counter={{
                show: true,
                value: deskripsi,
                valueMaximum: 255,
                valueMinimum: 5,
              }}
            />

            <Gap height={20} />

            <TouchableNativeFeedback useForeground onPress={addTodo}>
              <View style={styles.viewbtnAddTugasModal}>
                <Text style={styles.textAddTugasModal}>Tambah</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </Modal>

      {/* modal edit tugas */}
      <Modal
        transparent
        visible={modalVisible}
        onRequestClose={closeModal}
        animationType="fade">
        <Pressable onPress={closeModal} />
        <View style={styles.viewModal}>
          <View style={styles.viewModalContainer}>
            <View style={styles.viewModalHeader}>
              <Icon name="lead-pencil" color={'white'} size={25} />
              <Text style={styles.textModalHeader}>Edit Tugas</Text>
              <TouchableOpacity>
                <Icon
                  name="close-circle"
                  color={'white'}
                  size={25}
                  onPress={closeModal}
                />
              </TouchableOpacity>
            </View>

            <Gap height={20} />

            <FormInput
              value={tugas}
              titleShow={false}
              iconName="post"
              placeholder="Edit Tugas"
              autoCapitalize={'sentences'}
              onChangeText={tugas => {
                setTugas(tugas);
              }}
              counter={{
                show: true,
                value: tugas,
                valueMaximum: 255,
                valueMinimum: 5,
              }}
            />

            <Gap height={20} />

            <FormInput
              value={deskripsi}
              titleShow={false}
              iconName="post"
              placeholder="Edit Deskripsi"
              autoCapitalize={'sentences'}
              onChangeText={deskripsi => {
                setDeskripsi(deskripsi);
              }}
              counter={{
                show: true,
                value: deskripsi,
                valueMaximum: 255,
                valueMinimum: 5,
              }}
            />

            <Gap height={20} />

            <TouchableNativeFeedback useForeground>
              <View style={styles.viewbtnAddTugasModal}>
                <Text style={styles.textAddTugasModal}>Edit</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  textCounter: {
    color: 'white',
    alignSelf: 'flex-end',
    right: 15,
    fontSize: 12,
  },
  viewLineBorder: {
    alignSelf: 'center',
    width: '90%',
    height: 1,
    backgroundColor: '#ffffffb3',
    marginVertical: 10,
    flex: 1,
  },
  textBtnEdit: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  viewBtnEdit: {
    width: 85,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: '#00677E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewBtnHapus: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: '#9A4242',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewEditHapus: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    marginHorizontal: 25,
  },
  textRenderDesc: {
    color: 'white',
    marginHorizontal: 35,
    fontSize: 15,
    fontWeight: '400',
  },
  textRenderHeader: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
  },
  viewRenderHeader: {
    flexDirection: 'row',
    margin: 20,
    justifyContent: 'space-between',
  },
  textAddTugasModal: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
  viewbtnAddTugasModal: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#00677E',
    width: 115,
    height: 35,
    borderRadius: 15,
    elevation: 5,
    paddingVertical: 5,
    overflow: 'hidden',
  },
  textInput: {
    backgroundColor: 'white',
    width: 260,
    height: 40,
    alignContent: 'center',
    borderRadius: 40 / 2,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textModalHeader: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
  },
  viewModalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewModalContainer: {
    backgroundColor: '#164877',
    width: '80%',
    padding: 20,
    borderRadius: 15,
    elevation: 5,
  },
  viewModal: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  textAddTugas: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
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
  viewLineDiagonal: {
    alignSelf: 'center',
    width: '80%',
    height: 2,
    backgroundColor: 'white',
    marginVertical: 30,
    transform: [{rotate: '-3deg'}],
  },
  header: {
    margin: 30,
    flexDirection: 'row',
    maxWidth: 350,
    justifyContent: 'space-between',
  },
});
