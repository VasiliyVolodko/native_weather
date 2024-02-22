import React, { createContext, useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SearchPage from './pages/SearchPage';
import CityWeatherPage from './pages/CityWeatherPage';
import { Provider, store } from './store/Root';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider value={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SearchPage">
          <Stack.Screen name="SearchPage" component={SearchPage} options={{ header: () => null }} />
          <Stack.Screen name="CityWeatherPage" component={CityWeatherPage} options={{ header: () => null }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
