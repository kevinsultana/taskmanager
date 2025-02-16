import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Gap from '../gap';
import FormInput from '../FormInput';
import {ActivityIndicator} from 'react-native-paper';

export default function ModalTambah({
  visible,
  closeModalAdd,
  formTitle,
  onChangeTitle,
  formDesc,
  onChangeDesc,
  onPressSubmit,
  loadingAdd,
}) {
  return (
    <Modal
      transparent
      visible={visible}
      onRequestClose={closeModalAdd}
      animationType="fade">
      <View style={styles.viewModal}>
        <Pressable style={styles.modalBackdrop} onPress={closeModalAdd} />
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
            value={formTitle}
            titleShow={false}
            iconName="post"
            placeholder="Tambah Tugas"
            autoCapitalize={'sentences'}
            onChangeText={onChangeTitle}
            counter={{
              show: true,
              value: formTitle,
              valueMaximum: 255,
              valueMinimum: 3,
            }}
          />

          <Gap height={20} />

          <FormInput
            value={formDesc}
            titleShow={false}
            iconName="post"
            placeholder="Tambah Deskripsi"
            autoCapitalize={'sentences'}
            onChangeText={onChangeDesc}
            counter={{
              show: true,
              value: formDesc,
              valueMaximum: 255,
              valueMinimum: 25,
            }}
          />

          <Gap height={20} />

          <TouchableNativeFeedback useForeground onPress={onPressSubmit}>
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
  );
}

const styles = StyleSheet.create({
  textModalHeader: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
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
  modalBackdrop: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'black',
    opacity: 0.1,
  },
  viewModal: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    maxWidth: 480,
    alignSelf: 'center',
    width: '100%',
  },
});
