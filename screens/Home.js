import React, { Component } from 'react';
import { Text, Image, StyleSheet } from 'react-native';
import { Container, Header, Left, Body, Right, Content, Card, CardItem, Button } from 'native-base';
import { getUser, logout } from '../services/auth-service';
import { totalInvestments, myInvestments } from '../services/investment-service';

class Home extends Component {
  state = { 
    user: null,
    total: 0,
    totalCount: 0
  }

  async componentDidMount() {
    const user = await getUser();
    
    if ( user ) {
      this.setState({user})
      const total = await totalInvestments(user);
      const Investments = await myInvestments(user);
      if (total) {
        this.setState({total})
      }
      this.setState({ totalCount: Investments.length }) 
    }
  }

  render() { 
    return ( 
      <Container>
        <Header style={{ backgroundColor: '#e0ad0f'}}>
          <Left/>
          <Body>
            <Image source={require('../assets/icon.png')} style={styles.logo} />
          </Body>
          <Right>
          <Button block style={{ backgroundColor: '#f00' }} onPress={() => {logout()}}>
              <Text style={{ color: 'white'}}>Logout</Text>
            </Button>
          </Right>
        </Header>
        { this.state.user !== null && 
          <Body>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginVertical: 10 }}>
              Hi { this.state.user.customername}
            </Text>
            <Text style={{ fontSize: 16, marginVertical: 10 }}>Welcome to your FBNGInvest portal</Text>

            <Content padder>
            <Card style={{ width: 200, marginVertical: 30}}>
              <CardItem header bordered style={{ backgroundColor: '#022e64'}}>
                <Text style={{ alignSelf: 'center', color: 'white' }}>Total Investment Count</Text>
              </CardItem>
              <CardItem bordered>
                <Body>
                  <Text style={{ alignSelf: 'center', color: '#022e64', fontSize: 22 }}>
                    {this.state.totalCount}
                  </Text>
                </Body>
              </CardItem>
            </Card>

            <Card>
              <CardItem header bordered style={{ backgroundColor: '#022e64'}}>
                <Text style={{ alignSelf: 'center', color: 'white' }}>Total Investment Value</Text>
              </CardItem>
              <CardItem bordered>
                <Body>
                  <Text style={{ alignSelf: 'center', color: '#022e64', fontSize: 22 }}>
                    {this.state.total}
                  </Text>
                </Body>
              </CardItem>
            </Card>
            <Button block style={{ backgroundColor: '#022e64', marginTop: 40 }} onPress={() => {this.props.navigation.navigate('Investments')}}>
              <Text style={{ color: 'white'}}>View All</Text>
            </Button>
            </Content>
          </Body>
        }
        
      </Container>
    );
  }
}
 
export default Home;

const styles = StyleSheet.create({
  logo: {
    width: 30,
    resizeMode: 'contain'
  },
})