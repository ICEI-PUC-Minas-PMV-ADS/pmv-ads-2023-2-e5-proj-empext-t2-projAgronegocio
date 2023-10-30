import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import {
  RadioButton,
  Text,
  TextInput,
  Button,
  Appbar,
} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

import Container from '../components/Container';
import Body from '../components/Body';
import Header from '../components/Header';
import Input from '../components/Input';

import { useUser } from '../contexts/UserContext';

import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import {
  insertNegociacao,
  updateNegociacao,
  deleteNegociacao,
} from '../services/negociacao.services';

const NovaNegociacao = ({ route }) => {
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
  const [idUsuario, setIdUsuario] = useState('');

  const handleNome = (nome) => {
    if (tipoOperacao === 'Venda') {
      setComprador(nome);
    } else {
      setProdutor(nome);
    }
  };

  useEffect(() => {
    if (item) {
      setTipoOperacao(item.tipo_operacao);
      setClienteProdutor(item.cliente_produtor);
      setDataVencimento(item.data_vencimento);
      setValorPorSaca(item.valor_por_saca);
      setQtdSacas(item.quantidade_saca);
      setValorTotal(item.valor_total);
      setUnidade(item.unidade);
      setIdUsuario(item.id_usuario);
    }
  }, [item]);

  const handleSalvar = () => {
    if (item) {
      updateNegociacao({
        cliente_produtor: clienteProdutor,
        tipo_operacao: Number(tipoOperacao),
        valor_por_saca: Number(valorPorSaca),
        quantidade_saca: Number(qtdSacas),
        data_vencimento: dataVencimento,
        valor_total: valorPorSaca * qtdSacas,
        unidade: Number(unidade),
        id_usuario: Number(idUsuario),
        id: item.id,
      }).then((res) => {
        Alert.alert('Atenção', 'Negociação alterada com Sucesso!', [
          {
            text: 'Ok',
            onPress: () => navigation.goBack(),
          },
        ]);
      });
    } else {
      insertNegociacao({
        cliente_produtor: clienteProdutor,
        tipo_operacao: Number(tipoOperacao),
        valor_por_saca: Number(valorPorSaca),
        quantidade_saca: Number(qtdSacas),
        data_vencimento: dataVencimento,
        valor_total: valorPorSaca * qtdSacas,
        unidade: Number(unidade),
        id_usuario: id,
      }).then((res) => {
        Alert.alert('Atenção', 'Negociação criada com Sucesso!', [
          {
            text: 'Ok',
            onPress: () => navigation.goBack(),
          },
        ]);
      });
    }
  };

  const confirmar = () => {
    if (item) {
      Alert.alert(
        'Atenção',
        'Tem certeza que deseja ALTERAR os dados desta Negociação ?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          { text: 'Sim', onPress: () => handleSalvar() },
        ]
      );
    } else {
      handleSalvar();
    }
  };

  const handleExcluir = () => {
    Alert.alert('Atenção', 'Tem certeza que deseja EXCLUIR esta Negociacão?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Sim, Excluir',
        onPress: () =>
          deleteNegociacao(item.id).then((res) => {
            navigation.goBack();
          }),
      },
    ]);
  };

  return (
    <Container>
      <Header title={'Negociação'} goBack={() => navigation.goBack()}></Header>
      <Body>
        <View style={styles.containerRadioButton}>
          <View style={styles.containerRadioItem}>
            <RadioButton
              value="first"
              status={tipoOperacao === 0 ? 'checked' : 'unchecked'}
              color={'#157E58'}
              onPress={() => setTipoOperacao(0)}
            />
            <Text>Venda</Text>
          </View>

          <View style={styles.containerRadioItem}>
            <RadioButton
              value="first"
              status={tipoOperacao === 1 ? 'checked' : 'unchecked'}
              color={'red'}
              onPress={() => setTipoOperacao(1)}
            />
            <Text>Compra</Text>
          </View>
        </View>

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
          label="Tipo de Operação:"
          value={tipoOperacao === 0 ? 'Venda' : 'Compra'}
          onChangeText={(text) => setTipoOperacao(text)}
          left={<TextInput.Icon icon="book-variant-multiple" />}
        />
        <Input
          label={tipoOperacao === 0 ? 'Cliente:' : 'Produtor:'}
          value={clienteProdutor}
          onChangeText={(text) => setClienteProdutor(text)}
          left={<TextInput.Icon icon="leaf-circle" />}
        />

        <TouchableOpacity onPress={() => setShow(true)}>
          <Input
            label="Data de vencimento:"
            value={dataVencimento}
            left={<TextInput.Icon icon="calendar" />}
            editable={false}
          />
        </TouchableOpacity>
        <Input
          label="Quantidade de sacas:"
          value={String(qtdSacas)}
          numeric
          keyboardType={'numeric'}
          onChangeText={(text) => setQtdSacas(text)}
          left={<TextInput.Icon icon="sack" />}
        />
        <Input
          label="Preço por saca:"
          value={String(valorPorSaca)}
          numeric
          keyboardType={'numeric'}
          onChangeText={(text) => setValorPorSaca(text)}
          left={<TextInput.Icon icon="currency-brl" />}
        />
        <Input
          label="Unidade:"
          value={unidade == 0 ? 'Matriz' : 'Filial'}
          left={<TextInput.Icon icon="home-group" />}
          editable={false}
        />
        <Input
          label="Valor total:"
          value={String(qtdSacas * valorPorSaca)}
          onChangeText={(text) => setValorTotal(text)}
          left={<TextInput.Icon icon="currency-brl" />}
          editable={false}
        />

        <Button
          mode="contained"
          color="#157E58"
          style={styles.button}
          onPress={confirmar}>
          Salvar
        </Button>

        {item && (
          <Button
            mode="contained"
            color="#F2B66D"
            style={styles.button}
            onPress={handleExcluir}>
            Excluir
          </Button>
        )}
      </Body>
    </Container>
  );
};

const styles = StyleSheet.create({
  containerRadioButton: {
    flexDirection: 'row',
    margin: 8,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  containerRadioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  button: {
    marginBottom: 8,
  },
});

export default NovaNegociacao;
