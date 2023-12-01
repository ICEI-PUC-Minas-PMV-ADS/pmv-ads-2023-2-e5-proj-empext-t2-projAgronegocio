/* eslint-disable max-len */
import React from 'react';
import {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {
  RadioButton,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import PropTypes from 'prop-types';

import Container from '../components/Container';
import Body from '../components/Body';
import Header from '../components/Header';
import Input from '../components/Input';

import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {
  updateNegociacao,
  deleteNegociacao,
} from '../services/negociacao.services';

import {getPessoas} from '../services/pessoas.services';
import {getUnidades} from '../services/unidades.services';

const EditarNegociacao = ({route}) => {
  const navigation = useNavigation();
  // validar se existe valores
  const {item} = route.params ? route.params : {};

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const [tipoOperacao, setTipoOperacao] = useState('Venda');

  const [dataVencimento, setDataVencimento] = useState(
      moment(new Date()).format('DD/MM/YYYY'),
  );
  const [qtdSacas, setQtdSacas] = useState('');
  const [valorPorSaca, setValorPorSaca] = useState('');
  const [valorTotal, setValorTotal] = useState('');
  const [idUsuario, setIdUsuario] = useState('');
  const [pessoas, setPessoas] = useState([]);
  const [pessoaSelecionada, setPessoaSelecionada] = useState();
  const [unidades, setUnidades] = useState([]);
  const [unidadeSelecionada, setUnidadeSelecionada] = useState();

  useEffect(() => {
    getPessoas().then((dados) => {
      setPessoas(dados);
    });
    getUnidades().then((dados) => {
      setUnidades(dados);
    });

    if (item) {
      setTipoOperacao(item.tipo_operacao);
      setPessoaSelecionada(item.cliente_produtor);
      setDataVencimento(item.data_vencimento);
      setValorPorSaca(item.valor_por_saca);
      setQtdSacas(item.quantidade_saca);
      setValorTotal(item.valor_total);
      setUnidadeSelecionada(item.unidade);
      setIdUsuario(item.id_usuario);
    }
  }, [item]);

  const handleSalvar = () => {
    if (item) {
      updateNegociacao({
        cliente_produtor: pessoaSelecionada,
        tipo_operacao: Number(tipoOperacao),
        valor_por_saca: Number(valorPorSaca),
        quantidade_saca: Number(qtdSacas),
        data_vencimento: dataVencimento,
        valor_total: valorPorSaca * qtdSacas,
        unidade: unidadeSelecionada,
        id_usuario: Number(idUsuario),
        id: item.id,
      }).then((res) => {
        console.log(res);
        res != null ?
          Alert.alert('Atenção!', 'Negociação alterada com sucesso!', [
            {
              text: 'Ok',
              onPress: () => navigation.goBack(),
            },
          ]) :
          Alert.alert('Atenção!', 'Erro ao alterar negociação!', [
            {
              text: 'Ok',
            },
          ]);
      });
    }
  };

  const confirmar = () => {
    if (item) {
      Alert.alert(
          'Atenção!',
          'Tem certeza que deseja ALTERAR os dados desta negociação?',
          [
            {
              text: 'Cancelar',
              style: 'cancel',
            },
            {text: 'Sim', onPress: () => handleSalvar()},
          ],
      );
    } else {
      handleSalvar();
    }
  };

  const handleExcluir = () => {
    Alert.alert('Atenção!', 'Tem certeza que deseja EXCLUIR esta negociacão?', [
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

  const renderPessoas = (tipoOp) => {
    produtor = pessoas
        .filter(function(item) {
          return item.tipo == 'Produtor';
        })
        .map(function({id, nome}) {
          return {id, nome};
        });

    cliente = pessoas
        .filter(function(item) {
          return item.tipo == 'Cliente';
        })
        .map(function({id, nome}) {
          return {id, nome};
        });

    if (tipoOp == 0) {
      dadosPessoas = cliente;
    } else {
      dadosPessoas = produtor;
    }

    return pessoas ? (
      <Picker
        selectedValue={pessoaSelecionada}
        style={styles.picker}
        onValueChange={(itemValue) => setPessoaSelecionada(itemValue)}>
        <Picker.Item key="" color="#00000090" label="Selecione" value="" />
        {dadosPessoas.map((array) => (
          <Picker.Item key={array.id} label={array.nome} value={array.id} />
        ))}
      </Picker>
    ) : (
      <ActivityIndicator size="large" color="#6FCF97" />
    );
  };

  const renderUnidades = () => {
    return unidades ? (
      <Picker
        selectedValue={unidadeSelecionada}
        style={styles.picker}
        onValueChange={(itemValue) => setUnidadeSelecionada(itemValue)}>
        {unidades.map((array) => (
          <Picker.Item key={array.id} label={array.razaoSocial} value={array.id} />
        ))}
      </Picker>
    ) : (
      <ActivityIndicator size="large" color="#6FCF97" />
    );
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
        <View style={styles.pickerContainer}>
          <Text>{tipoOperacao === 0 ? 'Cliente:' : 'Produtor:'}</Text>
          {renderPessoas(tipoOperacao)}
        </View>
        <TouchableOpacity onPress={() => setShow(true)}>
          <Input
            label="Data de pagamento:"
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
        <View style={styles.pickerContainer}>
          <Text>Unidade:</Text>
          {renderUnidades()}
        </View>
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
            color="#45818e"
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
  pickerContainer: {
    marginBottom: 16,
  },
  picker: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 4,
  },
});

EditarNegociacao.propTypes = {
  route: PropTypes.object.isRequired,
};

export default EditarNegociacao;
