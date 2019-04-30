import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Button, ThemeProvider } from 'react-native-elements';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ThemeProvider>
          <Button title="Hey!" />
        </ThemeProvider>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  }
});

export default createAppContainer(AppNavigator);