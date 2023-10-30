import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { List, Text , FAB} from 'react-native-paper';


import Header from '../components/Header';
import Container from '../components/Container';
import Body from '../components/Body';

import {useNavigation, useIsFocused} from '@react-navigation/native';
import { getNegociacoesUsuarioId } from '../services/negociacao.services';
import {useUser} from '../contexts/UserContext';


const MinhasNegociacoes = () =>{

  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const {id} = useUser();
  
  const [negociacoes, setNegociacoes] = useState([]);

  useEffect(() => {
    getNegociacoesUsuarioId(id).then((dados) => {
      setNegociacoes(dados);
      console.log(dados);
    });
  }, [isFocused]);

  const renderItem = ({ item }) => (
      <List.Item
        title={item.tipo_operacao === 0 ? 'Cliente: ' + item.cliente_produtor  : 'Produtor: ' + item.cliente_produtor}
        description={"Vencimento: " + item.data_vencimento + '\n' + "Quantidade: " + item.quantidade_saca }
        left={props => 
          <Text {...props} style={{ alignSelf: 'center'}}>{item.tipo_operacao === 0 ? "Venda" : "Compra"}</Text>
        }
        right={(props) => 
          <Text {...props} style={{ alignSelf: 'center'}}>{"Valor total: " + '\n' + "R$" + item.valor_total.toFixed(2)} 
          </Text>
        }
        onPress ={() => navigation.navigate('NovaNegociacao', {item})}
      />
  );

  return(
    <Container>
    <Header title={'Minhas Negociações'} goBack={() => navigation.goBack()}></Header>
    <Body>
      <FlatList
          data={negociacoes}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
      />     

      <FAB
        style={styles.fab}
        icon="plus"
        small
        onPress={() => navigation.navigate('NovaNegociacao')}
      />    
    </Body>

    </Container>
  )
};

const styles = StyleSheet.create({
  fab:{
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0, 
    backgroundColor: '#157E58'   
  },

});

export default MinhasNegociacoes;