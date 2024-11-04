from deepface import DeepFace
import cv2
import threading
import base64
import numpy as np
from pymongo import MongoClient
import unidecode

# Conexão com o MongoDB
connection_string = "mongodb://localhost:27017"
client = MongoClient(connection_string)
db_connection = client["testeBanco"]
passageiro_collection = db_connection.get_collection("testeCollection")

# Busca fotos no banco
def buscar_fotos_do_banco():
    try:
        passageiros = passageiro_collection.find({}, {"nome": 1, "foto_base64": 1})
        fotos_base64 = [{"nome": passageiro["nome"], "foto_base64": passageiro["foto_base64"]} 
                        for passageiro in passageiros if "foto_base64" in passageiro]
        return fotos_base64
    except Exception as e:
        print(f"Erro ao buscar fotos do banco: {e}")
        return []

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
imagem_passageiro = None  # Imagem da pessoa autenticada ou de erro

# Carregar todas as imagens de referência do banco
fotos_base64 = buscar_fotos_do_banco()
imagens_referencia = [(base64_para_imagem(foto["foto_base64"]), foto["nome"]) for foto in fotos_base64]

# Imagem de erro
imagem_erro = cv2.imread("./backend/images/erro.png")

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
                imagem_passageiro = reference_img  # Armazena a imagem do passageiro autenticado
                return
        # Se nenhuma correspondência for encontrada
        face_match = False
        nome_passageiro = None
        imagem_passageiro = imagem_erro  # Mostra a imagem de erro
    except Exception as e:
        print(f"Erro na verificação de rosto: {e}")
        face_match = False
        imagem_passageiro = imagem_erro

while True:
    ret, frame = video_capture.read()

    if ret:
        # Redimensiona o frame para corresponder à resolução desejada
        frame = cv2.resize(frame, (640, 480))
        
        # Detecta rostos no frame
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))
        
        # Desenha retângulos ao redor dos rostos detectados
        for (x, y, w, h) in faces:
            cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
        
        # Realiza a verificação a cada 30 frames
        if counter % 30 == 0:
            try:
                threading.Thread(target=check_face, args=(frame,)).start()
            except Exception as e:
                print(f"Erro ao iniciar a thread: {e}")
        counter += 1

        # Exibe a mensagem de autenticação e a imagem no canto inferior esquerdo
        overlay = frame.copy()
        if face_match:
            # Fundo verde com texto "Autenticado" e o nome do passageiro
            cv2.rectangle(overlay, (0, frame.shape[0] - 50), (frame.shape[1], frame.shape[0]), (0, 255, 0), -1)
            texto = f"Autenticado: {unidecode.unidecode(nome_passageiro)}"
        else:
            # Fundo vermelho com texto "Rosto não reconhecido"
            cv2.rectangle(overlay, (0, frame.shape[0] - 50), (frame.shape[1], frame.shape[0]), (0, 0, 255), -1)
            texto = "Rosto nao reconhecido"

        # Adiciona o overlay com transparência no fundo
        alpha = 0.6
        cv2.addWeighted(overlay, alpha, frame, 1 - alpha, 0, frame)
        
        # Adiciona o texto com opacidade total
        cv2.putText(frame, texto, (60, frame.shape[0] - 15),
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2)

        # Adiciona a imagem da pessoa autenticada ou de erro no canto inferior esquerdo
        if imagem_passageiro is not None:
            img_mini = cv2.resize(imagem_passageiro, (50, 50))
            frame[frame.shape[0] - 50:frame.shape[0], 0:50] = img_mini

        # Exibe o frame
        cv2.imshow("video", frame)

    key = cv2.waitKey(1)
    if key == ord("q"):
        break

video_capture.release()
cv2.destroyAllWindows()
