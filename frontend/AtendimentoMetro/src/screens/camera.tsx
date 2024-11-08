import { CameraView, CameraType, useCameraPermissions, FlashMode, CameraCapturedPicture } from 'expo-camera';
import { useState, useRef, useEffect } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image, Modal } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { usePhoto } from './PhotoContext';


type RootStackParamList = {
  Login: undefined;
  Cadastro: undefined;
  Camera: undefined;
};

type CameraScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Camera'
>;

interface CameraProps {
  navigation: CameraScreenNavigationProp;
}

export default function Camera({navigation}:CameraProps) {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [flash, setFlash] = useState<FlashMode>('on');
  const [capturedPhoto, setCapturedPhoto] = useState<CameraCapturedPicture | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const camRef = useRef<CameraView | null>(null);
  const { setCapturedPhoto: updateCapturedPhoto } = usePhoto();

  useEffect(() => {
    if (capturedPhoto) {
      console.log("Foto capturada armazenada:", capturedPhoto);
    } else {
      console.log("Nenhuma foto capturada");
    }
  }, [capturedPhoto]);

  useNavigation<StackNavigationProp<RootStackParamList, 'Camera'>>();

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
    console.log("takePicture function called");
    if (camRef.current) {
      try {
        const photo = await camRef.current.takePictureAsync({ base64: true }); // Adiciona base64
        console.log("Photo captured:", photo);
  
        if (photo && photo.uri) {
          setCapturedPhoto(photo); // Armazena no estado local
          updateCapturedPhoto(photo); // Atualiza no contexto global
          setIsModalVisible(true); // Abre o modal
        } else {
          console.log("Erro: photo.uri não encontrado");
        }
      } catch (error) {
        console.log("Erro ao capturar foto:", error);
      }
    } else {
      console.log("Câmera não está pronta");
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
      {capturedPhoto && capturedPhoto.uri ? (
        <Image source={{ uri: capturedPhoto.uri }} style={styles.capturedImage} />
      ) : (
        <Text>Sem foto capturada</Text>
      )}
      <View style={{ flexDirection: "row", alignSelf: 'center', justifyContent: 'center' }}>
        <TouchableOpacity style={[styles.closeButton, { right: 5 }]} onPress={closeModal}>
          <Text style={styles.closeButtonText}>Sair</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.closeButton, { left: 5, backgroundColor: "#1027AF" }]} onPress={() => navigation.navigate('Cadastro')}>
          <Text style={styles.closeButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
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
