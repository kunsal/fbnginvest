import React, { Component } from 'react';
import { Container, Header, Left, Body, Title, Content, Card, CardItem, Button } from 'native-base';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

class Investment extends Component {
  state = {  }

  handleDownload = () => {

  }

  render() { 
    const { investment } = this.props.route.params;
    return ( 
      <Container>
        <Header style={{ backgroundColor: '#e0ad0f'}}>
          <Left>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Investments')}>
              <Text>Back to Investments</Text>
            </TouchableOpacity>
            
          </Left>
          <Body>
            <Title>{investment.productid}</Title>
          </Body>
          
        </Header>
        <Content>
          <Card>
          <CardItem bordered>
              <Body>
                <Text style={{ alignSelf: 'center', color: '#022e64', fontSize: 14 }}>
                    Amount: {investment.amount}
                </Text>
                <Text style={{ alignSelf: 'center', color: '#022e64', fontSize: 14 }}>
                  Date: {investment.date}
                </Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
 
export default Investment;