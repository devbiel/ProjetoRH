import { View, Text, StyleSheet } from 'react-native';
import { ButtonRegistro } from "../components/Buttons";
import { Dh } from '../common/Func';

export function Home({ navigation }) {
    return (
        <View style={styles.container}>
            <ButtonRegistro action={() => navigation.navigate('Registro')} text='Registro' />
            <ButtonRegistro action={() => navigation.navigate('SolicitacaoAlteracao')} text='Solicitar Alteração de Ponto' />
            <ButtonRegistro action={() => navigation.navigate('FolhaPagamento')} text='Consultar Folha de Pagamento' />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent:'center',
        height: Dh,
    }
})