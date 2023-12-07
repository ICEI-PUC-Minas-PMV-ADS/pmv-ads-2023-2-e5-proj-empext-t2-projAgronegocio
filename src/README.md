# AgroTrade Monitor

Instruções para utilização do código fonte.

## Acesso pelo Snack do Expo
https://snack.expo.dev/@werlon/agrotrademonitorentragaetapa5__04122023?platform=web

## Parametrização de ambiente

É necessário criar o arquivo .env seguindo o código do arquivo .env.example.

## Dependências necessárias para funcionamento local

### cd src/Backend

npm install

npm audit fix (se constar algum erro)

npm install express

npm install express express-validator body-parser jsonwebtoken bcryptjs cors --save

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

### Instalar App do Expo e Ler QR Code (para funcionar corretamente o localtunnel ou servidor precisando estar rodando e as URL no service atualizadas);

## Executando:

### cd src/Backend

Abrir CMD e digitar: npm run dev
Executará na porta 3333

-------------------------------------
### cd src/FrontEnd

npx expo start

Ler QR Code no celular ou abrir Android Studio (se já tiver instalado)

-------------------------------------
### Gerar AAB

### cd src/FrontEnd

### Acessar documentação: https://docs.expo.dev/build/setup/

npm install -g eas-cli

eas build --platform android
