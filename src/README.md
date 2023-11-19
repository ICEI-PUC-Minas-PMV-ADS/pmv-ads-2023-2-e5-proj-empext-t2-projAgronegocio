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

### cd src/BackEnd

Abrir CMD e digitar: npm run dev
Executará na porta 3333

-------------------------------------
### cd src/FrontEnd

npx expo start

Ler QR Code no celular ou abrir Android Studio (se já tiver instalado, não recomendo)
