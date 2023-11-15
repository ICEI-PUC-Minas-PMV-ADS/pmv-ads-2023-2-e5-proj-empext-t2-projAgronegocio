import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import Header from '../components/Header';
import Container from '../components/Container';
import Body from '../components/Body';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../contexts/UserContext';
import AsyncStorage from '@react-native-community/async-storage';

const Perfil = () => {
  const navigation = useNavigation();
  console.log(AsyncStorage.getAllKeys());
  const { setSigned } = useUser();

  const handleTextClick = () => {
    // Ao navegar para MinhasNegociacoes
    navigation.navigate('MinhasNegociacoes');
  };
  const logout = () => {
    AsyncStorage.getAllKeys()
      .then((keys) => AsyncStorage.multiRemove(keys))
      .then(() => setSigned(false));
    console.log(AsyncStorage.getAllKeys());
  };

  return (
    <Container>
      <Header title={'Perfil'}></Header>
      <Body>
        <View style={styles.container}>
          <Button
            style={styles.buttonSend}
            onPress={handleTextClick}
            color="white">
            Minhas Negociacões
          </Button>
          <Button style={styles.buttonSend} onPress={logout} color="white">
            Sair
          </Button>
        </View>
      </Body>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Alinhe o texto no topo
    alignItems: 'center',
    marginTop: 111, // Adicione margem superior para o espaço do Header
  },
  buttonSend: {
    margin: 8,
    backgroundColor: '#157E58',
  },
});

export default Perfil;
