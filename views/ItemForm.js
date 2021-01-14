import React, { useState, useContext, useEffect } from 'react';
import { Alert } from 'react-native'

import globalStyles from '../styles/globalStyles';

import { useNavigation } from '@react-navigation/native';

import OrdersContext from '../context/orders/OrdersContext';

import { Container, Content, Grid, Col, Text, Button, Form, H1, Input, Icon, Footer, FooterTab } from 'native-base';

const ItemForm = () => {

    const navigation = useNavigation();

    const { item, addItem } = useContext(OrdersContext);

    const [quantity, setQuantity] = useState(1);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        calcTotal();
    }, [quantity]);

    const calcTotal = () => {
        const total = item.price * quantity;
        setTotal(total)
    }

    const confirmOrder = () => {
        Alert.alert(
            'Confirm order?',
            'One confirm order cant be changed.',
            [
                {
                    text: 'Confirm',
                    onPress: () => {
                        const order = {
                            ...item,
                            quantity,
                            total
                        }

                        addItem(order);

                        navigation.navigate('OrderResume');
                        
                    }
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
                <Form>
                    <Text style={globalStyles.title}>Select how many</Text>
                    <Grid>
                        <Col>
                            <Button
                                dark
                                props
                                style={{ height: 80, width: '100%', justifyContent: 'center', borderRadius: 10 }}
                                onPress={() => setQuantity(quantity + 1)}
                            >
                                <Icon name='add' />
                            </Button>
                        </Col>
                        <Col>
                            <Input
                                keyboardType='numeric'
                                style={{ textAlign: 'center', fontSize: 20 }}
                                value={quantity.toString()}
                                onChangeText={(quantity) => setQuantity(quantity)}

                            />
                        </Col>
                        <Col>
                            <Button
                                dark
                                props
                                style={{ height: 80, width: '100%', justifyContent: 'center', borderRadius: 10 }}
                                onPress={() => quantity > 1 ? setQuantity(quantity - 1) : setQuantity(quantity)}
                            >
                                <Icon name='remove' />
                            </Button>
                        </Col>
                    </Grid>
                </Form>
                <Text style={globalStyles.price}>Subtotal: $ {total}</Text>
            </Content>
            <Footer>
                <FooterTab>
                    <Button
                        onPress={() => confirmOrder()}
                        style={globalStyles.button}>
                        <Text style={globalStyles.buttonText}>Get {name}!</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
    )
}

export default ItemForm;