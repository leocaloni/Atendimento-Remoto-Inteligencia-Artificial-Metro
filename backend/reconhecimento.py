import cv2
import face_recognition as fr
import numpy as np
from models.passageiro import obter_codificacoes_faces, fs
from models.passageiro import Passageiro
from unidecode import unidecode

def reconhece_face():
    url_img_erro = "./backend/images/erro.png"

    # Obter codificações faciais do banco de dados
    codificacoes_passageiros = obter_codificacoes_faces()

    # Carrega a imagem de erro
    img_erro = cv2.imread(url_img_erro)
    img_erro = cv2.resize(img_erro, (100, 70))

    # Captura de vídeo com a webcam
    video_capture = cv2.VideoCapture(0)
    video_capture.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
    video_capture.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)
    video_capture.set(cv2.CAP_PROP_FPS, 30)

    while True:
        ret, frame = video_capture.read()
        if not ret:
            print("Falha ao ler frame")
            break

        # Converte o frame para RGB
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

        # Localiza e codifica faces no frame da webcam
        face_locations = fr.face_locations(rgb_frame, model='hog')
        face_encodings = fr.face_encodings(rgb_frame, face_locations)

        if face_encodings:
            face_encoding = face_encodings[0]
            (top, right, bottom, left) = face_locations[0]

            img_to_show = img_erro
            text = unidecode("Não reconhecido")
            background_color = (0, 0, 255)

            # Compara com codificações no banco de dados
            for passageiro, encoding in codificacoes_passageiros:
                match = fr.compare_faces([encoding], face_encoding)

                if match[0]:
                    foto_binaria = fs.get(passageiro['foto_id']).read()
                    imagem_autenticada = cv2.imdecode(np.frombuffer(foto_binaria, np.uint8), cv2.IMREAD_COLOR)
                    img_to_show = cv2.resize(imagem_autenticada, (100, 70))
                    text = f"Autenticado: {unidecode(passageiro['nome'])}"
                    background_color = (0, 255, 0)
                    break

            # Interface de reconhecimento com retângulo e sobreposição de dados
            cv2.rectangle(frame, (left, top), (right, bottom), (0, 255, 0), 2)
            overlay = frame.copy()
            alpha = 0.6
            overlay_height = 80
            cv2.rectangle(overlay, (0, frame.shape[0] - overlay_height), (frame.shape[1], frame.shape[0]), background_color, -1)
            frame = cv2.addWeighted(overlay, alpha, frame, 1 - alpha, 0)
            img_y = frame.shape[0] - overlay_height + 5  
            frame[img_y:img_y + 70, 10:110] = img_to_show  
            (text_width, text_height), _ = cv2.getTextSize(text, cv2.FONT_HERSHEY_SIMPLEX, 1, 2)
            text_y = img_y + (70 // 2) + (text_height // 2)
            text_position = (120, text_y)
            cv2.putText(frame, text, text_position, cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2)

        # Exibe o frame da webcam
        cv2.imshow("Webcam", frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    video_capture.release()
    cv2.destroyAllWindows()

# Chama a função para iniciar o reconhecimento facial
if __name__ == "__main__":
    reconhece_face()
