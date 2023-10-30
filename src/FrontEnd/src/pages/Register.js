import React, { useState } from 'react';
import { StyleSheet, View, Alert, Image, Text } from 'react-native';
import { TextInput, Button, Headline } from 'react-native-paper';
import Container from '../components/Container';
import Body from '../components/Body';
import Input from '../components/Input';

import { useNavigation } from '@react-navigation/native';

import {register} from '../services/auth.services';

const Register = () => {

  const navigation = useNavigation();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleRegister = () => {

    register({
      name: name,
      email: email,
      password: senha
    }).then( res => {
      console.log('res:', res);
      console.log('dados:', name, email, senha);
      if(res){
        Alert.alert('Atenção', 'Usuário Cadastrado com sucesso!',[
          { text: "OK", onPress: () => navigation.goBack() }
        ]);

      }else{

         Alert.alert('Atenção', 'Usuário não cadastrado! Tente novamente mais tarde =D');
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
          label="Nome"
          value={name}
          onChangeText={(text) => setName(text)} 
          left={<TextInput.Icon name="account" />}
          mode="outlined"         
        />
        <Input
          label="Email"
          value={email}          
          onChangeText={(text) => setEmail(text)}
          left={<TextInput.Icon name="email" />}
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
          onPress={handleRegister} color="white">
          Registrar
        </Button>
        <Button
          style={styles.buttonCancel}
          onPress={() => navigation.goBack()}
          color="black">
          Cancelar
        </Button>

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
      buttonCancel: { 
    margin: 8,
    backgroundColor: '#F2B66D'
  },

});

export default Register;