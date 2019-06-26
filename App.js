import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import RootStack from "./src/navigator/RootStack.js";

export default class App extends Component {
 render() {
  return (
    <RootStack />
  );
 }
}
