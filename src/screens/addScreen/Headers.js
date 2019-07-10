import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text } from 'native-base';
import { TouchableOpacity } from "react-native";

import styles from "./styles";

const Headers = ({navigation, handlePostClick}) => (
  <Header style={styles.header} androidStatusBarColor="#1E88E5" >
    <Left>
      <Button transparent onPress={() => navigation.pop()} >
        <Icon style={styles.buttonBack} name='arrow-back' />
      </Button>
    </Left>
    <Body>
      <Title>Add Book</Title>
    </Body>
    <Right>
      <TouchableOpacity onPress={() => handlePostClick()}>
        <Text style={styles.buttonDone}>Done</Text>
      </TouchableOpacity>
    </Right>
  </Header>
);

export default Headers
