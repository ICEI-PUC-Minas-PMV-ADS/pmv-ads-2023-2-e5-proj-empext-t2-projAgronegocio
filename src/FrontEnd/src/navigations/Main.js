import PerfilRoute from './PerfilRoute';
import NegociacaoRoute from './NegociacaoRoute';
import NovaNegociacao from '../pages/NovaNegociacao';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const Main = () => {
  return (
    <Tab.Navigator
      initialRouteName="Negociacao"
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#6FCF97' },
        tabBarActiveTintColor: '#000000',
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        name="NegociacaoRoute"
        component={NegociacaoRoute}
        options={{
          tabBarLabel: 'Painel Principal',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="home-analytics"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="PerfilRoute"
        component={PerfilRoute}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="NovaNegociacao"
        component={NovaNegociacao}
        options={{
          tabBarLabel: 'Nova Negociação',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="grain" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Main;
