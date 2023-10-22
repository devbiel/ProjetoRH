import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Registro } from './src/pages/Registro';
import { SolicitacaoAlteracao } from './src/pages/SolicitacaoAlteracao';
import { FolhaPagamento } from './src/pages/FolhaPagamento';
import { Login } from './src/pages/Login';
import { Registrar } from './src/pages/Registrar';
import { Home } from './src/pages/Home';

const Stack = createNativeStackNavigator();

const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#1e90ff'
  },
};

export default function App() {
  return (
    <NavigationContainer theme={Theme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Registro" component={Registro} />
        <Stack.Screen name="SolicitacaoAlteracao" component={SolicitacaoAlteracao} />
        <Stack.Screen name="FolhaPagamento" component={FolhaPagamento} />        
        <Stack.Screen name="Registrar" component={Registrar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}