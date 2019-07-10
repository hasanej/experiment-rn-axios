import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text } from 'native-base';
import { TouchableOpacity} from "react-native";

import styles from "./styles";

const Headers = ({navigation, handleEdit, id}) => (
  <Header style={styles.header} androidStatusBarColor="#FFF" >
    <Left>
      <Button transparent onPress={() => navigation.pop()} >
        <Icon style={styles.buttonBack} name='arrow-back' />
      </Button>
    </Left>
    <Body style={styles.body}>
      <Title style={styles.title}>Edit Book</Title>
    </Body>
    <Right>
      <TouchableOpacity onPress={() => handleEdit(id)} >
        <Text style={styles.buttonDone}>Done</Text>
      </TouchableOpacity>
    </Right>
  </Header>
);

export default Headers
