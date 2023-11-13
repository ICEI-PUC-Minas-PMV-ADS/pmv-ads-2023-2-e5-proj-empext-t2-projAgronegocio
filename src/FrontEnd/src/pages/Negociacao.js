import React, { useEffect, useState, useRef } from 'react';
import {
  ScrollView,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from 'react-native';
import {
  List,
  Text,
  FAB,
  IconButton,
  Icon,
  RadioButton,
  TextInput,
  Button,
} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import Header from '../components/Header';
import Container from '../components/Container';
import Body from '../components/Body';
import Input from '../components/Input';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import moment from 'moment';
import {
  getNegociacoes,
  getNegociacoesRecentes,
} from '../services/negociacao.services';
import Assets from '../assets/ImagemSoja2.jpg';
import { Modalize } from 'react-native-modalize';


import { getPessoas } from '../services/pessoas.services';
import { getUnidades } from '../services/unidades.services';

const Negociacao = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [expanded, setExpanded] = useState(false);
  const [negociacoes, setNegociacoes] = useState([]);
  const [negociacoesRecentes, setNegociacoesRecentes] = useState([]);
  const modalizeRef = useRef(null);

  const [filtrado, setFiltrado] = useState(negociacoes);

  const [filterDataInicial, setFilterDataInicial] = useState(
    moment(new Date()).format('DD/MM/YYYY')
  );
  const [filterDataFinal, setFilterDataFinal] = useState(
    moment(new Date()).format('DD/MM/YYYY')
  );
  
  const [filterDataInicialPagamento, setFilterDataInicialPagamento] = useState(
    moment(new Date()).format('DD/MM/YYYY')
  );
  const [filterDataFinalPagamento, setFilterDataFinalPagamento] = useState(
    moment(new Date()).format('DD/MM/YYYY')
  );
  const [filterUnidade, setFilterUnidade] = useState('');
  const [filterOperacao, setFilterOperacao] = useState('');
  const [filterCliente, setFilteCliente] = useState('');
  const [filterProdutor, setFilterProdutor] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDataInicial, setShowDataInicial] = useState(false);
  const [showDataFinal, setShowDataFinal] = useState(false);
  const [showDataInicialPagamento, setShowDataInicialPagamento] = useState(false);
  const [showDataFinalPagamento, setShowDataFinalPagamento] = useState(false);


  const [pessoas, setPessoas] = useState([]);
  const [pessoaSelecionada, setPessoaSelecionada] = useState([]);
  const [unidades, setUnidades] = useState([]);
  const [unidadeSelecionada, setUnidadeSelecionada] = useState(0);

  const onOpen = () => {
    modalizeRef.current?.open();
  };
  const onClose = () => {
    modalizeRef.current?.close();
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
      setNegociacoesRecentes(dadosR || []); // Adicionei uma verificação para garantir que negociacoes não seja nulo
    });
  }, [isFocused]);

  //const negociacoesFiltradas = useMemo(() => {}

  const filtrarNegociacoes = () => {
    const filtered = negociacoes.filter((x) => {
      return x.data_lancamento === 'Geovane' && x.valor_por_saca <= 20;
    });
    setFiltrado(filtered);
  };

  const renderPessoas = (tipoOp) => {
    produtor = pessoas
      .filter(function (item) {
        return item.tipo == 'Produtor';
      })
      .map(function ({ id, nome }) {
        return { id, nome };
      });

    cliente = pessoas
      .filter(function (item) {
        return item.tipo == 'Cliente';
      })
      .map(function ({ id, nome }) {
        return { id, nome };
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
        <Picker.Item color="#00000090" label="Selecione" value="" />
        {dadosPessoas.map((array) => {
          return <Picker.Item label={array.nome} value={array.id} />;
        })}
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
        <Picker.Item color="#00000090" label="Selecione" value="" />
        {unidades.map((array) => {
          return <Picker.Item label={array.razaoSocial} value={array.id} />;
        })}
      </Picker>
    ) : (
      <ActivityIndicator size="large" color="#6FCF97" />
    );
  };

  const renderNegociacoes = () => {
    const displayedNegociacoes = expanded
      ? negociacoesRecentes || []
      : (negociacoesRecentes || []).slice(0, 2);

    return (
      <View>
        {displayedNegociacoes.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate('NovaNegociacao', { item })}>
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
                  {item.valor_por_saca
                    ? `R$${item.valor_por_saca.toFixed(2)}`
                    : 'N/A'}
                </Text>
                <Text style={styles.labelText}>Valor total:</Text>
                <Text>
                  {item.valor_total
                    ? `R$${item.valor_total.toFixed(2)}`
                    : 'N/A'}
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

  const Separator = () => <View style={styles.separator} />;

  return (
    <Container>
      <Header title={'Agro Trade Monitor'} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.infoContainer}>
          <View style={styles.saldoDiaContainer}>
            <Text style={styles.saldoDia}>
              <Text
                style={{ fontWeight: 'bold', fontSize: 24, color: '#269F67' }}>
                Saldo X Dia
              </Text>
            </Text>
          </View>
          <View style={styles.saldoDiaAnteriorContainer}>
            <Text style={styles.saldoDiaAnterior}>
              <Text style={{ fontWeight: 'bold' }}>
                Saldo dia Anterior X Sacas
              </Text>
            </Text>
          </View>

          <View style={styles.negociacaoRecente}>
            <Text style={{ fontWeight: 'bold', fontSize:18 }}>Negociações Recentes</Text>
            <TouchableOpacity style={styles.buttonfilter} onPress={onOpen}>
              <Text style={{fontSize:16 }}>Filtrar</Text>
              <IconButton icon="filter-menu" color="#000" size={15} />
            </TouchableOpacity>
          </View>
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
        <Separator />
        <View style={styles.subtitleSession}>
          <Text style={styles.subtitleTex}> Consolidado do Dia Anterior </Text>
        </View>
        <View style={styles.horizontalSummarySession}>
          <View style={styles.squareSummaryContainer}>
            <View style={styles.darkGreenbox}>
              <Text style={styles.compraSaca}> Compra XXXX saca </Text>
            </View>
            <View style={styles.lightGreenbox}>
              <Text style={styles.vendaSaca}> Venda XXXX saca </Text>
            </View>
          </View>
        </View>
        <Separator />
        <View style={styles.subtitleSession}>
          <Text style={styles.subtitleTex}> Preços Mês Anterior </Text>
        </View>
        <View style={styles.horizontalSummarySession}>
          <View style={styles.squareSummaryContainer}>
            <View style={styles.darkGreenbox}>
              <Text style={styles.compraSaca}> Compra XXXX saca </Text>
            </View>
            <View style={styles.lightGreenbox}>
              <Text style={styles.vendaSaca}> Venda XXXX saca </Text>
            </View>
          </View>
        </View>
        <Separator />
        <View style={styles.subtitleSession}>
          <Text style={styles.subtitleTex}> Compras por Unidade </Text>
        </View>
        <View style={styles.verticalSummarySession}>
          <View style={styles.darkGreenbox}>
            <Text style={styles.locationTex}> Matriz Valor </Text>
            <Text style={styles.locationTex}> Filial Oeste Valor </Text>
            <Text style={styles.locationTex}> Filial Norte Valor </Text>
            <Text style={styles.locationTex}> Filial Sul Valor </Text>
          </View>
        </View>
        <Separator />
        <View style={styles.subtitleSession}>
          <Text style={styles.subtitleTex}> Vendas por Unidade </Text>
        </View>
        <View style={styles.verticalSummarySession}>
          <View style={styles.lightGreenbox}>
            <Text style={styles.locationTex}> Matriz Valor </Text>
            <Text style={styles.locationTex}> Filial Oeste Valor </Text>
            <Text style={styles.locationTex}> Filial Norte Valor </Text>
            <Text style={styles.locationTex}> Filial Sul Valor </Text>
          </View>
        </View>
      </ScrollView>
      <Modalize 
        ref={modalizeRef} 
        HeaderComponent={
          <Text style={{fontSize:18, fontWeight:'bold', alignSelf:'center', marginVertical:10}}>Filtrar por</Text>} 
        adjustToContentHeight={true}
        >
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
              setFilterDataInicialPagamento(moment(date).format('DD/MM/YYYY'));
            }}
          />
        )}
        {showDataFinalPagamento && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={'date'}
            is24Hour={true}
            display="default"Pagamento
            onTouchCancel={() => setShowDataFinalPagamento(false)}
            onChange={(event, date) => {
              setShowDataFinalPagamento(false);
              setFilterDataFinalPagamento(moment(date).format('DD/MM/YYYY'));
            }}
          />
        )}
          <View style={styles.pickerDate}>
            <Text>Data do pagamento:</Text>  
            <View style={styles.date}>      
            <TouchableOpacity onPress={() => setShowDataInicialPagamento(true)}>
              <Input
                label="Data inicial:"
                value={filterDataInicialPagamento}
                left={<TextInput.Icon icon="calendar" />}
                editable={false}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowDataFinalPagamento(true)}>
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
            <Text>{filterOperacao === 0 ? 'Cliente:' : 'Produtor:'}</Text>
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
              onPress={onClose} 
              mode="contained"
              color="#F2B66D">
              Voltar
            </Button>
             <Button
              style={styles.buttonFiltrar}
              onPress= {()=>{console.log("Limpar  filtro")} }
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
      </Modalize>
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
    fontSize: 16,
  },
  vendaSaca: {
    color: 'white',
    fontSize: 16,
  },
  expandIconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  buttonfilter: {
    backgroundColor: '#269F67',
    borderRadius: 20,
    width: '30%',
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  negociacaoRecente: {
    padding:10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerRadioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  pickerContainer: {
    marginVertical: 8
  },
  picker: {
    height: 50,
    width: 150,
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  buttonFiltrar: {
    margin: 8
  },
  pickerDate: {
    alignItems: 'center', 
  },
  date:{
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginVertical: 8
  }
});

export default Negociacao;
