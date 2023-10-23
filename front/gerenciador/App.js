import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Registro } from './src/pages/Registro';
import { SolicitacaoAlteracao } from './src/pages/SolicitacaoAlteracao';
import { FolhaPagamento } from './src/pages/FolhaPagamento';
import { Login } from './src/pages/Login';
import { Registrar } from './src/pages/Registrar';
import { Home } from './src/pages/Home';
import { AppContext } from './src/context';
import {useState} from 'react';

const Stack = createNativeStackNavigator();

const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#1e90ff'
  },
};

export default function App() {
  const [user, setUser] = useState({
    id: 0,
    nome: '',
    email: '',
    tipoId: 0,
  });

  return (
    <AppContext.Provider value={{ user: user, setUser: setUser }}>
      <NavigationContainer theme={Theme}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SolicitacaoAlteracao" component={SolicitacaoAlteracao} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Registrar" component={Registrar} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Registro" component={Registro} />
          <Stack.Screen name="FolhaPagamento" component={FolhaPagamento} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
}