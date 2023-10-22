import { useEffect, useState } from "react";
import { Pressable, Text, StyleSheet, View } from "react-native";

export function RadioGroup(props) {

    const [items, setItems] = useState();

    useEffect(() => {
        const _items = props.items.map(item => ({
            value: item.value,
            text: item.text,
            selected: false,
        }));

        setItems(_items.sort((a, b) => a.value - b.value));
    }, [])

    const onSelectItem = (item) => {
        const _items = [...items];
        _items.forEach(_item => {
            _item.selected = _item.value === item.value
        }
        );
        setItems(_items.sort((a, b) => a.value - b.value));
        props.action(item.value)
    }

    return (
        <View>
            {
                items?.map(item =>
                    <Pressable style={styles.content} onPress={() => onSelectItem(item)} key={item.value}>
                        <View style={item?.selected ? styles.radioSelected : styles.radioUnselected}></View>
                        <Text style={styles.text}>{item.text}</Text>
                    </Pressable>)
            }
        </View>
    )
}

const styles = StyleSheet.create({
    content:{
        flexDirection:'row',
        marginTop:10,
        alignItems:'center',
    },
    text:{
        marginLeft:5,
        fontSize:18,
        color:'#fff',
    },
    radioSelected: {
        width: 20,
        height: 20,
        borderRadius: '50%',
        borderColor: '#000',
        backgroundColor: '#000'
    },
    radioUnselected: {
        width: 20,
        height: 20,
        borderRadius: '50%',
        borderColor: '#000',
        backgroundColor: '#fff',
        borderWidth: 1,
    },
})