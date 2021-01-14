import React, { useState, useContext, useEffect, Fragment } from 'react';
import { Alert } from 'react-native'

import globalStyles from '../styles/globalStyles';

import { useNavigation } from '@react-navigation/native';

import OrdersContext from '../context/orders/OrdersContext';

import firestore from '@react-native-firebase/firestore';


import {
    Container,
    Content,
    Text,
    Button,
    H1,
    Input,
    List,
    ListItem,
    Body,
    Thumbnail,
    Footer,
    FooterTab
} from 'native-base';

const OrderResume = () => {

    const navigation = useNavigation()

    const { order, total, showResume, deleteItem, getOrderId } = useContext(OrdersContext);

    useEffect(() => {
        calcTotal();
    }, [order]);

    const calcTotal = () => {
        let newTotal = 0;
        newTotal = order.reduce((newTotal, item) => newTotal + item.total, 0);
        showResume(newTotal);
    }

    const confirmOrder = () => {
        Alert.alert('Confirm Order',
            'Are you sure? a confirm order cant be undone',
            [
                {
                    text: 'Confirm',
                    onPress: async () => {

                        const orderObj = {
                            deliveryTime: 0,
                            completed: false,
                            total: Number(total),
                            order: order,
                            created: Date.now()
                        }
                        
                        try {
                            const response = await firestore().collection('orders').add(orderObj);
                            getOrderId(response.id);
                        } catch (error) {
                            console.log(error);
                        }

                        navigation.navigate('OrderProgress');
                    }
                },
                {
                    text: 'Cancel',
                    style: 'cancel'
                }
            ]
        )
    }

    const confirmDelete = (id) => {
        Alert.alert('Delete Item',
            'Are you sure? a delete item cant be recovered.',
            [
                {
                    text: 'Confirm',
                    onPress: () => deleteItem(id)
                },
                {
                    text: 'Cancel',
                    style: 'cancel'
                }
            ]
        )
    }

    return (
        <Container style={globalStyles.container}>
            <Content style={globalStyles.content}>
                <H1 style={globalStyles.title}>Order Resume</H1>
                {order.map((item, i) => {
                    const { image, name, total, description, id } = item;
                    let globalTotal = globalTotal + total;
                    return (
                        <List key={id + i}>
                            <ListItem >
                                <Thumbnail large square source={{ uri: image }} />

                                <Body>
                                    <Text>{name}</Text>
                                    <Text note >{description}</Text>
                                    <Text>Subtotal: {''}
                                        <Text style={{ fontWeight: 'bold' }}>$ {total}</Text>
                                    </Text>
                                    <Button
                                        danger
                                        full
                                        style={{ marginTop: '3%', marginHorizontal: '4%' }}
                                        onPress={() => confirmDelete(id)}
                                    >
                                        <Text style={[globalStyles.buttonText, { color: '#fff' }]} >Delete Item</Text>
                                    </Button>
                                </Body>
                            </ListItem>
                        </List>
                    )
                })}

                <Text style={globalStyles.price}>Total: $ {total}</Text>
                <Button
                    full
                    style={{ backgroundColor: '#000' }}
                    onPress={() => navigation.navigate('Menu')}
                >
                    <Text style={[globalStyles.buttonText, { color: '#ffda00' }]}>Order more items</Text>
                </Button>
            </Content>
            <Footer>
                <FooterTab>
                    <Button
                        onPress={() => confirmOrder()}
                        style={globalStyles.button}>
                        <Text style={globalStyles.buttonText}>Confirm Order</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container >
    )
}

export default OrderResume;