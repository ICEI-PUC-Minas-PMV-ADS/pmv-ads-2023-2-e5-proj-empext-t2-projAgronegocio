import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Negociacao from '../pages/Negociacao';
import DetalhesNegociacao from '../pages/DetalhesNegociacao';

const Stack = createNativeStackNavigator();

const NegociacaoRoute = () => {
  return (
    <Stack.Navigator initialRouteName="Negociacao">
      <Stack.Screen
        name="Negociacao"
        component={Negociacao}
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

export default NegociacaoRoute;
