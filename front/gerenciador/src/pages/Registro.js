import { StyleSheet, Text, View } from "react-native";
import { ButtonRegistro, ButtonAction } from "../components/Buttons";
import { FullDate, Subtitle } from "../components/Texts";
import { Dh, Dw } from "../common/Func";
import { useEffect, useState } from "react";
import { Api } from "../api";


const tipoRegistro = {
    Entrada: 1,
    SaidaAlmoco: 2,
    VoltaAlmoco: 3,
    Saida: 4
}

export function Registro({ navigation }) {

    const [registros, setRegistros] = useState();
    const [ultimoRegistro, setUltimoRegistro] = useState();

    useEffect(() => {
        loadRegistros();
    }, []);

    async function loadRegistros() {
        const registrosResponse = await Api.ObterRegistros(1);
        setRegistros(registrosResponse);
        console.log(registrosResponse);
        const ultimo = registrosResponse.sort((a, b) => b.tipoRegistro - a.tipoRegistro)[0];
        setUltimoRegistro(ultimo);
    }

    async function handleRegistrarPonto(tipo) {
        const registro = {
            usuarioId: 1,
            tipoRegistro: tipo
        }

        await Api.RegistrarPonto(registro);
        loadRegistros();
    }

    return (
        <View style={styles.content}>
            <View style={styles.container}>
                <FullDate />
                <ButtonRegistro disabled={ultimoRegistro?.tipoRegistro >= tipoRegistro.Entrada} action={() => handleRegistrarPonto(tipoRegistro.Entrada)} text='Registrar Entrada' />
                {
                    ultimoRegistro?.tipoRegistro >= tipoRegistro.Entrada && <Subtitle text={registros.find(registro => registro.tipoRegistro === tipoRegistro.Entrada)?.dataRegistro.substr(11,8)} />
                }

                <ButtonRegistro disabled={ultimoRegistro?.tipoRegistro >= tipoRegistro.SaidaAlmoco} action={() => handleRegistrarPonto(tipoRegistro.SaidaAlmoco)} text='Registrar Saída Almoço' />
                {
                    ultimoRegistro?.tipoRegistro >= tipoRegistro.SaidaAlmoco && <Subtitle text={registros.find(registro => registro.tipoRegistro === tipoRegistro.SaidaAlmoco)?.dataRegistro.substr(11,8)} />
                }

                <ButtonRegistro disabled={ultimoRegistro?.tipoRegistro >= tipoRegistro.VoltaAlmoco} action={() => handleRegistrarPonto(tipoRegistro.VoltaAlmoco)} text='Registrar Volta Almoço' />
                {
                    ultimoRegistro?.tipoRegistro >= tipoRegistro.VoltaAlmoco && <Subtitle text={registros.find(registro => registro.tipoRegistro === tipoRegistro.VoltaAlmoco)?.dataRegistro.substr(11,8)} />
                }

                <ButtonRegistro disabled={ultimoRegistro?.tipoRegistro >= tipoRegistro.Saida} action={() => handleRegistrarPonto(tipoRegistro.Saida)} text='Registrar Saída' />
                {
                    ultimoRegistro?.tipoRegistro >= tipoRegistro.Saida && <Subtitle text={registros.find(registro => registro.tipoRegistro === tipoRegistro.Saida)?.dataRegistro.substr(11,8)} />
                }

            </View>
            <View style={styles.footer}>
                <ButtonAction action={() => { }} text='Ajuda' />
                <ButtonAction action={() => navigation.navigate('SolicitacaoAlteracao')} text='Revisar ponto' />
                <ButtonAction action={() => navigation.navigate('Home')} text='Voltar' />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        height: Dh,
        paddingBottom: 20,
        paddingTop: 20,
        alignItems: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        width: Dw * .8,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: Dw * .9
    },
})