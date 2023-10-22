import {StyleSheet,Text} from 'react-native';

export function Subtitle(props) {
    return (
        <Text style={styles.subtitle}>{props.text}</Text>
    )
}

export function FullDate(){
    const fullDate = () => {
        const data = new Date();
        const day = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"][data.getDay()];
        var month = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"][data.getMonth()];
        var year = data.getFullYear();
        return `${day}, ${data.getDate()} de ${month} de ${year}`;
    }

    return(
        <Text style={styles.fullDate}>{fullDate()}</Text>
    )
}

const styles = StyleSheet.create({
    subtitle: {
        color: '#fff',
        textAlign:'center',
        marginBottom:20,
        fontSize:15,
    },
    fullDate:{
        fontSize:18,
        marginBottom:15,
        color:'#fff'
    }
})