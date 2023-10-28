import { useEffect, useState, useContext } from 'react';
import { TextInput } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { Api } from '../api';
import { Dh, Dw } from "../common/Func";
import { ButtonRegistro, ButtonAction } from "../components/Buttons";
import { AppContext } from '../context';

export function Login({ navigation }) {
    const [usuario, setUsuario] = useState({
        email: '',
        senha: '',
    });

    const context = useContext(AppContext);

    useEffect(() => {
        if (context.user.id) {
            navigation.navigate('Home');
        }
    }, []);

    async function handleEntrar() {
        try {
            if (!usuario.email || !usuario.senha) {
                console.log('Dados não informados')
                return;
            }

            const response = await Api.Login(usuario);
            console.log('Resp =>', response);
            if (response[0].id > 0) {
                context.setUser(response[0]);
                navigation.navigate('Home');
            }
        }
        catch (err) {
            context.onChangeTape({
                message: 'Erro no login: ' + err,
            })
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <TextInput value={usuario.email} style={styles.input} placeholder='E-mail' onChange={e => setUsuario(prev => ({ ...prev, email: e.target.value }))} />
                <TextInput value={usuario.senha} secureTextEntry='*' style={styles.input} placeholder='Senha' onChange={e => setUsuario(prev => ({ ...prev, senha: e.target.value }))} />
                <ButtonRegistro action={handleEntrar} text='Entrar' />
                <ButtonAction action={() => navigation.navigate('Registrar')} text='Registrar' />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: Dh,
        paddingBottom: 20,
        paddingTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        width: Dw * .8,
    },
    input: {
        width: Dw * .7,
        backgroundColor: '#fff',
        height: 30,
        borderRadius: 5,
        marginBottom: 20,
        paddingLeft: 10,
    },
})