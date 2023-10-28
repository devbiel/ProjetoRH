import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Registro } from './src/pages/Registro';
import { SolicitacaoAlteracao } from './src/pages/SolicitacaoAlteracao';
import { FolhaPagamento } from './src/pages/FolhaPagamento';
import { Login } from './src/pages/Login';
import { Registrar } from './src/pages/Registrar';
import { Home } from './src/pages/Home';
import { AppContext } from './src/context';
import { Tape } from './src/components/Tape';
import { Dh, Dw } from "./src/common/Func";

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

  const [tape, setTape] = useState({
    color: null,
    message: null,
    isOpen: false,
  });

  function onChangeTape(config) {
    setTape({
      color: config.color,
      message: config.message,
      isOpen: true,
    });
    closeTape();
  }

  function closeTape() {
    setTimeout(() =>
      setTape(prev => ({ ...prev, isOpen: false })),
      3000
    )
  }

  return (
    <View style={styles.container}>
      {tape?.isOpen
        ? <Tape {...tape} />
        : null
      }
      <AppContext.Provider value={{ user: user, setUser: setUser, onChangeTape: onChangeTape }}>
        <NavigationContainer theme={Theme}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Registrar" component={Registrar} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="SolicitacaoAlteracao" component={SolicitacaoAlteracao} />
            <Stack.Screen name="Registro" component={Registro} />
            <Stack.Screen name="FolhaPagamento" component={FolhaPagamento} />
          </Stack.Navigator>
        </NavigationContainer>
      </AppContext.Provider>
    </View>
  );
}

const styles = StyleSheet.create(
  {
    container: {
      position:'relative',
      flexDirection:'column',
      width: Dw,
      height: Dh,
    }
  })