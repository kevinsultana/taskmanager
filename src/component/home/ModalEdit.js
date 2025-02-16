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

export default function ModalEdit({
  visible,
  closeModal,
  editedTodos,
  loadingEdit,
  onChangeTitle,
  onChangeDesc,
  onPressEdit,
}) {
  return (
    <Modal
      transparent
      visible={visible}
      onRequestClose={closeModal}
      animationType="fade">
      <View style={styles.viewModal}>
        <Pressable style={styles.modalBackdrop} onPress={closeModal} />
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
            onChangeText={onChangeTitle}
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
            onChangeText={onChangeDesc}
            counter={{
              show: true,
              value: editedTodos.desc,
              valueMaximum: 255,
              valueMinimum: 25,
            }}
          />

          <Gap height={20} />

          <TouchableNativeFeedback useForeground onPress={onPressEdit}>
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
  );
}

const styles = StyleSheet.create({
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
  modalBackdrop: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'black',
    opacity: 0.1,
  },
});
