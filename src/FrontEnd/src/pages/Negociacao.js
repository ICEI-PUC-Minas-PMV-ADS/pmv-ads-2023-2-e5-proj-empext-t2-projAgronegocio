/* eslint-disable max-len */
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {
  Text,
  IconButton,
  RadioButton,
  TextInput,
  Button,
} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import Header from '../components/Header';
import Container from '../components/Container';
import Body from '../components/Body';
import Input from '../components/Input';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import moment from 'moment';
import {
  getNegociacoes,
  getNegociacoesRecentes,
} from '../services/negociacao.services';
import Assets from '../assets/ImagemSoja2.jpg';

import {getPessoas} from '../services/pessoas.services';
import {getUnidades} from '../services/unidades.services';

DMENOS = 1;

const Negociacao = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [expanded, setExpanded] = useState(false);
  const [negociacoes, setNegociacoes] = useState([]);
  const [negociacoesRecentes, setNegociacoesRecentes] = useState([]);
  const [negociacoesExibidas, setNegociacoesExibidas] = useState([]);
  const [textNegociacoes, setTextNegociacoes] = useState(
      'Negociações Recentes',
  );

  const [filterDataInicial, setFilterDataInicial] = useState('DD/MM/YYYY');
  const [filterDataFinal, setFilterDataFinal] = useState('DD/MM/YYYY');
  const [filterDataInicialPagamento, setFilterDataInicialPagamento] =
    useState('DD/MM/YYYY');
  const [filterDataFinalPagamento, setFilterDataFinalPagamento] =
    useState('DD/MM/YYYY');
  const [filterUnidade, setFilterUnidade] = useState('');
  const [filterOperacao, setFilterOperacao] = useState(3);
  const [filterPessoa, setFilterPessoa] = useState('');
  const [date] = useState(new Date());
  const [showDataInicial, setShowDataInicial] = useState(false);
  const [showDataFinal, setShowDataFinal] = useState(false);
  const [showDataInicialPagamento, setShowDataInicialPagamento] =
    useState(false);
  const [showDataFinalPagamento, setShowDataFinalPagamento] = useState(false);

  const [pessoas, setPessoas] = useState([]);
  const [unidades, setUnidades] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);

  const openFilter = () => {
    setFilterOpen(true);
  };
  const closeFilter = () => {
    setFilterOpen(false);
  };

  useEffect(() => {
    getPessoas().then((dados) => {
      setPessoas(dados);
    });
    getUnidades().then((dados) => {
      setUnidades(dados);
    });
    getNegociacoes().then((dados) => {
      setNegociacoes(dados || []); // Adicionei uma verificação para garantir que negociacoes não seja nulo
    });
    getNegociacoesRecentes().then((dadosR) => {
      console.log(dadosR);
      setNegociacoesRecentes(dadosR || []);
      setNegociacoesExibidas(dadosR || []); // Adicionei uma verificação para garantir que negociacoes não seja nulo
    });
  }, [isFocused]);

  const filtrarNegociacoes = () => {
    const filtered = negociacoes.filter((x) => {
      return (
        (filterDataInicial === 'DD/MM/YYYY' ?
          true :
          moment(x.data_lancamento).format('DD/MM/YYYY') >=
          filterDataInicial) &&
        (filterDataFinal === 'DD/MM/YYYY' ?
          true :
          moment(x.data_lancamento).format('DD/MM/YYYY') <=
          filterDataFinal) &&
        (filterDataInicialPagamento === 'DD/MM/YYYY' ?
          true :
          passarParaData(x.data_vencimento) >=
          passarParaData(filterDataInicialPagamento)) &&
        (filterDataFinalPagamento === 'DD/MM/YYYY' ?
          true :
          passarParaData(x.data_vencimento) <=
          passarParaData(filterDataFinalPagamento)) &&
        (filterUnidade === '' ? true : x.unidade === filterUnidade) &&
        (filterOperacao === 3 ? true : x.tipo_operacao === filterOperacao) &&
        (filterPessoa === '' ? true : x.nomePessoa === filterPessoa)
      );
    });
    if (filtered.length > 0) {
      setNegociacoesExibidas(filtered);
      setTextNegociacoes('Encontrado ' + filtered.length + ' registro(s)');
      setExpanded(false);
      Alert.alert(
          'Atenção!',
          'Encontrado ' + filtered.length + ' registro(s)!',
          [
            {
              text: 'Ok',
              onPress: closeFilter,
            },
          ],
      );
    } else {
      Alert.alert('Atenção!', 'Nenhum dado encontrado!', [
        {
          text: 'Ok',
        },
      ]);
    }
  };

  const passarParaData = (d1) => {
    const str = d1.split('/');
    const d = str[0];
    const m = str[1];
    const y = str[2];
    const strConv = y + '-' + m + '-' + d;
    return new Date(strConv);
  };

  const limparFiltro = () => {
    setFilterDataInicial('DD/MM/YYYY');
    setFilterDataFinal('DD/MM/YYYY');
    setFilterDataInicialPagamento('DD/MM/YYYY');
    setFilterDataFinalPagamento('DD/MM/YYYY');
    setFilterUnidade('');
    setFilterOperacao(3);
    setFilterPessoa('');
    setNegociacoesExibidas(negociacoesRecentes);
    setTextNegociacoes('Negociações Recentes');
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

    todasPessoas = pessoas.map(function({id, nome}) {
      return {id, nome};
    });

    if (tipoOp == 0) {
      dadosPessoas = cliente;
    } else if (tipoOp == 1) {
      dadosPessoas = produtor;
    } else {
      dadosPessoas = todasPessoas;
    }

    return pessoas ? (
      <Picker
        selectedValue={filterPessoa}
        style={styles.picker}
        onValueChange={(itemValue) => setFilterPessoa(itemValue)}>
        <Picker.Item color="#00000090" label="Selecione" value="" />
        {dadosPessoas.map((array, index) => { // Adicionado index como parâmetro
          return <Picker.Item key={index} label={array.nome} value={array.nome} />;
        })}
      </Picker>
    ) : (
      <ActivityIndicator size="large" color="#6FCF97" />
    );
  };

  const renderUnidades = () => {
    return unidades ? (
      <Picker
        selectedValue={filterUnidade}
        style={styles.picker}
        onValueChange={(itemValue) => setFilterUnidade(itemValue)}>
        <Picker.Item color="#00000090" label="Selecione" value="" />
        {unidades.map((array) => {
          return <Picker.Item key={array.id} label={array.razaoSocial} value={array.id} />;
        })}
      </Picker>
    ) : (
      <ActivityIndicator size="large" color="#6FCF97" />
    );
  };

  const renderNegociacoes = () => {
    const displayedNegociacoes = expanded ?
      negociacoesExibidas || [] :
      (negociacoesExibidas || []).slice(0, 2);

    return (
      <View>
        {displayedNegociacoes.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate('DetalhesNegociacao', {item})}>
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
                <Text style={styles.labelText}>Quantidade de sacas:</Text>
                <Text>{item.quantidade_saca}</Text>
                <Text style={styles.labelText}>Valor da saca:</Text>
                <Text>
                  {item.valor_por_saca ?
                    `R$${item.valor_por_saca.toFixed(2)}` :
                    'N/A'}
                </Text>
                <Text style={styles.labelText}>Valor total:</Text>
                <Text>
                  {item.valor_total ?
                    `R$${item.valor_total.toFixed(2)}` :
                    'N/A'}
                </Text>
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
        {!expanded && negociacoesExibidas.length > 2 && (
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

  const Separator = () => <View style={styles.separator} />;


  // consolidado compra D-1
  const somatorioCompraDmenosUm = () => {
    let sumCompra = 0;

    let yesterday = new Date();

    const dd = String(yesterday.getDate()).padStart(2, '0') - DMENOS;
    const mm = String(yesterday.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = yesterday.getFullYear();

    yesterday = new Date(yyyy + '-' + mm + '-' + dd);
    // console.log('Comprayesterday: ' + yesterday);

    for (let i = 0; i < negociacoes.length; i++) {
      const dataLancamento = new Date(negociacoes[i].data_lancamento.slice(0, 10));
      
      // console.log(negociacoes[i].data_lancamento.slice(0,10).toString() < yesterday.toString(),"checking")
      if (dataLancamento < yesterday) {
        if (negociacoes[i].tipo_operacao === 1) {
          sumCompra += negociacoes[i].quantidade_saca;
        }
      }
    }
    return (
      <View>
        <Text style={styles.vendaSaca}>{sumCompra} sacas</Text>
      </View>
    );
  };

   // consolidado venda D-1
  const somatorioVendaDmenosUm = () => {
    let sumVenda = 0;

    let yesterday = new Date();

    const dd = String(yesterday.getDate()).padStart(2, '0') - DMENOS;
    const mm = String(yesterday.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = yesterday.getFullYear();

    yesterday = new Date(yyyy + '-' + mm + '-' + dd);
    // console.log('Vendayesterday: ' + yesterday);

    for (let i = 0; i < negociacoes.length; i++) {
      const dataLancamento = new Date(negociacoes[i].data_lancamento.slice(0, 10));

      // console.log(negociacoes[i].data_lancamento.slice(0,10).toString() < yesterday.toString(),"checking")
      if (dataLancamento < yesterday) {
        if (negociacoes[i].tipo_operacao === 0) {
          sumVenda += negociacoes[i].quantidade_saca;
        }
      }
    }
    return (
      <View>
        <Text style={styles.vendaSaca}>{sumVenda} sacas</Text>
      </View>
    );
  };


  const mediaCompra = () => {
    let mediaCompra = 0;
    let numCompra = 0;

    for (let i = 0; i < negociacoes.length; i++) {
      if (negociacoes[i].tipo_operacao === 1) {
        mediaCompra += negociacoes[i].valor_por_saca;
        numCompra += 1;
      }
    }
    return (
      <View>
        <Text style={styles.vendaSaca}>R${(mediaCompra / numCompra).toFixed(2)}</Text>
      </View>
    );
  };

  const mediaVenda = () => {
    let mediaVenda = 0;
    let numVenda = 0;

    for (let i = 0; i < negociacoes.length; i++) {
      if (negociacoes[i].tipo_operacao === 0) {
        mediaVenda += negociacoes[i].valor_por_saca;
        numVenda += 1;
      }
    }
    return (
      <View>
        <Text style={styles.vendaSaca}>R${(mediaVenda / numVenda).toFixed(2)}</Text>
      </View>
    );
  };

  const unidadeNegociacCompra = () => {
    let sumCompraMatriz = 0;
    let sumCompraFilialOeste = 0;
    let sumCompraFilialNorte = 0;
    let sumCompraFilialSul = 0;

    for (let i = 0; i < negociacoes.length; i++) {
      if (negociacoes[i].tipo_operacao === 1) {
        switch (negociacoes[i].unidade) {
          case 1:
            sumCompraMatriz += negociacoes[i].quantidade_saca;
            break;
          case 2:
            sumCompraFilialOeste += negociacoes[i].quantidade_saca;
            break;
          case 3:
            sumCompraFilialNorte += negociacoes[i].quantidade_saca;
            break;
          case 4:
            sumCompraFilialSul += negociacoes[i].quantidade_saca;
            break;
          default:
            console.log(`Sorry, we are out of.`);
        }
      }
    }
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={[styles.bullet, {backgroundColor: '#ADD8E6'}]} />
          <Text style={styles.whiteText}>Matriz: {sumCompraMatriz} sacas</Text>
        </View>
        <View style={styles.row}>
          <View style={[styles.bullet, {backgroundColor: '#F2B66D'}]} />
          <Text style={styles.whiteText}>FilialOeste: {sumCompraFilialOeste} sacas</Text>
        </View>
        <View style={styles.row}>
          <View style={[styles.bullet, {backgroundColor: '#39BF81'}]} />
          <Text style={styles.whiteText}>FilialNorte: {sumCompraFilialNorte} sacas</Text>
        </View>
        <View style={styles.row}>
          <View style={[styles.bullet, {backgroundColor: '#FF4040'}]} />
          <Text style={styles.whiteText}>FilialSul: {sumCompraFilialSul} sacas</Text>
        </View>
      </View>
    );
  };

  const unidadeNegociacVenda = () => {
    let sumVendaMatriz = 0;
    let sumVendaFilialOeste = 0;
    let sumVendaFilialNorte = 0;
    let sumVendaFilialSul = 0;

    for (let i = 0; i < negociacoes.length; i++) {
      if (negociacoes[i].tipo_operacao === 0) {
        switch (negociacoes[i].unidade) {
          case 1:
            sumVendaMatriz += negociacoes[i].quantidade_saca;
            break;
          case 2:
            sumVendaFilialOeste += negociacoes[i].quantidade_saca;
            break;
          case 3:
            sumVendaFilialNorte += negociacoes[i].quantidade_saca;
            break;
          case 4:
            sumVendaFilialSul += negociacoes[i].quantidade_saca;
            break;
          default:
            console.log(`Sorry, we are out of.`);
        }
      }
    }

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={[styles.bullet, {backgroundColor: '#ADD8E6'}]} />
          <Text style={styles.whiteText}>Matriz: {sumVendaMatriz} sacas</Text>
        </View>
        <View style={styles.row}>
          <View style={[styles.bullet, {backgroundColor: '#F2B66D'}]} />
          <Text style={styles.whiteText}>FilialOeste: {sumVendaFilialOeste} sacas</Text>
        </View>
        <View style={styles.row}>
          <View style={[styles.bullet, {backgroundColor: '#39BF81'}]} />
          <Text style={styles.whiteText}>FilialNorte: {sumVendaFilialNorte} sacas</Text>
        </View>
        <View style={styles.row}>
          <View style={[styles.bullet, {backgroundColor: '#FF4040'}]} />
          <Text style={styles.whiteText}>FilialSul: {sumVendaFilialSul} sacas</Text>
        </View>
      </View>
    );
  };

  const saldoAtual = () => {
    let sumVenda = 0;
    let sumCompra = 0;
    let saldo = 0;

    for (let i = 0; i < negociacoes.length; i++) {
      if (negociacoes[i].tipo_operacao === 0) {
        sumVenda += negociacoes[i].quantidade_saca;
        // console.log({sumVenda});
      } else {
        sumCompra += negociacoes[i].quantidade_saca;
        // console.log({sumCompra});
      }
    }
    saldo = sumCompra - sumVenda;
    return (
      <View>
        <Text style={styles.saldoDia}>{saldo} sacas</Text>
      </View>
    );
  };


const saldoAtualDmenosUm = () => {
  let sumVenda = 0;
  let sumCompra = 0;
  let saldo = 0;
 
  let yesterday = new Date();
 
  const dd = String(yesterday.getDate()).padStart(2, '0') - DMENOS;
  const mm = String(yesterday.getMonth() + 1).padStart(2, '0'); // January is 0!
  const yyyy = yesterday.getFullYear();
 
  yesterday = new Date(yyyy + '-' + mm + '-' + dd);
  // console.log('Saldoyesterday: ' + yesterday);
 
  for (let i = 0; i < negociacoes.length; i++) {
    const dataLancamento = new Date(negociacoes[i].data_lancamento.slice(0, 10));
 
    // console.log(dataLancamento < yesterday, "checking");
    if (dataLancamento < yesterday) {
      // console.log('DMENOS: ' + negociacoes[i].data_lancamento.slice(0, 10).toString() + ' yesterday: ' + yesterday.toString());
      // console.log('ITEM: ' + i);
 
      if (negociacoes[i].tipo_operacao === 0) {
        sumVenda += negociacoes[i].quantidade_saca;
      } else {
        sumCompra += negociacoes[i].quantidade_saca;
      }
    }
  }
 
  saldo = sumCompra - sumVenda;
 
  return (
<View>
<Text style={styles.saldoDiaAnterior}> {saldo} sacas</Text>
</View>
  );
};


  return (
    <Container>
      <Header title={'Agro Trade Monitor'} />
      <ScrollView style={filterOpen ? {opacity: 0.2} : {marginTop: 0}}>
        <View style={styles.infoContainer}>
          <View style={styles.saldoDiaContainer}>

            <View style={styles.saldoDiaValueContainer}>
              <Text style={styles.saldoDiaTitle}>
                Saldo do Dia
              </Text>
              <Text style={styles.saldoDiaValue}>
                {saldoAtual()}
              </Text>
            </View>
          </View>


          <View style={styles.saldoDiaAnteriorContainer}>
            <Text style={styles.saldoDiaAnteriorTitle}>
              Saldo do dia Anterior
            </Text>
            <Text style={styles.saldoDiaAnteriorValue}>
              {saldoAtualDmenosUm()}
            </Text>
          </View>


          <View style={styles.negociacaoRecente}>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>
              {textNegociacoes}
            </Text>
            <TouchableOpacity style={styles.buttonfilter} onPress={openFilter}>
              <Text style={{fontSize: 16}}>Filtrar</Text>
              <IconButton icon="filter-menu" color="#000" size={15} />
            </TouchableOpacity>
          </View>
        </View>
        <Body>{renderNegociacoes()}</Body>
        {expanded && negociacoesExibidas.length > 2 && (
          <View style={styles.expandIconContainer}>
            <IconButton
              icon="arrow-collapse-all"
              color="#000"
              size={17}
              onPress={() => setExpanded(false)}
            />
          </View>
        )}
        <Separator />
        <View style={{...summarySection}}>
          <Text style={summaryTitle}>Consolidado do Dia Anterior</Text>
        </View>
        <View style={styles.horizontalSummarySession}>
          <View style={styles.squareSummaryContainer}>
            <View style={styles.darkGreenbox}>
              <Text style={styles.compraSaca}> Compra {somatorioCompraDmenosUm()} </Text>
            </View>
            <View style={styles.lightGreenbox}>
              <Text style={styles.compraSaca}> Venda {somatorioVendaDmenosUm()} </Text>
            </View>
          </View>
        </View>
        <Separator />
        <View style={{...summarySection}}>
          <Text style={summaryTitle}>Média dos Preços do Mês Anterior</Text>
        </View>
        <View style={styles.horizontalSummarySession}>
          <View style={styles.squareSummaryContainer}>
            <View style={styles.darkGreenbox}>
              <Text style={styles.compraSaca}> Compra {mediaCompra()} </Text>
            </View>
            <View style={styles.lightGreenbox}>
              <Text style={styles.vendaSaca}> Venda {mediaVenda()}</Text>
            </View>
          </View>
        </View>
        <Separator />
        <View style={{...summarySection}}>
          <Text style={summaryTitle}>Compras por Unidade</Text>
        </View>
        <View style={styles.verticalSummarySession}>
          <View style={styles.darkGreenbox}>
            <Text style={styles.vendaSaca}> {unidadeNegociacCompra()}</Text>
          </View>
        </View>
        <Separator />
        <View style={{...summarySection}}>
          <Text style={summaryTitle}>Vendas por Unidade</Text>
        </View>
        <View style={styles.verticalSummarySession}>
          <View style={styles.lightGreenbox}>
            <Text style={styles.vendaSaca}> {unidadeNegociacVenda()}</Text>
          </View>
        </View>
      </ScrollView>
      {filterOpen && (
        <View style={styles.filtroView}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              alignSelf: 'center',
              marginVertical: 10,
            }}>
            Filtrar por
          </Text>
          {showDataInicial && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={'date'}
              is24Hour={true}
              display="default"
              onTouchCancel={() => setShowDataInicial(false)}
              onChange={(event, date) => {
                setShowDataInicial(false);
                setFilterDataInicial(moment(date).format('DD/MM/YYYY'));
              }}
            />
          )}
          {showDataFinal && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={'date'}
              is24Hour={true}
              display="default"
              onTouchCancel={() => setShowDataFinal(false)}
              onChange={(event, date) => {
                setShowDataFinal(false);
                setFilterDataFinal(moment(date).format('DD/MM/YYYY'));
              }}
            />
          )}
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={styles.pickerDate}>
              <Text>Data do lançamento:</Text>
              <View style={styles.date}>
                <TouchableOpacity onPress={() => setShowDataInicial(true)}>
                  <Input
                    label="Data inicial:"
                    value={filterDataInicial}
                    left={<TextInput.Icon icon="calendar" />}
                    editable={false}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setShowDataFinal(true)}>
                  <Input
                    label="Data final:"
                    value={filterDataFinal}
                    left={<TextInput.Icon icon="calendar" />}
                    editable={false}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {showDataInicialPagamento && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={'date'}
                is24Hour={true}
                display="default"
                onTouchCancel={() => setShowDataInicialPagamento(false)}
                onChange={(event, date) => {
                  setShowDataInicialPagamento(false);
                  setFilterDataInicialPagamento(
                      moment(date).format('DD/MM/YYYY'),
                  );
                }}
              />
            )}
            {showDataFinalPagamento && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={'date'}
                is24Hour={true}
                display="default"
                Pagamento
                onTouchCancel={() => setShowDataFinalPagamento(false)}
                onChange={(event, date) => {
                  setShowDataFinalPagamento(false);
                  setFilterDataFinalPagamento(
                      moment(date).format('DD/MM/YYYY'),
                  );
                }}
              />
            )}
            <View style={styles.pickerDate}>
              <Text>Data do pagamento:</Text>
              <View style={styles.date}>
                <TouchableOpacity
                  onPress={() => setShowDataInicialPagamento(true)}>
                  <Input
                    label="Data inicial:"
                    value={filterDataInicialPagamento}
                    left={<TextInput.Icon icon="calendar" />}
                    editable={false}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setShowDataFinalPagamento(true)}>
                  <Input
                    label="Data final:"
                    value={filterDataFinalPagamento}
                    left={<TextInput.Icon icon="calendar" />}
                    editable={false}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View style={styles.containerRadioItem}>
                <RadioButton
                  value="first"
                  status={filterOperacao === 0 ? 'checked' : 'unchecked'}
                  color={'#157E58'}
                  onPress={() => setFilterOperacao(0)}
                />
                <Text>Venda</Text>
              </View>
              <View style={styles.containerRadioItem}>
                <RadioButton
                  value="first"
                  status={filterOperacao === 1 ? 'checked' : 'unchecked'}
                  color={'red'}
                  onPress={() => setFilterOperacao(1)}
                />
                <Text>Compra</Text>
              </View>
            </View>
            <View style={styles.pickerContainer}>
              <Text>
                {filterOperacao === 0 ?
                  'Cliente:' :
                  filterOperacao === 1 ?
                    'Produtor' :
                    'Cliente/Produtor:'}
              </Text>
              {renderPessoas(filterOperacao)}
            </View>

            <View style={styles.pickerContainer}>
              <Text>Unidade:</Text>
              {renderUnidades()}
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Button
                style={styles.buttonFiltrar}
                onPress={closeFilter}
                mode="contained"
                color="#45818e">
                Voltar
              </Button>
              <Button
                style={styles.buttonFiltrar}
                onPress={limparFiltro}
                mode="contained"
                color="white">
                Limpar
              </Button>
              <Button
                style={styles.buttonFiltrar}
                onPress={filtrarNegociacoes}
                mode="contained"
                color="#157E58">
                Pesquisar
              </Button>
            </View>
          </View>
        </View>
      )}
    </Container>
  );
};

