import React, { Component } from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import { Container, Form, Item, Input, Content, Label, Button, Spinner } from 'native-base';
import notify from './utils/notify';

class Login extends Component {
  state = { 
    email: '',
    password: '',
    loading: false
  }

  handleInputChange = (text, field) => {
    this.state[field] = text;
  }

  handleLogin = async () => {
    this.setState({loading: true});
    const {email, password} = this.state;
    if (email != '' && password != '') {
      try {
        const response = await login(email, password);
        if ('error' in response) {
          this.setState({loading: false});
          return notify(response.message);
        } 
        else {
          const favorites = await hotelService.getFavorites();
          this.props.getUserFavs(favorites.data);
          this.setState({email: '', password: ''});
          this.props.navigation.navigate('SideMenu');
        } 
      } catch (err) {
        console.log(err);
        this.setState({loading: false});
        return notify('Error occurred. Try again' + err)
      }
      
    } else {
      this.setState({loading: false});
      return notify('Email and password are required')
    }
  }

  render() { 
    return ( 
      <Container style={{ backgroundColor: '#e0ad0f' }}>
        <View style={{ alignItems: 'center', paddingTop: 30}}>
          <Image source={require('../assets/icon.png')} style={styles.logo} />
          <Text style={styles.appName}>FBNGInvest</Text>
        </View>
        <Content style={{ marginTop: 100}}>
          <Text style={{ alignSelf: 'center'}}>Login to your Account</Text>
          <Form style={{ width: '80%', alignSelf: "center"}}>
            <View style={{ marginVertical: 20 }}>
              <Item floatingLabel>
                <Label>Username</Label>
                <Input onChangeText={(text) => this.handleInputChange(text, 'email')}/>
              </Item>
              <Item floatingLabel>
                <Label>Password</Label>
                <Input secureTextEntry onChangeText={(text) => this.handleInputChange(text, 'password')}/>
              </Item>
            </View>
          
            {this.state.loading ? <Spinner color='blue' /> : 
              <Button block style={{ backgroundColor: '#022e64' }} onPress={this.handleLogin}>
                <Text style={{ color: '#fff' }}>Login</Text>
              </Button>
            }
          </Form>
        </Content>
      </Container>
    );
  }
}
 
export default Login;

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