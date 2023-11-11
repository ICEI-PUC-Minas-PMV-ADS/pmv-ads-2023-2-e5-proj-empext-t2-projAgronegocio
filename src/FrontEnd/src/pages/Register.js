import React, { useState } from 'react';
import validator from 'validator';
import { StyleSheet, View, Alert, Image } from 'react-native';
import { TextInput, Button, ActivityIndicator } from 'react-native-paper';
import Container from '../components/Container';
import Body from '../components/Body';
import Input from '../components/Input';

import { useNavigation } from '@react-navigation/native';
import { register } from '../services/auth.services';

const Register = ({ route }) => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState(route.params.paramKey);
  const [senha, setSenha] = useState('');
  const [isRegister, setRegister] = useState(false);

  const checkFields = () => {
    if (name == '') {
      Alert.alert('Atenção!', 'Informe seu nome!');
    } else if (email == '' || !validator.isEmail(email)) {
      Alert.alert('Atenção!', 'Informe um email válido!');
    } else if (senha == '' || senha.length < 5) {
      Alert.alert('Atenção!', 'A senha deve conter no mínimo 5 caracteres!');
    } else {
      handleRegister();
    }
  };

  const handleRegister = () => {
    setRegister(true);
    register({
      name: name,
      email: email,
      password: senha,
    }).then((res) => {
      console.log('res:', res);
      setRegister(false);
      if (res && res.insertId) {
        Alert.alert('Atenção', 'Usuário Cadastrado com sucesso!', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      } else {
        if (res && res.usuarioJaCadastrado) {
          Alert.alert('Atenção', 'Usuário já existe, deseja fazer o Login?', [
            {
              text: 'Cancelar',
              style: 'cancel',
            },
            {
              text: 'Sim',
              onPress: () => navigation.navigate('Login'),
            },
          ]);
        }
      }
    });
  };

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
        {isRegister && (
          <View style={styles.activity}>
            <ActivityIndicator size="large" color="#00ff00" />
          </View>
        )}
        {!isRegister && (
          <Button style={styles.buttonSend} onPress={checkFields} color="white">
            Registrar
          </Button>
        )}
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
    backgroundColor: '#157E58',
  },
  image: {
    width: '100%',
  },
  buttonCancel: {
    margin: 8,
    backgroundColor: '#F2B66D',
  },
  activity: {
    marginVertical: 8,
    borderRadius: 60,
    backgroundColor: '#FFF',
  },
});

export default Register;
