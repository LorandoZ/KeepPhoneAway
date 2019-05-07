import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator, createAppContainer, createBottomTabNavigator, createMaterialTopTabNavigator } from "react-navigation";
import { Button, ThemeProvider } from 'react-native-elements';

class StudyTimerScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>StudyTimerScreen</Text>
      </View>
    );
  }
}

class LunchTimerScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>LunchTimerScreen</Text>
      </View>
    );
  }
}

class SleepTimerScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>SleepTimerScreen</Text>
      </View>
    );
  }
}

class StudyStatisticsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>StudyStatisticsScreen</Text>
      </View>
    );
  }
}

class LunchStatisticsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>LunchStatisticsScreen</Text>
      </View>
    );
  }
}

class SleepStatisticsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>SleepStatisticsScreen</Text>
      </View>
    );
  }
}

const TopTimerNavigator = createMaterialTopTabNavigator(
  {
    Study: StudyTimerScreen,
    Lunch: LunchTimerScreen,
    Sleep: SleepTimerScreen,
  }
);

const TopStatisticsNavigator = createMaterialTopTabNavigator(
  {
    Study: StudyStatisticsScreen,
    Lunch: LunchStatisticsScreen,
    Sleep: SleepStatisticsScreen,
  }
);

const BottomTabNavigator = createBottomTabNavigator(
  {
    Timer: TopTimerNavigator,
    Statistics: TopStatisticsNavigator,
  }
);

export default createAppContainer(BottomTabNavigator);