import requests

def enviar_video_para_arena(titulo, identificador, arquivo_de_video, token):
    url = "http://www.localhost:5000/arena/add-video"
    dados = {"title": titulo, "id": identificador}
    arquivos = {"file": arquivo_de_video}
    headers = {"Authorization": f"Bearer {token}"}  # Adicionando o token ao cabeçalho

    try:
        resposta = requests.post(url, data=dados, files=arquivos, headers=headers)
        resposta.raise_for_status()
        print("Vídeo enviado com sucesso!")
        print(resposta.json())  # Mostra a resposta do servidor, se houver
    except requests.exceptions.RequestException as e:
        print("Erro ao enviar o vídeo:")
        print(e)

# Exemplo de uso
titulo_do_video = "Meu Vídeo"
identificador_da_arena = "729eefa9-c6af-4085-aa94-2b258cbbdd05"
arquivo_do_video = open("Replay/records/replay_0.mkv", "rb")
print(arquivo_do_video)
token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcyOWVlZmE5LWM2YWYtNDA4NS1hYTk0LTJiMjU4Y2JiZGQwNSIsImlhdCI6MTcxMzI5NDUzN30.xx8tDEFXodwhAA5-AaaMKmTmZUczPwwDrzjwUeJ1T6w"  # Substitua pelo seu token de autenticação

enviar_video_para_arena(titulo_do_video, identificador_da_arena, arquivo_do_video, token)
arquivo_do_video.close()
