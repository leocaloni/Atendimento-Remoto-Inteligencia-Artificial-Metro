import { CameraView, CameraType, useCameraPermissions, FlashMode, CameraCapturedPicture } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image, Modal } from 'react-native';

export default function Camera() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [flash, setFlash] = useState<FlashMode>('on');
  const [capturedPhoto, setCapturedPhoto] = useState<CameraCapturedPicture | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const camRef = useRef<CameraView | null>(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  function toggleFlashMode() {
    setFlash(current => {
      if (current === 'on') return 'off';
      if (current === 'off') return 'auto';
      return 'on';
    });
  }

  async function takePicture() {
    if (camRef.current) {
      const photo = await camRef.current.takePictureAsync({ base64: true });
      if (photo) {
        setCapturedPhoto(photo);
        setIsModalVisible(true);
      }
    }
  }

  function closeModal() {
    setIsModalVisible(false);
    setCapturedPhoto(null);
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={camRef}
        style={styles.camera}
        flash={flash}
        facing={facing}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={toggleFlashMode}>
            <Text style={styles.text}>Flash Mode</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.text}>Take Picture</Text>
          </TouchableOpacity>
        </View>
      </CameraView>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {capturedPhoto && (
              <Image source={{ uri: capturedPhoto.uri }} style={styles.capturedImage} />
            )}
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Sair</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  capturedImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
