from deepface import DeepFace
import cv2
import threading
import base64
import numpy as np
from pymongo import MongoClient
import unidecode
from .db import get_passageiro_collection, get_passenger_photos

# Função para converter base64 para uma imagem OpenCV
def base64_para_imagem(base64_string):
    img_data = base64.b64decode(base64_string)
    np_img = np.frombuffer(img_data, np.uint8)
    return cv2.imdecode(np_img, cv2.IMREAD_COLOR)

# Captura de vídeo
video_capture = cv2.VideoCapture(0)
video_capture.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
video_capture.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

counter = 0
face_match = False
nome_passageiro = None
imagem_passageiro = None 

# Carregar todas as imagens de referência do banco
fotos_base64 = get_passenger_photos()
imagens_referencia = [(base64_para_imagem(foto["foto_base64"]), foto["nome"]) for foto in fotos_base64]


imagem_erro = cv2.imread("./backend/images/erro-reconhecimento.png")

# Inicializar o classificador de rosto do OpenCV
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

def check_face(frame):
    global face_match, nome_passageiro, imagem_passageiro
    try:
        # Verifica o frame com cada imagem de referência do banco
        for reference_img, nome in imagens_referencia:
            result = DeepFace.verify(frame, reference_img, model_name="VGG-Face")
            if result['verified']:
                face_match = True
                nome_passageiro = nome
                imagem_passageiro = reference_img 
                return
        # Rosto não identificado
        face_match = False
        nome_passageiro = None
        imagem_passageiro = imagem_erro 
    except Exception as e:
        print(f"Erro ao verificar o rosto: {e}")
        face_match = False
        imagem_passageiro = imagem_erro

while True:
    ret, frame = video_capture.read()

    if ret:
        frame = cv2.resize(frame, (640, 480))
        
        # Detecta rostos no frame
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))
        for (x, y, w, h) in faces:
            cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 255, 255), 2)
        
        # Realiza a verificação a cada 30 frames
        if counter % 30 == 0:
            try:
                threading.Thread(target=check_face, args=(frame,)).start()
            except Exception as e:
                print(f"Erro ao iniciar a thread: {e}")
        counter += 1

        # Interface 
        overlay = frame.copy()
        overlay_height = 100
        overlay_padding = 20
        if face_match:
            fundo_cor = (175, 39, 16) 
            texto = f"Autenticado: {unidecode.unidecode(nome_passageiro)}"
        else:
            fundo_cor = (0, 0, 255) 
            texto = unidecode.unidecode("Rosto desconhecido")
            cv2.imwrite('./backend/rostosDesconhecidos/rostoDesconhecido.jpg', frame)

        gradient = np.zeros((overlay_height, frame.shape[1], 3), dtype=np.uint8)
        for i in range(overlay_height):
            alpha = 1 - ((i / overlay_height) ** 5) 
            alpha = max(alpha, 0) 
            gradient[overlay_height - i - 1, :, :] = np.array(fundo_cor) * alpha



        frame[-overlay_height:, :] = cv2.addWeighted(frame[-overlay_height:, :], 1, gradient, 0.7, 0)

        text_size = cv2.getTextSize(texto, cv2.FONT_HERSHEY_SIMPLEX, 1, 2)[0]
        text_x = 60 + overlay_padding + 20
        text_y = frame.shape[0] - (overlay_height // 2) + (text_size[1] // 2)
        cv2.putText(frame, texto, (text_x, text_y), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2)

        if imagem_passageiro is not None:
            if face_match:
                img_width = 50
                img_height = int(img_width * (16 / 9))
            else:
                img_width = img_height = 50
            img_mini = cv2.resize(imagem_passageiro, (img_width, img_height))
            img_x = overlay_padding
            img_y = frame.shape[0] - overlay_height + ((overlay_height - img_height) // 2)
            frame[img_y:img_y + img_height, img_x:img_x + img_width] = img_mini

        # Exibe o frame
        cv2.imshow("video", frame)

    key = cv2.waitKey(1)
    if key == ord("q"):
        break

video_capture.release()
cv2.destroyAllWindows()
