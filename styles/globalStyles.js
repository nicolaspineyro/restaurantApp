import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        flex: 1,
        margin: '2.5%'
    },
    button: {
        backgroundColor: '#ffda00'
    },
    buttonText: {
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: '#000',
        fontSize: 15
    },
    image: {
        height: 300,
        width: '100%'
    },
    title: {
        textAlign: 'center',
        marginVertical: '5%',
        fontSize: 30, 
    },
    price: {
        fontWeight: 'bold',
        marginVertical: '3%',
        fontSize: 20,
        textAlign: 'center'
    }
});

export default globalStyles;