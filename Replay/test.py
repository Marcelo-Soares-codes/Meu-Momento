import time

# essa execulta a de analisar o sinal de um semaforo
def signal (num):
    if num == 0:
        return "Vermelho"
    elif num == 1:
        return "Amarelo"
    else:
        return "Verde"

# essa execulta a de mostrar o sinal de um semaforo
def mostrar(arg):
    print(arg)

num = 0
while True:
    cor = signal(num)
    mostrar(cor)

    # tempo de espera
    time.sleep(3)

    # mudando o sinal
    num += 1
    if num >= 3:
        num = 0
