import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { List, Text, FAB, IconButton } from 'react-native-paper';

import Header from '../components/Header';
import Container from '../components/Container';
import Body from '../components/Body';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { getNegociacoes } from '../services/negociacao.services';
import Assets from '../assets/ImagemSoja2.jpg';

const Negociacao = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [expanded, setExpanded] = useState(false);

  const [negociacoes, setNegociacoes] = useState([]);

  useEffect(() => {
    getNegociacoes().then((dados) => {
      setNegociacoes(dados || []); // Adicionei uma verificação para garantir que negociacoes não seja nulo
    });
  }, [isFocused]);

  const renderNegociacoes = () => {
    const displayedNegociacoes = expanded ? (negociacoes || []) : (negociacoes || []).slice(0, 2);

    return (
      <View>
        {displayedNegociacoes.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate('NovaNegociacao', { item })}
          >
            <View style={styles.itemContainer}>
              <View style={styles.leftContent}>
                <Image source={Assets} style={styles.image} />
              </View>
              <View style={styles.rightContent}>
                <Text style={styles.labelText}>
                  {item.tipo_operacao === 0 ? 'Cliente:' : 'Produtor:'}
                </Text>
                <Text>{item.nomePessoa}</Text>
                <Text style={styles.labelText}>Data de pagamento:</Text>
                <Text>{item.data_vencimento}</Text>
                <Text style={styles.labelText}>Quantidade:</Text>
                <Text>{item.quantidade_saca}</Text>
                <Text style={styles.labelText}>Valor total:</Text>
                <Text>{item.valor_total ? `R$${item.valor_total.toFixed(2)}` : 'N/A'}</Text>
                <Text style={styles.labelText}>Responsavel:</Text>
                <Text>{item.nomeResponsavel}</Text>
              </View>
              <Text style={styles.operationText}>
                {item.tipo_operacao === 0 ? 'Venda' : 'Compra'}
              </Text>
            </View>
            <View style={styles.divider} />
          </TouchableOpacity>
        ))}
        {!expanded && (
          <View style={styles.expandIconContainer}>
            <IconButton
              icon="arrow-expand-all"
              color="#000"
              size={17}
              onPress={() => setExpanded(true)}
            />
          </View>
        )}
      </View>
    );
  };

  return (
    <Container>
      <Header title={'Agro Trade Monitor'} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.infoContainer}>
          <View style={styles.saldoDiaContainer}>
            <Text style={styles.saldoDia}>
              <Text style={{ fontWeight: 'bold', fontSize: 24, color: '#269F67' }}>
                Saldo X Dia
              </Text>
            </Text>
          </View>
          <View style={styles.saldoDiaAnteriorContainer}>
            <Text style={styles.saldoDiaAnterior}>
              <Text style={{ fontWeight: 'bold' }}>Saldo dia Anterior X Sacas</Text>
            </Text>
          </View>
          <Text style={styles.negociacoesRecentes}>
            <Text style={{ fontWeight: 'bold' }}>Negociações Recentes</Text>
          </Text>
        </View>
        <Body>{renderNegociacoes()}</Body>
        {expanded && (
          <View style={styles.expandIconContainer}>
            <IconButton
              icon="arrow-collapse-all"
              color="#000"
              size={17}
              onPress={() => setExpanded(false)}
            />
          </View>
        )}
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
  saldoDiaContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  saldoDia: {
    textAlign: 'center',
  },
  saldoDiaAnteriorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  saldoDiaAnterior: {
    fontSize: 11,
    color: '#000000',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  negociacoesRecentes: {
    fontSize: 18,
    color: '#000000',
    textAlign: 'left',
    marginTop: 15,
    marginBottom: 0,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
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
  // Estilo para a linha divisória
  divider: {
    width: '84%',
    height: 0,
    marginLeft: 39,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.33)',
  },
  expandIconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default Negociacao;