const summarySection = {
  backgroundColor: 'white',
  padding: 10,
  marginBottom: 10,
};

const summaryTitle = {
  fontWeight: 'bold',
  fontSize: 18,
};


const styles = StyleSheet.create({

  saldoDiaAnteriorContainer: {
    alignItems: 'center',
  },
  saldoDiaAnteriorTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5, // adiciona um espaço entre o título e o valor
  },

  saldoDiaValueContainer: {
    alignItems: 'center',
  },
  saldoDiaTitle: {
    marginTop: 15,
    fontWeight: 'bold',
    fontSize: 24,
    color: '#269F67',
  },
  saldoDiaValue: {
    fontSize: 20,
    marginTop: 8, // Espaço entre o título e o valor
    textAlign: 'center', // Centralizando horizontalmente

  },
    saldoDia: {
    fontSize: 18,
  },
    saldoDiaAnterior: {
    fontSize: 18,
  },

  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  bullet: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  whiteText: {
    color: '#FFFFFF',
    fontSize: 18,
  },


  filtroView: {
    paddingTop: 15,
    borderWidth: 2,
    borderColor: 'black',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: '73%',
    alignItems: 'center',
  },
  infoContainer: {
    backgroundColor: 'white',
    padding: 3,
    marginBottom: 0,
  },
  saldoDiaContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
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
  darkGreenbox: {
    flex: 1,
    backgroundColor: 'rgba(15, 89, 89, 1)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    padding: 20,
  },
  lightGreenbox: {
    flex: 1,
    backgroundColor: 'rgba(38, 159, 103, 1)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    padding: 20,
  },
  squareSummaryContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 8,
  },
  compraSaca: {
    color: 'white',
    fontSize: 20,
  },
  vendaSaca: {
    color: 'white',
    fontSize: 20,
  },
  expandIconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  buttonfilter: {
    backgroundColor: '#269F67',
    borderRadius: 20,
    width: '30%',
    height: '55%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 20,
  },
  negociacaoRecente: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerRadioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  pickerContainer: {
    marginVertical: 8,
  },
  picker: {
    height: 50,
    width: 150,
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  buttonFiltrar: {
    marginHorizontal: 10,
  },
  pickerDate: {
    alignItems: 'center',
  },
  date: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
});

export default Negociacao;
