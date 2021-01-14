import React, { useContext, useEffect, useState } from 'react';
import { Text, Container, View, H1, Button } from 'native-base';
import { StyleSheet } from 'react-native';

import OrdersContext from '../context/orders/OrdersContext';

import firestore from '@react-native-firebase/firestore';

import globalStyles from '../styles/globalStyles';

import {useNavigation} from '@react-navigation/native';

const OrderProgress = () => {

    const navigation = useNavigation();

    const { orderId } = useContext(OrdersContext);

    const [deliveryTime, setDeliveryTime] = useState(0);
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        getProduct();
    }, [])

    const getProduct =  () => {
        try {
            firestore().collection('orders').doc(orderId).onSnapshot((doc) => {
                setDeliveryTime(doc.data().deliveryTime);
                setCompleted(doc.data().completed)
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container style={globalStyles.container}>
            <View style={[globalStyles.content, { marginTop: 50 }]}>
                {deliveryTime === 0 && (
                    <>
                        <Text style={{ textAlign: 'center' }}>Order received</Text>
                        <Text style={{ textAlign: 'center' }}>Calculating delivery time...</Text>
                    </>
                )}
                {deliveryTime > 0 && !completed && (
                    <>
                        <Text style={{ textAlign: 'center' }}>Your order will be ready in:</Text>
                        <Text style={styles.time}>{deliveryTime}:00</Text>
                    </>
                )}
                {completed && (
                    <>
                        <H1 style={styles.completed}>Order ready</H1>
                        <Text style={styles.completed}> Your order has been completed, please go to the counter to pick it up.</Text>
                        <Button
                            style={globalStyles.button}
                            full
                            rounded
                            onPress={() => navigation.navigate('NewOrder')}
                        >
                            <Text style={globalStyles.buttonText}>Order more items</Text>
                        </Button>
                    </>
                )}
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    time: {
        fontWeight: 'bold',
        fontSize: 50,
        textAlign: 'center'
    },
    completed: {
        textAlign: 'center',
        textTransform: 'uppercase',
        marginBottom: 20
    }
})

export default OrderProgress;