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
import {Gap} from '../component';
import {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Collapsible from 'react-native-collapsible';
import * as Animatable from 'react-native-animatable';
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
        <Animatable.View animation="fadeIn" duration={500}></Animatable.View>
        <Collapsible collapsed={!collapsed[item.id]}>
          <Animatable.View animation="fadeIn" duration={500}>
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
          </Animatable.View>
        </Collapsible>
      </View>

      {/* view line border */}
      <View style={styles.viewLineBorder} />
    </View>
  );

  return (
    <ImageBackground
      source={require('../assets/background.jpg')}
      style={{flex: 1}}>
      <View>
        <StatusBar backgroundColor={'#a1a1a1'} />

        {/* header signout, username, profile */}
        <View style={styles.header}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => navigation.replace('Login')}>
              <Icon
                name={'exit-to-app'}
                size={60}
                color={'white'}
                style={{transform: [{rotate: '180deg'}]}}
              />
            </TouchableOpacity>
            <Gap width={10} />
            <View>
              <Text style={{color: 'white', fontSize: 18}}>Hi,</Text>
              <Text style={{color: 'white', fontSize: 26}}>Username</Text>
            </View>
          </View>
          <View>
            <Icon name={'account-circle-outline'} size={50} color={'white'} />
          </View>
        </View>
        <View style={styles.viewLineDiagonal} />

        {/* flatlist */}
        <View>
          <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            // ListFooterComponent={<Gap height={200} />}
          />
        </View>
      </View>

      {/* tombol tambah tugas */}
      <View>
        <View style={styles.viewLocBtnAddTugas}>
          <View style={styles.viewBtnAddTugas}>
            <TouchableOpacity onPress={openModalAdd}>
              <View style={{flexDirection: 'row'}}>
                <Icon name={'plus-thick'} color={'white'} size={20} />
                <Gap width={3} />
                <Text style={styles.textAddTugas}>Tambah Tugas</Text>
              </View>
            </TouchableOpacity>
          </View>
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
            <TextInput
              placeholder="Tambah Tugas"
              placeholderTextColor="grey"
              style={styles.textInput}
            />
            <Gap height={30} />
            <TextInput
              placeholder="Tambah deskripsi"
              placeholderTextColor="grey"
              style={styles.textInput}
            />
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
            <TextInput
              placeholder="Edit Tugas"
              placeholderTextColor="grey"
              style={styles.textInput}
            />
            <Gap height={30} />
            <TextInput
              placeholder="Edit deskripsi"
              placeholderTextColor="grey"
              style={styles.textInput}
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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  viewLineBorder: {
    alignSelf: 'center',
    width: '90%',
    height: 1,
    backgroundColor: 'white',
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
    alignSelf: 'center',
    borderRadius: 40 / 2,
    paddingHorizontal: 10,
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
  },
  viewBtnAddTugas: {
    width: 150,
    height: 40,
    borderRadius: 40 / 2,
    backgroundColor: '#00677E',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'baseline',
  },
  viewLineDiagonal: {
    alignSelf: 'center',
    width: '80%',
    height: 1,
    backgroundColor: 'white',
    marginVertical: 10,
    transform: [{rotate: '175deg'}],
  },
  header: {
    margin: 30,
    flexDirection: 'row',
    maxWidth: 350,
    justifyContent: 'space-between',
  },
});
