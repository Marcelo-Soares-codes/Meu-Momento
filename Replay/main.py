import cv2
import time
from collections import deque
import threading
import os

# Inicializar a webcam
cap = cv2.VideoCapture(0)

# Definir o codec e criar um objeto VideoWriter
fourcc = cv2.VideoWriter_fourcc(*'VP80')  # Usando o codec VP8

# Definir o FPS desejado
desired_fps = 28  # Altere conforme necessário

# Diretório para salvar os vídeos
output_directory = "records"

# Criar o diretório se não existir
if not os.path.exists(output_directory):
    os.makedirs(output_directory)

# Inicializa o tempo de início e o número de frames lidos
start_time = time.time()
frame_count = 0

saved = 0
lastFrames = deque(maxlen=560)

# Semáforo para controlar o número máximo de threads
max_threads = threading.Semaphore(5)  # Defina o número máximo de threads desejado

def save_video(frames):
    global saved
    prefix = f"{output_directory}/replay_{saved}"
    out = cv2.VideoWriter(f'{prefix}.mkv', fourcc, desired_fps, (640, 480))  # Usar formato MKV
    
    for savedFrame in frames:
        out.write(savedFrame)

    out.release()
    saved += 1

def SaveVideoAsync(frames):
    max_threads.acquire()  # Adquire um slot para executar a função
    thread = threading.Thread(target=save_video, args=(frames,))
    thread.start()

    max_threads.release()  # Libera um slot para uma nova thread

# Loop para capturar frames da webcam e gravá-los
while True:
    ret, frame = cap.read()
    if ret:
        frame_count += 1  # Incrementa o contador de frames

        lastFrames.append(frame)

        elapsed_time = time.time() - start_time

        # Calcular a taxa de frames por segundo (FPS)
        fps = frame_count / elapsed_time

        cv2.putText(frame, f'{round(elapsed_time, 2)}s', (40, 40), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2, cv2.LINE_AA)
        # Exibir o frame na janela
        cv2.imshow('frame', frame)

        if len(lastFrames) > 0 and cv2.waitKey(1) & 0xFF == ord('e'):
            print("Sucesso!")
            SaveVideoAsync(lastFrames.copy())
        
        # Condição para sair do loop (pressione 'q' para sair)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    else:
        break

# Imprime a taxa de frames por segundo (FPS)
print("Taxa de frames por segundo (FPS):", fps)

# Liberar os recursos
cap.release()
cv2.destroyAllWindows()