import { CameraView, CameraType, useCameraPermissions, FlashMode, CameraCapturedPicture,} from 'expo-camera';
import {  useState, useRef, useEffect  } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import axios from 'axios';


export default function Camera() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [flash, setFlash] = useState<FlashMode>('on');
  const [capturedPhoto, setCapturedPhoto] = useState<CameraCapturedPicture | null>(null);
  //const [picture, takePictureAsync] = useState()
  const camRef = useRef<CameraView | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  function toggleFlashMode() {
    setFlash((current) => {
      if (current === 'on') return 'off';
      if (current === 'off') return 'auto';
      return 'on';
    });
  }

  
  async function takePicture(){
    const foto = await camRef.current?.takePictureAsync({base64:true});
    if (foto) {
      setCapturedPhoto(foto);
      await sendString(foto);
    }
  }

  async function sendString(foto: CameraCapturedPicture) {
    setIsLoading(true);
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} flash={flash} facing={facing}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleFlashMode}>
            <Text style={styles.text}>ligar flash</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => takePicture()}>
            <Text style={styles.text}>Take Picture</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
      {capturedPhoto && (
        <Image source={ capturedPhoto } style={styles.capturedImage} />
      )}
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
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  capturedImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
