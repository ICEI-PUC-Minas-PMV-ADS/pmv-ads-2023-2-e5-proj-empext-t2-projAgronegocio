import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Text } from 'react-native-paper';

import Header from '../components/Header';
import Container from '../components/Container';
import Body from '../components/Body';
import Assets from '../assets/ImagemSoja2.jpg';

import { useNavigation, useIsFocused } from '@react-navigation/native';
import { getNegociacoesUsuarioId } from '../services/negociacao.services';
import { useUser } from '../contexts/UserContext';

const MinhasNegociacoes = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { id } = useUser();

  const [negociacoes, setNegociacoes] = useState([]);

  useEffect(() => {
    getNegociacoesUsuarioId(id).then((dados) => {
      setNegociacoes(dados);
    });
  }, [id, isFocused]);

  const handleItemPress = (item) => {
    navigation.navigate('NovaNegociacao', { item });
  };

  const renderNegociacoes = () => {
    return negociacoes ? (
      negociacoes.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleItemPress(item)}>
          <View style={styles.itemContainer}>
            <View style={styles.leftContent}>
              <Image source={Assets} style={styles.image} />
            </View>
             <View style={styles.rightContent}>
              <Text style={styles.labelText}>{item.tipo_operacao === 0 ? 'Cliente:' : 'Produtor:'}</Text>
              <Text>{item.nomePessoa}</Text>
              <Text style={styles.labelText}>Data de pagamento:</Text>
              <Text>{item.data_vencimento}</Text>
              <Text style={styles.labelText}>Quantidade:</Text>
              <Text>{item.quantidade_saca}</Text>
              <Text style={styles.labelText}>Valor total:</Text>
              <Text>R${item.valor_total.toFixed(2)}</Text>
              <Text style={styles.labelText}>Responsavel:</Text>
              <Text>{item.nomeResponsavel}</Text>
            </View>
            <Text style={styles.operationText}>
              {item.tipo_operacao === 0 ? 'Venda' : 'Compra'}
            </Text>
          </View>
        </TouchableOpacity>
      ))
    ) : (
      <ActivityIndicator size="large" color="#6FCF97" />
    );
  };

  return (
    <Container>
      <Header title={'Minhas Negociações'} goBack={() => navigation.goBack()} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.infoContainer}>
          <Text style={styles.saldoDia}>Minhas negociações</Text>
        </View>
        <Body>{renderNegociacoes()}</Body>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    marginTop: 0,
  },
  infoContainer: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 0,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
    padding: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
   saldoDia: {
    fontSize: 20,
    color: '#269F67',
    marginBottom: 10,
    textAlign: 'center',
  },
  leftContent: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  rightContent: {
    flex: 1,
    paddingLeft: 10,
  },
  image: {
    width: 28,
    height: 20,
  },
  operationText: {
    alignSelf: 'center',
  },
  labelText: {
    fontWeight: 'bold',
  },
});

export default MinhasNegociacoes;
