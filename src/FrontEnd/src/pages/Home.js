import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { BottomNavigation, Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

import NovaNegociacao from './NovaNegociacao';
import Negociacao from './Negociacao';
import Perfil from './Perfil';

const Home = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'negociacao', title: 'Painel Principal', icon: 'home-analytics' },
    { key: 'perfil', title: 'Perfil', icon: 'account' },
    { key: 'novaNegociacao', title: 'Nova Negociação', icon: 'grain' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    negociacao: Negociacao,
    novaNegociacao: NovaNegociacao,
    perfil: Perfil,
  });

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        barStyle={{ backgroundColor: '#6FCF97' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;