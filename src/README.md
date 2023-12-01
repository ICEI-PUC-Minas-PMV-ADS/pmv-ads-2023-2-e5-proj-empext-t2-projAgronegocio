# AgroTrade Monitor

## Acesso pelo Snack do Expo
https://snack.expo.dev/@laislimas/agrotrademonitorentragaetapa5?platform=android

## Parametrização de ambiente

Entrar no CMD ou PowerShell e instalar os pacotes em cada diretorio separadamente:

### OBS: Não é mais necessário para o BackEnd, visto que ele se encontra hospedado, porém caso tenha interesse em saber as dependências, são as descritas abaixo:

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

npm install

npm install eslint --save-dev

npx eslint --init

npx eslint --fix .              -- Caso queira que seja realizado correções

npm install --global expo-cli


### Instalar App do Expo e Ler QR Code (só se tiver o localtunnel em pé e as URLs em services atualizadas);

## Executando:

### cd src/BackEnd

### OBS: Não é mais necessário pois se encontra hospedado

Abrir CMD e digitar: npm run dev
Executará na porta 3333

-------------------------------------
### cd src/FrontEnd

npx expo start

Ler QR Code no celular ou abrir Android Studio (se já tiver instalado, não recomendo)

-------------------------------------
### Gerar AAB

### cd src/FrontEnd

### Acessar documentação: https://docs.expo.dev/build/setup/

npm install -g eas-cli

eas build --platform android
