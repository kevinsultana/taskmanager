import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  Pressable,
  TouchableNativeFeedback,
  Alert,
} from 'react-native';
import {Background, Gap} from '../component';
import {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Collapsible from 'react-native-collapsible';
import CheckBox from '@react-native-community/checkbox';
import FormInput from '../component/FormInput';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios, {isAxiosError} from 'axios';
import {ActivityIndicator} from 'react-native-paper';

export default function Home({navigation, route}) {
  const token = route.params.token;

  const [collapsed, setCollapsed] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const closeModal = () => setModalVisible(false);

  const [modalVisibleAdd, setModalVisibleAdd] = useState(false);
  const closeModalAdd = () => setModalVisibleAdd(false);
  const openModalAdd = () => setModalVisibleAdd(true);

  const toggleCollapse = _id => {
    setCollapsed(prevState => ({
      ...prevState,
      [_id]: !prevState[_id],
    }));
  };

  const [loading, setLoading] = useState(false);

  const [tugas, setTugas] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [username, setUsername] = useState('Pengguna');
  const [todos, setTodos] = useState([]);

  const getProfile = async () => {
    setLoading(true);
    try {
      const userResponse = await axios.get(
        'https://todo-api-omega.vercel.app/api/v1/profile',
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      );
      setLoading(false);

      setUsername(userResponse.data.user.username);
    } catch (error) {
      setLoading(false);

      console.error('Failed to fetch user data:', error);
    }
  };

  const getTodos = async () => {
    setLoading(true);
    try {
      const userResponse = await axios.get(
        'https://todo-api-omega.vercel.app/api/v1/todos',
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      );
      setLoading(false);

      setTodos(userResponse.data.data.todos);
    } catch (error) {
      setLoading(false);

      console.error('Failed to fetch user data:', error);
    }
  };

  useEffect(() => {
    getTodos();
    getProfile();
  }, []);

  const [loadingAdd, setLoadingAdd] = useState(false);

  const addTodo = async () => {
    setLoadingAdd(true);
    try {
      await axios.post(
        'https://todo-api-omega.vercel.app/api/v1/todos',
        {
          title: tugas,
          desc: deskripsi,
        },
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      );
      setLoadingAdd(false);
      setTugas('');
      setDeskripsi('');
      closeModalAdd();
      getTodos();
    } catch (error) {
      setLoadingAdd(false);
      Alert.alert('Gagal Tambah Tugas', error.response.data.message);
    }
  };

  const logout = async _id => {
    Alert.alert('Keluar?', 'Sesi anda akan berakhir', [
      {
        text: 'Keluar',
        onPress: async () => {
          try {
            await EncryptedStorage.removeItem('credentials');
            navigation.replace('Login');
          } catch (error) {
            navigation.replace('Login');
          }
        },
      },
      {
        text: 'Batal',
      },
    ]);
  };

  const deleteTask = async id => {
    try {
      await axios.delete(
        `https://todo-api-omega.vercel.app/api/v1/todos/${id}`,
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      );
      getTodos();
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  const confirmDelete = id => {
    Alert.alert(
      'Hapus Tugas',
      'Hapus Tugas? Tindakan ini tidak dapat di ulangi',
      [
        {
          text: 'Hapus',
          onPress: () => deleteTask(id),
        },
        {
          text: 'Batal',
        },
      ],
    );
  };

  const [editedTodos, setEditedTodos] = useState({
    _id: '',
    title: '',
    desc: '',
    checked: '',
  });
  const [loadingEdit, setLoadingEdit] = useState(false);

  const updateTask = async () => {
    setLoadingEdit(true);
    try {
      await axios.put(
        `https://todo-api-omega.vercel.app/api/v1/todos/${editedTodos._id}`,
        editedTodos,
        {headers: {Authorization: `Bearer ${token}`}},
      );
      setLoadingEdit(false);

      setModalVisible(false);
      getTodos();
    } catch (error) {
      setLoadingEdit(false);
      console.log(error);
    }
  };

  const checkistTask = async item => {
    try {
      await axios.put(
        `https://todo-api-omega.vercel.app/api/v1/todos/${item._id}`,
        {
          checked: !item.checked,
        },
        {headers: {Authorization: `Bearer ${token}`}},
      );

      getTodos();
    } catch (error) {
      if (isAxiosError(error)) console.log(error.response.data);
    }
  };

  return (
    <View style={{flex: 1}}>
      <Background />
      <Gap height={StatusBar.currentHeight} />

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

      {/* line Diagonal atas */}
      <View style={{...styles.viewLineDiagonal, marginTop: 5}} />

      {/* flatlist */}
      <FlatList
        data={todos}
        ListEmptyComponent={
          <Text style={styles.textEmptyComponent}>Tidak Ada tugas</Text>
        }
        keyExtractor={item => item._id}
        renderItem={({item}) => {
          return (
            <View
              style={{
                width: '100%',
                maxWidth: 480,
                alignSelf: 'center',
              }}>
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
                          <Icon
                            name={'lead-pencil'}
                            color={'white'}
                            size={22}
                          />
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
        }}
        refreshing={loading}
        onRefresh={getTodos}
      />
      {/* line diagonal bawah */}
      <View style={{...styles.viewLineDiagonal, marginBottom: 10}} />

      {/* Btn Tambah */}
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
              value={tugas}
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
                valueMinimum: 3,
              }}
            />

            <Gap height={20} />

            <FormInput
              value={deskripsi}
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
                valueMinimum: 25,
              }}
            />

            <Gap height={20} />

            <TouchableNativeFeedback useForeground onPress={addTodo}>
              <View style={styles.viewbtnAddTugasModal}>
                {loadingAdd ? (
                  <ActivityIndicator color="white" size={'small'} />
                ) : (
                  <Text style={styles.textAddTugasModal}>Tambah</Text>
                )}
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
              value={editedTodos.title}
              titleShow={false}
              iconName="post"
              placeholder="Edit Tugas"
              autoCapitalize={'sentences'}
              onChangeText={title => setEditedTodos({...editedTodos, title})}
              counter={{
                show: true,
                value: editedTodos.title,
                valueMaximum: 255,
                valueMinimum: 3,
              }}
            />

            <Gap height={20} />

            <FormInput
              value={editedTodos.desc}
              titleShow={false}
              iconName="post"
              placeholder="Edit Deskripsi"
              autoCapitalize={'sentences'}
              onChangeText={desc => setEditedTodos({...editedTodos, desc})}
              counter={{
                show: true,
                value: editedTodos.desc,
                valueMaximum: 255,
                valueMinimum: 25,
              }}
            />

            <Gap height={20} />

            <TouchableNativeFeedback useForeground onPress={() => updateTask()}>
              <View style={styles.viewbtnAddTugasModal}>
                {loadingEdit ? (
                  <ActivityIndicator color="white" size={'small'} />
                ) : (
                  <Text style={styles.textAddTugasModal}>Edit</Text>
                )}
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  textEmptyComponent: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '600',
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
    fontSize: 16,
    fontWeight: '600',
  },
  viewBtnEdit: {
    width: 85,
    height: 35,
    borderRadius: 35 / 2,
    backgroundColor: '#00677E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewBtnHapus: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
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
    fontSize: 16,
    fontWeight: '500',
  },
  textRenderHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  viewhHeaderTitle: {
    flex: 0.85,
    alignItems: 'flex-end',
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
    maxWidth: 480,
    alignSelf: 'center',
    width: '100%',
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
    marginHorizontal: 30,
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
