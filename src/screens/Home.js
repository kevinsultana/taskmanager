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
  TextInput,
  TouchableNativeFeedback,
} from 'react-native';
import {Background, Gap} from '../component';
import {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/MaterialIcons';
import Collapsible from 'react-native-collapsible';
import CheckBox from '@react-native-community/checkbox';

const DATA = [
  {
    id: '1',
    title: 'Tugas Satu',
    content: 'Deskripsi tugas satu yang sangat panjang sekali',
    checked: false,
  },
  {
    id: '2',
    title: 'Tugas Dua',
    content: 'Deskripsi tugas dua yang sangat panjang sekali',
    checked: false,
  },
  {
    id: '3',
    title: 'Tugas Tiga',
    content: 'Deskripsi tugas tiga yang sangat panjang sekali',
    checked: false,
  },
  {
    id: '4',
    title: 'Tugas Empat',
    content: 'Deskripsi tugas empat yang sangat panjang sekali',
    checked: false,
  },
];

export default function Home({navigation}) {
  const [collapsed, setCollapsed] = useState({});
  const [checked, setChecked] = useState({});

  const [modalVisible, setModalVisible] = useState(false);
  const closeModal = () => setModalVisible(false);
  const openModal = () => setModalVisible(true);

  const [modalVisibleAdd, setModalVisibleAdd] = useState(false);
  const closeModalAdd = () => setModalVisibleAdd(false);
  const openModalAdd = () => setModalVisibleAdd(true);

  const toggleCollapse = id => {
    setCollapsed(prevState => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const [tugas, setTugas] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [editTugas, setEditTugas] = useState('');
  const [editDeskripsi, setEditDeskripsi] = useState('');

  const maxLength = 255;

  const handleTugasChange = input => {
    if (input.length <= maxLength) {
      setTugas(input);
    }
  };
  const handleDeskripsiChange = input => {
    if (input.length <= maxLength) {
      setDeskripsi(input);
    }
  };
  const handleEditTugasChange = input => {
    if (input.length <= maxLength) {
      setEditTugas(input);
    }
  };
  const handleEditDeskripsiChange = input => {
    if (input.length <= maxLength) {
      setEditDeskripsi(input);
    }
  };
  const renderItem = ({item}) => (
    <View>
      <View style={styles.viewRenderHeader}>
        <CheckBox value={false} tintColors={{true: 'white', false: 'white'}} />
        <View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.textRenderHeader}>{item.title}</Text>
            <Gap width={20} />
            <TouchableOpacity>
              <Icon
                name={'chevron-down'}
                color={'white'}
                size={35}
                onPress={() => toggleCollapse(item.id)}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View>
        <Collapsible collapsed={!collapsed[item.id]}>
          <Text style={styles.textRenderDesc}>{item.content}</Text>
          <Gap height={30} />
          <View style={styles.viewEditHapus}>
            <View style={styles.viewBtnHapus}>
              <TouchableOpacity>
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

  return (
    <View style={{flex: 1}}>
      <Background />
      <StatusBar backgroundColor={'#a1a1a1'} />

      {/* header signout, username, profile */}
      <View style={styles.header}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => navigation.replace('Login')}>
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
            <Text style={{color: 'white', fontSize: 22}}>Username</Text>
          </View>
        </View>
        <Icon name={'account-circle-outline'} size={50} color={'white'} />
      </View>
      <View style={{...styles.viewLineDiagonal, marginTop: 5}} />

      {/* flatlist */}

      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
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
            <Gap height={20} />
            <View style={styles.textInput}>
              <Icons name="post-add" size={20} color="black" />
              <TextInput
                placeholder="Tambah Tugas"
                placeholderTextColor="grey"
                value={tugas}
                onChangeText={handleTugasChange}
              />
            </View>
            <Text
              style={{
                color: 'white',
                alignSelf: 'flex-end',
                right: 15,
                fontSize: 12,
              }}>
              {tugas.length} / {maxLength}
            </Text>
            <Gap height={30} />
            <View style={styles.textInput}>
              <Icons name="post-add" size={20} color="black" />
              <TextInput
                placeholder="Tambah Deskripsi"
                placeholderTextColor="grey"
                value={deskripsi}
                onChangeText={handleDeskripsiChange}
              />
            </View>
            <Text style={styles.textCounter}>
              {deskripsi.length} / {maxLength}
            </Text>
            <Gap height={20} />
            <TouchableNativeFeedback useForeground>
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
            <View style={styles.textInput}>
              <TextInput
                placeholder="Edit Tugas"
                placeholderTextColor="grey"
                value={editTugas}
                onChangeText={setEditTugas}
              />
            </View>
            <Text style={styles.textCounter}>
              {editTugas.length}/{maxLength}
            </Text>
            <Gap height={30} />
            <View style={styles.textInput}>
              <TextInput
                placeholder="Edit deskripsi"
                placeholderTextColor="grey"
                value={editDeskripsi}
                onChangeText={setEditDeskripsi}
              />
            </View>
            <Text style={styles.textCounter}>
              {editDeskripsi.length}/{maxLength}
            </Text>
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
