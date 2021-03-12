import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import { Root, Spinner } from 'native-base';
import Login from './screens/Login';
import Home from './screens/Home';
import SplashScreen from './screens/SplashScreen';
import { isLoggedIn, logout } from './services/auth-service';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Investments from './screens/Investments';
import Investment from './screens/Investment';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
class App extends Component {
  state = {
    loggedIn: false,
    loading: true
  }

  async componentDidMount() {
    // logout();
    const loggedIn = await isLoggedIn();
    this.setState({loggedIn, loading: false})
  }

  async componentDidUpdate() {
    const loggedIn = await isLoggedIn();
    this.setState({loggedIn})
  }

  render() { 
    return (
      <Root>
        <NavigationContainer style={ styles.container }>
        <Stack.Navigator headerMode="none">
          {this.state.loading && 
              <Stack.Screen name="SplashScreen" component={SplashScreen} />
          }
          { this.state.loggedIn ? 
              <>
              <Stack.Screen name="Home" component={ Home }  />
              <Stack.Screen name="Investments" component={ Investments }  />
              <Stack.Screen name="Investment" component={ Investment }  />
              </>
            :
              <Stack.Screen name="Login" component={ Login } options={{ title: '' }} />
          }
          </Stack.Navigator>
        </NavigationContainer>
      </Root>

    );
  }
}
 
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
