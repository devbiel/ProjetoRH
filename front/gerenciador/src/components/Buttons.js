import { Pressable, StyleSheet, Text } from "react-native";
import { Dw } from '../common/Func';

export function ButtonRegistro( props ) {
    return (
        <Pressable
            style={styles.registro}
            onPress={props.action}
            disabled={props?.disabled}
        >
            <Text style={[styles.textRegistro,{textDecoration: props?.disabled ? 'line-through':''}]}>{props.text}</Text>
        </Pressable>
    )
}

export function ButtonAction( props ){
    return (
        <Pressable
            style={styles.action}
            onPress={props.action}
        >
            <Text style={styles.text}>{props.text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create(
    {
        registro: {
            justifyContent:'center',
            alignItems:'center',
            backgroundColor: '#ddd',
            borderRadius: 5,
            height: 50,
            width: Dw * .7,
            marginBottom:10,
        },
        action: {
            justifyContent:'center',
            alignItems:'center',
            backgroundColor: '#4169E1',
            borderRadius: 5,
            height: 40,
            paddingLeft:15,
            paddingRight:15,
            textAlign:'center',
        },
        text:{
            color:'#fff'
        },
        textRegistro:{
            color:'#000'
        }
    }
)