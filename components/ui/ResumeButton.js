import React, { useContext } from 'react';

import { Button, Text } from 'native-base';
import globalStyles from '../../styles/globalStyles';

import { useNavigation } from '@react-navigation/native';

import OrdersContext from '../../context/orders/OrdersContext'

const ResumeButton = () => {
    const navigation = useNavigation();

    const { order } = useContext(OrdersContext);



    if (order.length === 0) return null;

    return (
        <Button style={globalStyles.button}
            onPress={() => navigation.navigate('OrderResume')}
        >
            <Text style={globalStyles.buttonText}>My Order</Text>
        </Button>
    )
}

export default ResumeButton;