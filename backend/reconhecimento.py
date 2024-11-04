import cv2
import face_recognition as fr
import numpy as np
from models.passageiro import obter_codificacoes_faces, fs
from unidecode import unidecode
import time

def reconhece_face():
    url_img_erro = "./backend/images/erro.png"
    codificacoes_passageiros = obter_codificacoes_faces()
    img_erro = cv2.imread(url_img_erro)
    img_erro = cv2.resize(img_erro, (100, 70))
    video_capture = cv2.VideoCapture(0)
    video_capture.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
    video_capture.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)
    video_capture.set(cv2.CAP_PROP_FPS, 30)
    
    recognized_name = "Não reconhecido"
    overlay_color = (0, 0, 255)
    img_to_show = img_erro
    show_until = 0
    process_frame = 0  # Contador para limitar a frequência de processamento

    try:
        while True:
            ret, frame = video_capture.read()
            if not ret:
                print("Falha ao ler frame")
                break

            # Processa apenas a cada 20 frames para reduzir o uso de CPU
            if process_frame % 20 == 0:
                rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                face_locations = fr.face_locations(rgb_frame, model='hog')
                face_encodings = fr.face_encodings(rgb_frame, face_locations)

                if face_encodings:
                    face_encoding = face_encodings[0]
                    (top, right, bottom, left) = face_locations[0]

                    recognized_name = "Não reconhecido"
                    overlay_color = (0, 0, 255)
                    img_to_show = img_erro
                    show_until = time.time() + 2

                    for passageiro, encoding in codificacoes_passageiros:
                        match = fr.compare_faces([encoding], face_encoding)

                        if match[0]:
                            foto_binaria = fs.get(passageiro['foto_id']).read()
                            imagem_autenticada = cv2.imdecode(np.frombuffer(foto_binaria, np.uint8), cv2.IMREAD_COLOR)
                            img_to_show = cv2.resize(imagem_autenticada, (100, 70))
                            recognized_name = f"Autenticado: {unidecode(passageiro['nome'])}"
                            overlay_color = (0, 255, 0)
                            break

            # Exibe o retângulo e o overlay enquanto o tempo de exibição não expirar
            if time.time() < show_until:
                cv2.rectangle(frame, (left, top), (right, bottom), (0, 255, 0), 2)
                overlay = frame.copy()
                alpha = 0.6
                overlay_height = 80
                cv2.rectangle(overlay, (0, frame.shape[0] - overlay_height), (frame.shape[1], frame.shape[0]), overlay_color, -1)
                frame = cv2.addWeighted(overlay, alpha, frame, 1 - alpha, 0)
                
                # Colocar a imagem do passageiro ou imagem de erro
                img_y = frame.shape[0] - overlay_height + 5
                frame[img_y:img_y + 70, 10:110] = img_to_show
                (text_width, text_height), _ = cv2.getTextSize(recognized_name, cv2.FONT_HERSHEY_SIMPLEX, 1, 2)
                text_y = img_y + (70 // 2) + (text_height // 2)
                text_position = (120, text_y)
                cv2.putText(frame, recognized_name, text_position, cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2)

            process_frame += 1

            # Exibe o frame da webcam
            cv2.imshow("Webcam", frame)

            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

    except Exception as e:
        print("Erro durante o reconhecimento facial:", e)

    finally:
        video_capture.release()
        cv2.destroyAllWindows()

if __name__ == "__main__":
    reconhece_face()
