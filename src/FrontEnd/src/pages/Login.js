import React, { useState } from 'react';
import { StyleSheet, View, Alert,Image,Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput, Button, Headline } from 'react-native-paper';
import Container from '../components/Container';
import Body from '../components/Body';
import Input from '../components/Input';

import { useNavigation } from '@react-navigation/native';
import {useUser} from '../contexts/UserContext';

import {login} from '../services/auth.services';

const Login = () => {

  const navigation = useNavigation();
  const {setSigned, setName, setId} = useUser();

  const [email, setEmail] = useState('geo@gmail.com');
  const [senha, setSenha] = useState('123456');

   const handleLogin= () => {

    login({
      email: email,
      password: senha
    }).then( res => {
      console.log(res);

      if(res && res.user){
        setSigned(true);
        setName(res.user.name);
        setId(res.user.id)
        console.log(res.token)
        AsyncStorage.setItem('@TOKEN_KEY', res.token).then();
      }else{
         Alert.alert('Atenção', 'Usuário ou senha inválidos!');
      }

    });
    
  }

  return (
    <Container>
      <Image
        source={require('../assets/LogoAgroTradeMonitor2.jpg')}
        style={styles.image}
      />

      <Body>
        <Input
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          left={<TextInput.Icon name="account" />}
          keyboardType="email-address"  
          mode="outlined"           
        />
        <Input
          label="Senha"
          value={senha}
          secureTextEntry
          onChangeText={(text) => setSenha(text)}
          left={<TextInput.Icon name="key" />}
          mode="outlined"
        />
        <Button
          style={styles.buttonSend}
          onPress={handleLogin}
          color="white">
          Entrar
        </Button>
        <View style={styles.infText}>
          <Text> Ou continue com </Text>
        </View>   
        <View style={styles.buttonAux}>     
          <Button style={styles.buttonGoogle} color="black">
            Google
          </Button>
          <Button style={styles.buttonFacebook} color="black">
            Facebook
          </Button>
        </View>
        <View style={styles.registerText}>
          <Text> Não possui conta? </Text>
          <Button style={styles.buttonRegister}
            color="blue"
            onPress={() => navigation.navigate('Register')}>
            Crie agora
          </Button>
        </View>   
      </Body>
    </Container>
  );
};

const styles = StyleSheet.create({
  buttonSend: {
    margin: 8,
    backgroundColor: '#157E58'
  },
  image: {
    width: '100%',
  },
  infText: {
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonAux: {
    margin: 8,
    justifyContent: 'space-evenly',
    flexDirection:'row',
  },
    buttonGoogle: {
    backgroundColor: '#d3d3d3'
  },
    buttonFacebook: {      
    backgroundColor: '#d3d3d3'
  },
    registerText: {
    margin: 8,
    flexDirection:'row',
    alignItems: 'center',
  },
      buttonRegister: { 

  },

});

export default Login;
