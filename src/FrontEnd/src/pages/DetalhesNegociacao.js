import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { RadioButton, Text, TextInput } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

import Container from '../components/Container';
import Body from '../components/Body';
import Header from '../components/Header';
import Input from '../components/Input';

import { useUser } from '../contexts/UserContext';

import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

const DetalhesNegociacao = ({ route }) => {
  const navigation = useNavigation();
  //validar se existe valores
  const { item } = route.params ? route.params : {};

  const { id } = useUser();
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const [tipoOperacao, setTipoOperacao] = useState('Venda');

  const [clienteProdutor, setClienteProdutor] = useState('');
  const [dataVencimento, setDataVencimento] = useState(
    moment(new Date()).format('DD/MM/YYYY')
  );
  const [qtdSacas, setQtdSacas] = useState('');
  const [valorPorSaca, setValorPorSaca] = useState('');
  const [valorTotal, setValorTotal] = useState('');
  const [unidade, setUnidade] = useState('');
  const [usuarioResponsavel, setUsuarioResponsavel] = useState('');

  useEffect(() => {
    if (item) {
      setTipoOperacao(item.tipo_operacao);
      setClienteProdutor(item.cliente_produtor);
      setDataVencimento(item.data_vencimento);
      setValorPorSaca(item.valor_por_saca);
      setQtdSacas(item.quantidade_saca);
      setValorTotal(item.valor_total);
      setUnidade(item.unidade);
      setUsuarioResponsavel(item.nome);
    }
  }, [item]);

  return (
    <Container>
      <Header title={'Negociação'} goBack={() => navigation.goBack()}></Header>
      <Body>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={'date'}
            is24Hour={true}
            display="default"
            onTouchCancel={() => setShow(false)}
            onChange={(event, date) => {
              setShow(false);
              setDataVencimento(moment(date).format('DD/MM/YYYY'));
            }}
          />
        )}
        <Input
          label="Responsavel:"
          value={usuarioResponsavel}
          editable={false}
          left={<TextInput.Icon icon="account" />}
        />
        <Input
          label="Tipo de Operação:"
          value={tipoOperacao === 0 ? 'Venda' : 'Compra'}
          onChangeText={(text) => setTipoOperacao(text)}
          editable={false}
          left={<TextInput.Icon icon="book-variant-multiple" />}
        />
        <Input
          label={tipoOperacao === 0 ? 'Cliente:' : 'Produtor:'}
          value={clienteProdutor}
          editable={false}
          onChangeText={(text) => setClienteProdutor(text)}
          left={<TextInput.Icon icon="leaf-circle" />}
        />
        <Input
          label="Data de vencimento:"
          value={dataVencimento}
          editable={false}
          left={<TextInput.Icon icon="calendar" />}
        />
        <Input
          label="Quantidade de sacas:"
          value={String(qtdSacas)}
          numeric
          keyboardType={'numeric'}
          editable={false}
          onChangeText={(text) => setQtdSacas(text)}
          left={<TextInput.Icon icon="sack" />}
        />
        <Input
          label="Preço por saca:"
          value={String(valorPorSaca)}
          numeric
          keyboardType={'numeric'}
          editable={false}
          onChangeText={(text) => setValorPorSaca(text)}
          left={<TextInput.Icon icon="currency-brl" />}
        />
        <Input
          label="Unidade:"
          value={unidade == 0 ? 'Matriz' : 'Filial'}
          onChangeText={(text) => setUnidade(text)}
          editable={false}
          left={<TextInput.Icon icon="home-group" />}
        />
        <Input
          label="Valor total:"
          value={String(qtdSacas * valorPorSaca)}
          onChangeText={(text) => setValorTotal(text)}
          left={<TextInput.Icon icon="currency-brl" />}
          editable={false}
        />
      </Body>
    </Container>
  );
};


export default DetalhesNegociacao;
