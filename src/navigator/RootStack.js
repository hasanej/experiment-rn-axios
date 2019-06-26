import React, { Component } from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";

import HomeScreen from "../home/HomeScreen.js"
import AddScreen from "../add/AddScreen.js"
import EditScreen from "../edit/EditScreen.js"

const Rootstack = createStackNavigator({
	Home: {
		screen: HomeScreen,
		navigationOptions: ({ navigation }) => ({
				title: "Book List",
			}),
	},
	Add: {
		screen: AddScreen,
		navigationOptions: ({ navigation }) => ({
				header: null
			}),
	},
	Edit: {
		screen: EditScreen,
		navigationOptions: ({ navigation }) => ({
				header: null
			}),
	}
},
{
	initialRouteName: 'Home',
	navigationOptions: {
		headerStyle: {
			backgroundColor: '#1E88E5',
		},
		headerTintColor: '#FFF',
		headerTitleStyle: {
			fontWeight: 'bold',
			left: 107,
		},
	},
});

const AppContainer = createAppContainer(Rootstack);

export default AppContainer;
