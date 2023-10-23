import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput } from "react-native";
import { ButtonRegistro, ButtonAction } from "../components/Buttons";
import { FullDate, Subtitle } from "../components/Texts";
import { Dh, Dw } from "../common/Func";
import { AppContext } from '../context';
import { Api } from "../api";

export function SolicitacaoAlteracao({ navigation }) {
    const context = useContext(AppContext);
    const [registros, setRegistros] = useState();

    useEffect(() => {
        loadRegistros();
    }, []);

    async function loadRegistros() {
        const registrosResponse = await Api.ObterRegistros(context.user.id);
        const _registros = registrosResponse.map(r => ({
            id: r.id,
            usuarioId: r.usuarioId,
            tipoRegistro: r.tipoRegistro,
            dataRegistro: r.dataRegistro,
            hora: (new Date(r.dataRegistro))?.getHours(),
            minuto: (new Date(r.dataRegistro))?.getMinutes()
        }));

        setRegistros(_registros);
        console.log(registrosResponse)
    }

    function getHora(tipo) {
        const response = registros.find(r => r.tipoRegistro === tipo)?.hora;
        return response;
    }

    function getMinutos(tipo) {
        const response = registros.find(r => r.tipoRegistro === tipo)?.minuto;
        return response;
    }

    function handleSetHora(valor, tipo) {
        const registro = registros.find(r => r.tipoRegistro === tipo);
        console.log(registro);
        const _registros = registros.filter(r => r.tipoRegistro !== tipo);
        console.log(_registros)
        setRegistros([..._registros, { ...registro, hora: (valor > 23 || valor < 0) ? 0 : valor }]);

    }

    function handleSetMinutos(valor, tipo) {
        const registro = registros.find(r => r.tipoRegistro === tipo);
        console.log(registro);
        const _registros = registros.filter(r => r.tipoRegistro !== tipo);
        console.log(_registros)
        setRegistros([..._registros, { ...registro, minuto: (valor > 59 || valor < 0) ? 0 : valor }]);
    }

    async function handleSalvar() {
        console.log(registros);
        await Api.AlterarPonto(registros);
      //  navigation.navigate('Home');
    }

    function isReadyOnly(tipo) {
        const registro = registros.find(r => r.tipoRegistro === tipo);
        return !registro?.tipoRegistro;
    }

    return (
        <View style={styles.content}>
            <View style={styles.container}>
                <FullDate />
                {
                    registros?.length
                    ? (
                        <>
                            <ButtonRegistro action={() => { }} text='Solicitar Alteração Entrada' />
                            <View style={styles.row}>
                                <TextInput readOnly={isReadyOnly(1)}
                                    inputMode={'numeric'}
                                    style={styles.inputHora}
                                    value={getHora(1)}
                                    onChange={e => handleSetHora(e.target.value, 1)}
                                />
                                <TextInput readOnly={isReadyOnly(1)}
                                    inputMode={'numeric'}
                                    style={styles.inputHora}
                                    value={getMinutos(1)}
                                    onChange={e => handleSetMinutos(e.target.value, 1)}
                                />
                            </View>

                            <ButtonRegistro action={() => { }} text='Solicitar Alteração Saída Almoço' />
                            <View style={styles.row}>
                                <TextInput readOnly={isReadyOnly(2)}
                                    inputMode={'numeric'}
                                    style={styles.inputHora}
                                    value={getHora(2)}
                                    onChange={e => handleSetHora(e.target.value, 2)}
                                />
                                <TextInput readOnly={isReadyOnly(2)}
                                    inputMode={'numeric'}
                                    style={styles.inputHora}
                                    value={getMinutos(2)}
                                    onChange={e => handleSetMinutos(e.target.value, 2)}
                                />
                            </View>

                            <ButtonRegistro action={() => { }} text='Solicitar Alteração Volta Almoço' />
                            <View style={styles.row}>
                                <TextInput readOnly={isReadyOnly(3)}
                                    inputMode={'numeric'}
                                    style={styles.inputHora}
                                    value={getHora(3)}
                                    onChange={e => handleSetHora(e.target.value, 3)}
                                />
                                <TextInput readOnly={isReadyOnly(3)}
                                    inputMode={'numeric'}
                                    style={styles.inputHora}
                                    value={getMinutos(3)}
                                    onChange={e => handleSetMinutos(e.target.value, 3)}
                                />
                            </View>

                            <ButtonRegistro action={() => { }} text='Solicitar Alteração Saída' />
                            <View style={styles.row}>
                                <TextInput readOnly={isReadyOnly(4)}
                                    inputMode={'numeric'}
                                    style={styles.inputHora}
                                    value={getHora(4)}
                                    onChange={e => handleSetHora(e.target.value, 4)}
                                />
                                <TextInput readOnly={isReadyOnly(4)}
                                    inputMode={'numeric'}
                                    style={styles.inputHora}
                                    value={getMinutos(4)}
                                    onChange={e => handleSetMinutos(e.target.value, 4)}
                                />
                            </View>
                        </>
                    ):null
                }
            </View>
            <View style={styles.footer}>
                <ButtonAction action={() => navigation.navigate('Home')} text='Voltar' />
                <ButtonAction action={() => { }} text='Ajuda' />
                <ButtonAction action={handleSalvar} text='Salvar' />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        alignItems: 'center',
        height: Dh,
        paddingBottom: 20,
        paddingTop: 20,
    },
    container: {
        flex: 1
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: Dw * .9
    },
    inputHora: {
        borderRadius: 5,
        width: 30,
        height: 30,
        backgroundColor: '#fff',
        marginLeft: 5,
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
        justifyContent: 'center',
    },
})