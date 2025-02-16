import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Alert,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import {
  Background,
  Gap,
  HeaderHome,
  ModalEdit,
  ModalTambah,
  RenderTask,
} from '../component';
import {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EncryptedStorage from 'react-native-encrypted-storage';
import {isAxiosError} from 'axios';
import ApiTask from '../api/ApiTask';
import styles from '../style/StyleHome';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function Home({navigation, route}) {
  const token = route.params.token;

  const [modalVisible, setModalVisible] = useState(false);
  const closeModal = () => setModalVisible(false);

  const [modalVisibleAdd, setModalVisibleAdd] = useState(false);
  const closeModalAdd = () => setModalVisibleAdd(false);
  const openModalAdd = () => setModalVisibleAdd(true);

  const [loading, setLoading] = useState(false);

  const [tugas, setTugas] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [username, setUsername] = useState('Pengguna');
  const [todos, setTodos] = useState([]);

  const getProfile = async () => {
    setLoading(true);
    try {
      const userResponse = await ApiTask(token).get('/profile');
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
      const userResponse = await ApiTask(token).get('/todos');
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
      await ApiTask(token).post('/todos', {
        title: tugas,
        desc: deskripsi,
      });
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
      await ApiTask(token).delete(`/todos/${id}`);
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
      await ApiTask(token).put(`/todos/${editedTodos._id}`, editedTodos);
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
      await ApiTask(token).put(`/todos/${item._id}`, {
        checked: !item.checked,
      });

      getTodos();
    } catch (error) {
      if (isAxiosError(error)) console.log(error.response.data);
    }
  };

  const [selectedIndex, setSelectedIndex] = useState(null);

  return (
    <View style={{flex: 1}}>
      <Background />
      <Gap height={StatusBar.currentHeight} />

      {/* header signout, username, profile */}
      <HeaderHome onPressLogOut={logout} textUserName={username} />

      {/* line Diagonal atas */}
      <View style={{...styles.viewLineDiagonal, marginTop: 5}} />

      {/* flatlist */}
      <FlatList
        refreshing={loading}
        onRefresh={getTodos}
        ListEmptyComponent={
          <Text style={styles.textEmptyComponent}>Tidak Ada tugas</Text>
        }
        data={todos}
        keyExtractor={item => item._id}
        renderItem={({item, index}) => {
          return (
            <RenderTask
              item={item}
              onCheckList={() => {
                checkistTask(item);
              }}
              onPressDetail={() => {
                LayoutAnimation.easeInEaseOut();
                setSelectedIndex(selectedIndex == index ? null : index);
              }}
              index={index}
              selectedIndex={selectedIndex}
              onPressDelete={() => {
                confirmDelete(item._id);
              }}
              onPressEdit={() => {
                setModalVisible(true);
                setEditedTodos(item);
              }}
            />
          );
        }}
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
      <ModalTambah
        visible={modalVisibleAdd}
        closeModalAdd={closeModalAdd}
        formTitle={tugas}
        onChangeTitle={tugas => {
          setTugas(tugas);
        }}
        formDesc={deskripsi}
        onChangeDesc={deskripsi => {
          setDeskripsi(deskripsi);
        }}
        onPressSubmit={addTodo}
        loadingAdd={loadingAdd}
      />

      {/* modal edit tugas */}
      <ModalEdit
        visible={modalVisible}
        closeModal={closeModal}
        editedTodos={editedTodos}
        loadingEdit={loadingEdit}
        onChangeTitle={title => setEditedTodos({...editedTodos, title})}
        onChangeDesc={desc => setEditedTodos({...editedTodos, desc})}
        onPressEdit={() => updateTask()}
      />
    </View>
  );
}
