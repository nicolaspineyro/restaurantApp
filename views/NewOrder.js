import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Container, Text } from 'native-base'

import { useNavigation } from '@react-navigation/native';

import globalStyles from '../styles/globalStyles';

const NewOrder = () => {

    const navigation = useNavigation();

    return (
        <Container style={globalStyles.container}>
            <View style={[globalStyles.content, styles.content]}>
                <Button
                    style={globalStyles.button}
                    rounded
                    block
                    onPress={() => navigation.navigate('Menu')}
                >
                    <Text style={globalStyles.buttonText}>Create a new order</Text>
                </Button>
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    content: {
        flexDirection: 'column',
        justifyContent: 'center'
    }
})

export default NewOrder;