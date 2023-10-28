import { useState } from 'react';
import { TextInput } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { Api } from '../api';
import { Dh, Dw } from "../common/Func";
import { ButtonRegistro, ButtonAction } from "../components/Buttons";

export function Registrar() {
    const [usuario, setUsuario] = useState({
        nome: '',
        email: '',
        senha: '',
        confirmarSenha: '',
        tipoUsuario: 1,
    });

    const [isLoading, setIsLoading] = useState(false);

    function handleRegistrar() {
        setIsLoading(true);
        const { nome
            , email
            , senha
            , confirmarSenha
            , tipoUsuario } = usuario;

        if (
            !nome ||
            !email ||
            !senha ||
            !confirmarSenha ||
            !tipoUsuario ||
            senha !== confirmarSenha
        ) {
            console.log('Dados incorretos', usuario);
            setIsLoading(false);

            return;
        }

        const response = Api.Registrar(usuario);
        if (response) {
            navigation.navigate('Login');
        }
        setIsLoading(false);

    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <TextInput style={styles.input} placeholder='Nome' onChange={e => setUsuario(prev => ({ ...prev, nome: e.target.value }))} value={usuario.nome} />
                <TextInput style={styles.input} placeholder='E-mail' onChange={e => setUsuario(prev => ({ ...prev, email: e.target.value }))} value={usuario.email} />
                <TextInput style={styles.input} placeholder='Senha' onChange={e => setUsuario(prev => ({ ...prev, senha: e.target.value }))} value={usuario.senha} />
                <TextInput style={styles.input} placeholder='Confirmar Senha' onChange={e => setUsuario(prev => ({ ...prev, confirmarSenha: e.target.value }))} value={usuario.confirmarSenha} />
                <TextInput style={styles.input} placeholder='Tipo Usuário' onChange={e => setUsuario(prev => ({ ...prev, tipoUsuario: e.target.value }))} value={usuario.tipoUsuario} />
                <ButtonRegistro disabled={isLoading} action={handleRegistrar} text='Registrar' />

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