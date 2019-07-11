import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Button, Text, Label, Thumbnail } from 'native-base';

import Headers from "./Headers";
import styles from "./styles";

export default class AddScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      author: "",
      synopsis: ""
    }
  }

  handleTitle = (val) => {
    this.setState({
      title: val
    });
  }

  handleAuthor = (val) => {
    this.setState({
      author: val
    });
  }

  handleSynopsis = (val) => {
    this.setState({
      synopsis: val
    });
  }

  handlePostClick = () => {
    const {title, author, synopsis} = this.state;
    this.props.navigation.state.params.handlePostClick(title, author, synopsis);
    this.setState({
      title: "",
      author: "",
      synopsis: ""
    });
  }

  render() {
    return (
      <Container>
        <Headers navigation={this.props.navigation} handlePostClick={this.handlePostClick} />
        <Content>
          <Thumbnail style={styles.thumbnail} source={require('../../assets/img/ic_books.png')} />
          <Form style={styles.form} >
            <Item floatingLabel>
              <Label>Title</Label>
              <Input value={this.state.title} onChangeText={this.handleTitle} required />
            </Item>
            <Item floatingLabel>
              <Label>Author</Label>
              <Input value={this.state.author} onChangeText={this.handleAuthor} required />
            </Item>
            <Item floatingLabel>
              <Label>Synopsis</Label>
              <Input value={this.state.synopsis} onChangeText={this.handleSynopsis} required />
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}
