import { FC } from 'react';
import { Modal, View, ActivityIndicator, StyleSheet } from 'react-native';

interface SpinnerModalProps {
  visible: boolean;
}

const SpinnerModal: FC<SpinnerModalProps> = ({ visible }) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
    >
      <View style={styles.modalBackground}>
        <View style={styles.spinnerContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  spinnerContainer: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
});

export default SpinnerModal;