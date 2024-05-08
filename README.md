# Meu Momento

## Sobre o Projeto

Meu Momento é um aplicativo desenvolvido para gravar replays em quadra durante atividades esportivas, permitindo aos jogadores revisitar momentos específicos do jogo posteriormente. Este documento fornece uma visão geral do projeto, suas funcionalidades e as tecnologias utilizadas tanto no front-end quanto no back-end.

### Tela Inicial

![Tela Inicial](/assets/img-home.png/)

Esta imagem mostra a tela inicial do aplicativo "Meu Momento", onde os usuários podem acessar diversas funcionalidades, como a visualização de vídeos gravados em quadra.

### Página de Arenas

![Página de Arenas](/assets//img-arenas.png)

Nesta imagem, temos a página de arenas do aplicativo, onde os usuários podem escolher a arena que deseja ver os replay. A página exibe uma lista de arenas disponíveis com informações relevantes. (As arenas mostradas na imagem são apenas fictícias para a demonstração)

### Lista de Vídeos

![Lista de Vídeos](/assets/img-videos-list.png)

Aqui vemos a lista de vídeos gravados pelos usuários. Cada item da lista representa um replay gravado no qual quando clicado redireciona para a pagina de visualização do videos.

## Funcionalidades

- **Gravação de Replay em Quadra:** Os jogadores podem pressionar um botão em campo para gravar os últimos 20 segundos da partida.
- **Visualização no Site:** Os replays gravados são salvos no site, onde os usuários podem acessá-los posteriormente para revisão e análise.

## Tecnologias Utilizadas

### Front-end

- **React:** Uma biblioteca JavaScript para construção de interfaces de usuário.
- **React Router DOM:** Para navegação entre diferentes componentes React.
- **Axios:** Uma biblioteca para fazer requisições HTTP.
- **FontAwesome:** Fornece ícones vetoriais escaláveis que podem ser personalizados.
- **Image-compressor.js:** Utilizado para compressão de imagens.
- **JS Cookie:** Biblioteca para manipulação de cookies em JavaScript.
- **Vite:** Um bundler de próxima geração para projetos JavaScript e TypeScript.
- **TypeScript:** Uma linguagem de programação de código aberto mantida pela Microsoft.
- **ESLint e Prettier:** Ferramentas para manter um código JavaScript limpo e consistente.
- **Tailwind CSS:** Um framework CSS utilitário de baixo nível.

### Back-end

- **Node.js e Express:** Para criar a API do servidor.
- **Prisma:** Uma ferramenta ORM (Object-Relational Mapping) para Node.js e TypeScript.
- **Multer:** Middleware Node.js para manipulação de formulários multipartes (multipart/form-data).
- **Bcrypt:** Uma biblioteca para hashing de senhas.
- **JSON Web Token (jsonwebtoken):** Para autenticação de usuários através de tokens.
- **Dotenv:** Utilizado para carregar variáveis de ambiente a partir de um arquivo .env.
- **Nodemailer e nodemailer-mailgun-transport:** Para envio de e-mails através do Mailgun.
- **Yup:** Utilizado para validação de esquema de objetos JavaScript.
- **Cors:** Um middleware que pode ser usado para habilitar o acesso de recursos de origens diferentes.

## Executando o Projeto

Para executar o projeto localmente, siga as instruções abaixo:

### Front-end:

```bash
cd front-end
npm install
npm run dev
```

### Back-end:

```bash
cd back-end
npm install
npm run dev
```

## Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir problemas (issues) e enviar pull requests para melhorar este projeto.

## Autor

- **Marcelo Soares** - [GitHub](https://github.com/Marcelo-Soares-codes)

## Licença

```
Licença de Uso Não-Comercial - Versão 1.0

Este é um contrato legal entre você e o(s) autor(es) deste projeto. Ao utilizar este projeto, você concorda com os termos e condições desta licença.

Permissões:
1. É concedida permissão para utilizar, copiar e distribuir este software para fins de estudo porem não-comerciais.
2. É permitido modificar o software para atender às suas necessidades.

Restrições:
1. Este software não pode ser utilizado para fins comerciais, incluindo, mas não se limitando a, venda, licenciamento, aluguel ou qualquer outra forma de exploração comercial.
2. Este software não pode ser incluído em produtos comerciais ou serviços sem autorização prévia por escrito dos autores.

Isenções de Responsabilidade:
O software é fornecido "no estado em que se encontra", sem garantia de qualquer tipo, expressa ou implícita. Os autores não serão responsáveis por quaisquer danos diretos, indiretos, incidentais, especiais, exemplares ou consequenciais decorrentes do uso deste software.

Rescisão:
Esta licença será rescindida automaticamente se você violar qualquer uma das suas disposições. Após a rescisão, você deverá destruir imediatamente todas as cópias deste software em sua posse.

Variações:
Os autores deste projeto reservam o direito de alterar os termos desta licença a qualquer momento e sem aviso prévio.

Aceitação:
Ao utilizar este software, você indica que aceita os termos e condições desta licença.

Para mais informações, entre em contato com os autores em marcelo.soares1070@gmail.com .

```
