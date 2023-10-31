import { Alert, Text, StyleSheet, View } from "react-native";
import { Dh, Dw } from "../common/Func";
import { ButtonRegistro, ButtonAction } from "../components/Buttons";
import { RadioGroup } from "../components/Radio";
import { Api } from "../api";
import { useState, useContext } from 'react';
import { AppContext } from '../context';
import * as Print from 'expo-print';

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

export function FolhaPagamento({ navigation }) {
    const context = useContext(AppContext);

    const [ano, setAno] = useState(null);
    const [mes, setMes] = useState(null);
    const [pagamentoDetalhes, setPagamentoDetalhes] = useState({
        id: 0,
        nome: '0',
        email: '0',
        tipo: '0',
        dataPagamento: null,
        valorPagamento: 0,
        handleClose: () => handleClose(false),
        isOpen: false,
    })

    async function handleExport() {
        const id = context.user.id;

        if (!ano || !mes) {
            handleAlert({ message: 'Ano ou mes não informados.', color: '#dd4444' })
            return;
        }
        const response = await Api.ObterPagamento(id, mes, ano);
        console.log('pagto=>', response);
        setPagamentoDetalhes({ ...pagamentoDetalhes, ...response });
        if (response?.valorPagamento > 0) {
            handleClose(true);
        } else {
            handleAlert({ message: 'Sem registros para a data informada.', color: '#dd4444' })
        }
    }

    const handleAlert = ( config ) =>
        context.onChangeTape({
            message: config?.message || 'Por favor, entre em contato com o RH.',
            color: config?.color
        });

    const handleClose = (value) => setPagamentoDetalhes(prev => ({ ...prev, isOpen: value }));

    return (
        <View style={styles.container}>
            {
                pagamentoDetalhes.isOpen
                    ? <PagamentoDetalhes {...pagamentoDetalhes} />
                    : null
            }
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
                <ButtonAction action={handleAlert} text='Ajuda' />
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
        position: 'relative'
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

export function PagamentoDetalhes(pagamento) {
    const { id, nome, email, tipo, dataPagamento, valorPagamento } = pagamento;

    async function handlePrint() {
        try {
            const { uri } = await Print.printToFileAsync();
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <View style={pagtoStyles.container}>
            <View>
                <Text style={pagtoStyles.title}>Recibo de Pagamento de Salário</Text>
                <View style={pagtoStyles.bordered}>
                    <Text>Empregador: Empresa de Sistemas de Software LTDA.</Text>
                    <Text>CNPJ: 00.000.000/0000-00</Text>
                    <Text>Data de referência: {dataPagamento}</Text>
                </View>
                <View style={pagtoStyles.bordered}>
                    <Text>Código do Funcionário: {id}</Text>
                    <Text>Nome: {nome}</Text>
                    <Text>Tipo Registro: {tipo}</Text>
                    <Text>Email: {email}</Text>
                </View>
                <View>
                    <Text style={pagtoStyles.title}>
                        Detalhes do Pagamento
                    </Text>
                </View>

                <View style={[pagtoStyles.bordered]}>
                    <View style={[pagtoStyles.row, { borderBottomWidth: 1, marginBottom: 10 }]}>
                        <View style={pagtoStyles.item}>
                            <Text>Decrição</Text>
                        </View>
                        <View style={pagtoStyles.item}>
                            <Text>Valor</Text>
                        </View>
                    </View>

                    <View style={[pagtoStyles.row]}>
                        <View style={pagtoStyles.item}>
                            <Text>INSS</Text>
                        </View>
                        <View style={pagtoStyles.item}>
                            <Text>R$ {(valorPagamento * .07).toFixed(2)}</Text>
                        </View>
                    </View>

                    <View style={[pagtoStyles.row]}>
                        <View style={pagtoStyles.item}>
                            <Text>IR</Text>
                        </View>
                        <View style={pagtoStyles.item}>
                            <Text>R$ {(valorPagamento * .08).toFixed(2)}</Text>
                        </View>
                    </View>

                    <View style={[pagtoStyles.row]}>
                        <View style={pagtoStyles.item}>
                            <Text>Salário Base</Text>
                        </View>
                        <View style={pagtoStyles.item}>
                            <Text>R$ {valorPagamento.toFixed(2)}</Text>
                        </View>
                    </View>
                    <View style={[pagtoStyles.row]}>
                        <View style={pagtoStyles.item}>
                            <Text>Total Desconto</Text>
                        </View>
                        <View style={pagtoStyles.item}>
                            <Text>R$ {(valorPagamento * .2).toFixed(2)}</Text>
                        </View>
                    </View>
                    <View style={[pagtoStyles.row, { marginTop: 10, borderTopWidth: 1 }]}>
                        <View style={pagtoStyles.item}>
                            <Text>Salário Líquido</Text>
                        </View>
                        <View style={[pagtoStyles.item]}>
                            <Text>R$ {(valorPagamento * .8).toFixed(2)}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View>
                <ButtonAction action={handlePrint} text='Imprimir' />
                <Text style={{ width: 10, color: 'transparent' }}>.</Text>
                <ButtonAction action={pagamento.handleClose} text='Fechar' />
            </View>
        </View>
    )
}

const pagtoStyles = StyleSheet.create({
    container: {
        backgroundColor: '#eee',
        width: Dw,
        height: Dh,
        position: 'absolute',
        bottom: 0,
        zIndex: 10,
        padding: 10,
        justifyContent: 'space-between'
    },
    bordered: {
        borderColor: '#333',
        borderStyle: 'solid',
        borderWidth: 1,
        padding: 10,
        marginTop: 15,
    },
    row: {
        flexDirection: 'row',
    },
    item: {
        width: '50%'
    },
    title: {
        fontSize: 18,
        marginTop: 10,
        fontWeight: '600',
    }
})