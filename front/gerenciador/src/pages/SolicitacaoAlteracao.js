import { StyleSheet, Text, View } from "react-native";
import { ButtonRegistro, ButtonAction } from "../components/Buttons";
import { FullDate, Subtitle } from "../components/Texts";
import { Dh, Dw } from "../common/Func";

/*
TODO: 
[] Alterar registro de ponto do dia atual

*/

export function SolicitacaoAlteracao({navigation}) {
    

    return (
            <View style={styles.content}>
                <View style={styles.container}>
                    <FullDate/>
    
                    <ButtonRegistro action={() => { }} text='Solicitar Alteração Entrada' />
                    <Subtitle text='13:00' />
    
                    <ButtonRegistro action={() => { }} text='Solicitar Alteração Saída Almoço' />
                    <Subtitle text='13:00' />
    
                    <ButtonRegistro action={() => { }} text='Solicitar Alteração Volta Almoço' />
                    <Subtitle text='13:00' />
    
                    <ButtonRegistro action={() => { }} text='Solicitar Alteração Saída' />
                    <Subtitle text='13:00' />
    
                </View>
                <View style={styles.footer}>
                    <ButtonAction action={() => navigation.navigate('Home')} text='Voltar' />
                    <ButtonAction action={() => { }} text='Ajuda' />
                    <ButtonAction action={() => {}} text='Salvar' />
                </View>
    
            </View>
        )
    }
    
    const styles = StyleSheet.create({
        content: {
            alignItems:'center',
            height:Dh,
            paddingBottom:20,
            paddingTop:20,
        },
        container: {
            flex:1
        },
        footer: {
            flexDirection:'row',
            justifyContent:'space-between',
            width:Dw*.9
        },
    })