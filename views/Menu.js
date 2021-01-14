import React, { Fragment, useContext, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import FirebaseContext from '../context/firebase/FirebaseContext';
import OrdersContext from '../context/orders/OrdersContext';

import globalStyles from '../styles/globalStyles';

import {
    Container,
    Separator,
    Content,
    List,
    ListItem,
    Thumbnail,
    Text,
    Body
} from 'native-base';

const Menu = () => {

    const navigation = useNavigation();

    const { getProducts, menu } = useContext(FirebaseContext);
    const { selectItem } = useContext(OrdersContext);

    useEffect(() => {
        getProducts();
    }, []);

    const showHeadline = (type, i) => {
        if (i > 0) {
            const lastType = menu[i - 1].type;
            if (lastType !== type) {
                return (
                    <Separator>
                        <Text>{type}</Text>
                    </Separator>
                )
            }
        } else {
            return (
                <Separator style={styles.separator}>
                    <Text style={styles.separatorText} >{type}</Text>
                </Separator>
            )
        }
    }

    return (
        <Container style={globalStyles.container}>
            <Content>
                <List>
                    {menu.map((item, i) => {

                        const { name, description, id, price, image, type } = item;

                        return (
                            <Fragment key={id}>
                                {showHeadline(type, i)}
                                <ListItem
                                    onPress={() => {
                                        selectItem(item);
                                        navigation.navigate('ItemDetail');
                                    }}
                                >
                                    <Thumbnail large square source={{ uri: image }} />

                                    <Body>
                                        <Text>{name}</Text>
                                        <Text note >{description}</Text>
                                        <Text>Price: {''}
                                            <Text style={{ fontWeight: 'bold' }}>$ {price}</Text>
                                        </Text>
                                    </Body>
                                </ListItem>
                            </Fragment>
                        )

                    })}
                </List>
            </Content>
        </Container>
    )
}

const styles = StyleSheet.create({
    separator: {
        backgroundColor: '#000'
    },
    separatorText: {
        color: '#ffda00',
        fontWeight: 'bold',
        fontSize: 20
    }
})

export default Menu;