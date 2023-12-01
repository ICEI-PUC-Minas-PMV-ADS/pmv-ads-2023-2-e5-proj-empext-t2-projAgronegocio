import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Perfil from '../pages/Perfil';
import MinhasNegociacoes from '../pages/MinhasNegociacoes';
import EditarNegociacao from '../pages/EditarNegociacao';

const Stack = createNativeStackNavigator();

const PerfilRoute = () => {
  return (
    <Stack.Navigator initialRouteName="Perfil">
      <Stack.Screen
        name="Perfil"
        component={Perfil}
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
        name="EditarNegociacao"
        component={EditarNegociacao}
        options={{
          header: () => null,
        }}
      />
    </Stack.Navigator>
  );
};

export default PerfilRoute;
