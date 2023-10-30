import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import Header from '../components/Header';
import Container from '../components/Container';
import Body from '../components/Body';
import { useNavigation } from '@react-navigation/native';

const Perfil = () => {
  const navigation = useNavigation();

  const handleTextClick = () => {
    // Ao navegar para MinhasNegociacoes
    navigation.navigate('MinhasNegociacoes');
  };

  return (
    <Container>
      <Header title={'Perfil'}></Header>
      <Body>
        <View style={styles.container}>
          <Button style={styles.buttonSend} onPress={handleTextClick} color="white">
            Minhas Negociacões
          </Button>
          {/* Adicione o conteúdo da tela aqui */}
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
