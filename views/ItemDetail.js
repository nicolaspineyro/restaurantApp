import React, { useContext } from 'react';
import { Image } from 'react-native';

import globalStyles from '../styles/globalStyles';

import { useNavigation } from '@react-navigation/native';

import OrdersContext from '../context/orders/OrdersContext';

import { Container, Content, Footer, FooterTab, Button, Body, Text, H1, Card, CardItem } from 'native-base';

const ItemDetail = () => {

    const navigation = useNavigation();

    const { item } = useContext(OrdersContext);

    const { name, description, image, price } = item;

    return (
        <Container style={globalStyles.container}>
            <Content style={globalStyles.content}>
                <H1 style={globalStyles.title}>{name}</H1>

                <Card>
                    <CardItem>
                        <Body>
                            <Image style={globalStyles.image} source={{ uri: image }} />

                            <Text style={{ marginVertical: '3%', fontSize: 20 }}>{description}</Text>
                            <Text style={globalStyles.price}>Price: $ {price}</Text>
                        </Body>
                    </CardItem>
                </Card>
            </Content>
            <Footer>
                <FooterTab>
                    <Button
                        onPress={() => navigation.navigate('ItemForm')}
                        style={globalStyles.button}>
                        <Text style={globalStyles.buttonText}>Get {name}!</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
    )
}

export default ItemDetail;