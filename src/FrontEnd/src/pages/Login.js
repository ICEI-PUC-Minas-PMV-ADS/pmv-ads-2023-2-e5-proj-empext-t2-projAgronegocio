import React, {useState} from 'react';
import {StyleSheet, View, Alert, Image, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TextInput, Button} from 'react-native-paper';
import Container from '../components/Container';
import Body from '../components/Body';
import Input from '../components/Input';

import {useNavigation} from '@react-navigation/native';
import {useUser} from '../contexts/UserContext';

import {login} from '../services/auth.services';

const Login = () => {
  const navigation = useNavigation();
  const {setSigned, setName, setId} = useUser();
  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();

  const handleLogin = () => {
    login({
      email: email,
      password: senha,
    }).then((res) => {
      console.log('res:', res);
      if (res && res.user) {
        console.log(res.user.nome);
        setName(res.user.nome);
        setId(res.user.id);
        AsyncStorage.setItem('@TOKEN_KEY', res.token).then();
        setSigned(true);
      } else {
        if (res && res.usuarioNaoExiste) {
          Alert.alert('Atenção', 'Usuário não existe, deseja se cadastrar?', [
            {
              text: 'Cancelar',
              style: 'cancel',
            },
            {
              text: 'Sim',
              onPress: () =>
                navigation.navigate('Register', {
                  paramKey: email,
                }),
            },
          ]);
        } else {
          Alert.alert('Atenção', 'Usuário ou senha inválidos!');
        }
      }
    });
  };

  return (
    <Container>
      <Image
        source={require('../assets/LogoAgroTradeMonitor2.png')}
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
        <Button style={styles.buttonSend} onPress={handleLogin} color="white">
          Entrar
        </Button>
        <View style={styles.registerText}>
          <Text> Não possui conta? </Text>
          <Button
            style={styles.buttonRegister}
            color="blue"
            onPress={() =>
              navigation.navigate('Register', {
                paramKey: email,
              })
            }>
            Registre-se
          </Button>
        </View>
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
  registerText: {
    margin: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonRegister: {},
});

export default Login;
