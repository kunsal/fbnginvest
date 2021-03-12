import React, { Component } from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import { Container, Spinner } from 'native-base';

class SplashScreen extends Component {

  render() { 
    return ( 
      <Container style={styles.container}>
        <View style={{ alignItems: 'center', paddingTop: 20}}>
          <Image source={require('../assets/icon.png')} style={styles.logo} />
          <Text style={styles.appName}>FBNGInvest</Text>
        </View>
      </Container>
    );
  }
}
 
export default SplashScreen;

const styles = StyleSheet.create({ 
  container:  { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  logo: {
    width: 50,
    resizeMode: 'contain'
  },
  appName: {
    color: '#022e64',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: -25
  }
})