import { StyleSheet, Text, View } from "react-native";
import { Dh, Dw } from "../common/Func";

export function Tape(props) {
    return (
        <View style={[styles.container, { backgroundColor: props?.color ? props.color : '#33AA33' }]}>
            <Text style={styles.text}>{props.message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: Dw,
        height: Dh * .08,
        position: 'absolute',
        top: 0,
        zIndex: 10,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft:10,
        paddingRight:10,
    },
    text: {
        fontSize: 14,
        color: '#FFF',
        opacity:.9,
        textAlign:'justify'
    }
})