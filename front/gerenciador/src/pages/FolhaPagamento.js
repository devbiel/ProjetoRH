import { Text, StyleSheet, View, TextInput } from "react-native";
import { Dh, Dw } from "../common/Func";
import { ButtonRegistro, ButtonAction } from "../components/Buttons";
import { RadioGroup } from "../components/Radio";
import { Api } from "../api";
import {useState} from 'react';

const anos = [
    { value: 2020, text: '2020' },
    { value: 2021, text: '2021' },
    { value: 2022, text: '2022' },
    { value: 2023, text: '2023' },
];

const meses = [
    { value: 1, text: 'Janeiro' },
    { value: 2, text: 'Fevereiro' },
    { value: 3, text: 'Março' },
    { value: 4, text: 'Abril' },
    { value: 5, text: 'Maio' },
    { value: 6, text: 'Junho' },
    { value: 7, text: 'Julho' },
    { value: 8, text: 'Agosto' },
    { value: 9, text: 'Setembro' },
    { value: 10, text: 'Outubro' },
    { value: 11, text: 'Novembro' },
    { value: 12, text: 'Dezembro' },
];

export function FolhaPagamento() {

    const [ano, setAno] = useState(null);
    const [mes, setMes] = useState(null);

    async function handleExport(){
        const id = 1;

        if(!ano || !mes){
            console.log('Ano ou mes não informados');
            return;
        }
        const response = await Api.ObterPagamento(id,mes,ano);
        console.log('pagto=>',response);
    }

    return (
        <View style={styles.container}>
            <View style={styles.contentInput}>
                <View>
                    <Text style={styles.text}>Ano:</Text>
                    {
                        <RadioGroup items={anos} action={ano => setAno(ano)} />
                    }
                </View>
                <View>
                    <Text style={styles.text}>Mês:</Text>
                    {
                        <RadioGroup items={meses} action={mes => setMes(mes)} />
                    }
                </View>
            </View>
            <View style={styles.content}>
                <ButtonRegistro action={handleExport} text='Exportar PDF' />
            </View>
            <View style={styles.footer}>
                <ButtonAction action={() => navigation.navigate('')} text='Ajuda' />
                <ButtonAction action={() => navigation.navigate('Home')} text='Voltar' />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        height: Dh,
        paddingBottom: 20,
        paddingTop: 20,
    },
    content: {
        marginBottom: 50,
    },
    contentInput: {
        flex: 1,
        width: Dw * .8,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: Dw * .9
    },
    input: {
        backgroundColor: '#eee',
        height: 40,
        borderRadius: 5,
        paddingLeft: 10,
        paddingRight: 10,
    },
    text: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold'
    },
})