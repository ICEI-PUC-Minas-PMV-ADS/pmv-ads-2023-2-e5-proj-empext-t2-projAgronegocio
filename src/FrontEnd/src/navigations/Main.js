import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../pages/Home';
import Negociacao from '../pages/Negociacao';
import NovaNegociacao from '../pages/NovaNegociacao';
import MinhasNegociacoes from '../pages/MinhasNegociacoes';
import DetalhesNegociacao from '../pages/DetalhesNegociacao';

const Stack = createNativeStackNavigator();

const Main = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="Negociacao"
        component={Negociacao}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="NovaNegociacao"
        component={NovaNegociacao}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="MinhasNegociacoes"
        component={MinhasNegociacoes}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="DetalhesNegociacao"
        component={DetalhesNegociacao}
        options={{
          header: () => null,
        }}
      />
    </Stack.Navigator>
  );
};

export default Main;
