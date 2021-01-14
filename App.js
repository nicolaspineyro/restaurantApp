import React, { useContext } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ItemDetail from './views/ItemDetail';
import ItemForm from './views/ItemForm';
import OrderResume from './views/OrderResume';
import Menu from './views/Menu';
import NewOrder from './views/NewOrder';
import OrderProgress from './views/OrderProgress';

import ResumeButton from './components/ui/ResumeButton';

import FirebaseState from './context/firebase/FirebaseState';
import OrdersState from './context/orders/OrdersState';

const Stack = createStackNavigator();

const App = () => {

  return (
    <>
      <FirebaseState>
        <OrdersState>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerTitleAlign: 'center',
                headerStyle: {
                  backgroundColor: '#FFDA00',
                },
                headerTitleStyle: {
                  fontWeight: 'bold'
                }
              }}
            >
              <Stack.Screen
                name='NewOrder'
                component={NewOrder}
                options={{
                  title: 'New Order'
                }}
              />
              <Stack.Screen
                name='ItemDetail'
                component={ItemDetail}
                options={{
                  title: 'Item Detail'
                }}
              />
              <Stack.Screen
                name='ItemForm'
                component={ItemForm}
                options={{
                  title: 'Item Form'
                }}
              />
              <Stack.Screen
                name='OrderResume'
                component={OrderResume}
                options={{
                  title: 'Order Resume'
                }}
              />
              <Stack.Screen
                name='Menu'
                component={Menu}
                options={{
                  title: 'Menu',
                  headerRight: (props) => <ResumeButton />
                }}
              />
              <Stack.Screen
                name='OrderProgress'
                component={OrderProgress}
                options={{
                  title: 'Order Progress'
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </OrdersState>
      </FirebaseState>
    </>
  );
};



export default App;
