# AgroTrade Monitor

## Parametrização de ambiente

Entrar no CMD ou PowerShell e instalar os pacotes em cada diretorio separadamente:

### cd src/BackEnd/Usuarios
npm install

npm audit fix (se constar algum erro)

npm install express

npm install express express-validator mysql body-parser jsonwebtoken bcryptjs cors --save

npm install dotenv

npm install -g nodemon

npm install mysql2

npm install -g localtunnel

### cd src/BackEnd/Negociacoes

npm install

npm audit fix (se constar algum erro)

npm install express

npm install express express-validator mysql body-parser jsonwebtoken bcryptjs cors --save

npm install dotenv

npm install -g nodemon

npm install mysql2

npm install -g localtunnel

### cd src/FrontEnd
npm install --force

npm audit fix

npm install --global expo-cli

npx expo install --fix

npx expo start

### Instalar App do Expo e Ler QR Code (só se tiver o localtunnel em pé e as URLs em services atualizadas);

## Executando:

## OBS: Criar arquivo .env com as informações do banco e porta para Usuarios e Negociacoes antes de executar

.env (Usuarios e Negociacoes nos respectivos diretorios, solicitar acesso para a equipe)

PORT=

MYSQL_HOST=

MYSQL_USER=

MYSQL_PASSWORD=

MYSQL_DB=

SEGREDO_TOKEN =

## Entrar nos seguintes diretorios

### cd src/BackEnd/Usuarios

Abrir CMD:

npm run dev

### cd src/BackEnd/Usuarios

Abrir outro CMD:

lt --port 5000

Clicar com o botão e quando aparecer follow clique em copiar

Cole a URL na url que consta lá no Front

### cd src/BackEnd/Negociacoes

Abrir CMD:

npm run dev

### cd src/BackEnd/Negociacoes

Abrir outro CMD:

lt --port 3333

Clicar com o botão e quando aparecer follow clique em copiar

Insira a URL na pasta services/url que consta no Front
-------------------------------------
### cd src/FrontEnd

npx expo start

Ler QR Code no celular ou abrir Android Studio (se já tiver instalado, não recomendo)
