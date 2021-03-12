import React, { Component } from 'react';
import { Text, Image, StyleSheet } from 'react-native';
import { Container, Header, Left, Body, Title, Button, Card, CardItem, Right } from 'native-base';
import { getUser } from '../services/auth-service';
import { myInvestments } from '../services/investment-service';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

class Investments extends Component {
  state = { 
    user: null,
    investments: []
  }

  async componentDidMount() {
    const user = await getUser();
    if ( user ) {
      this.setState({user})
      const investments = await myInvestments(user);
      if (investments) {
        this.setState({investments})
      }
    }
  }

  render() { 
    return ( 
      <Container>
        <Header style={{ backgroundColor: '#e0ad0f'}}>
          <Left>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
              <Text>Back Home</Text>
            </TouchableOpacity>
            
          </Left>
          <Body>
            <Title>My Investments</Title>
          </Body>
          <Right>
            <Button block style={{ backgroundColor: '#e0ad0f', marginTop: 10 }} onPress={this.handleDownload}>
              <Text style={{ color: '#022e64'}}>Download</Text>
            </Button>
          </Right>
        </Header>
        { this.state.user !== null && 
          <ScrollView>
            <Body>
              {this.state.investments.length > 0 && 
                this.state.investments.map(investment => (
                  <Card style={{ width: 300, marginVertical: 30}} key={investment.id}>
                    <CardItem header bordered style={{ backgroundColor: '#022e64'}}>
                      <Text style={{ alignSelf: 'center', color: 'white' }}>{investment.productid}</Text>
                    </CardItem>
                    <CardItem bordered>
                      <Body>
                        <Text style={{ alignSelf: 'center', color: '#022e64', fontSize: 14 }}>
                            Amount: {investment.amount}
                        </Text>
                        <Text style={{ alignSelf: 'center', color: '#022e64', fontSize: 14 }}>
                          Date: {investment.date}
                        </Text>
                        <Button block style={{ backgroundColor: '#e0ad0f', marginTop: 10 }} onPress={() => this.props.navigation.navigate('Investment', {investment})}>
                          <Text style={{ color: '#022e64'}}>View Details</Text>
                        </Button>
                      </Body>
                    </CardItem>
                </Card>
                ))
              }
            </Body>
          </ScrollView>
        }
        
      </Container>
    );
  }
}
 
export default Investments;

const styles = StyleSheet.create({
  logo: {
    width: 30,
    resizeMode: 'contain'
  },
})