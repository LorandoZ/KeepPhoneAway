import React from "react";
import { View, Text,Image } from "react-native";
import { createStackNavigator, createAppContainer, createBottomTabNavigator, createMaterialTopTabNavigator } from "react-navigation";
import { Button, ThemeProvider,Icon } from 'react-native-elements';

class StudyTimerScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image
          style={{width: '100%', height: '100%'}}
          source={{uri:'http://134.209.3.61/img/test.png'}}
        />
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

// Timer Navigator
const TopTimerNavigator = createMaterialTopTabNavigator(
  {
    Study: StudyTimerScreen,
    Lunch: LunchTimerScreen,
    Sleep: SleepTimerScreen,
  }
);

// Statistics Navigator
const TopStatisticsNavigator = createMaterialTopTabNavigator(
  {
    Study: StudyStatisticsScreen,
    Lunch: LunchStatisticsScreen,
    Sleep: SleepStatisticsScreen,
  }
);

// root navigator 
const BottomTabNavigator = createBottomTabNavigator(
  {
    Timer: TopTimerNavigator,
    Statistics: TopStatisticsNavigator,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      // BottomTabNavigator
      tabBarIcon:({focused,horizontal,tintColor})=>{
        const {routeName}=navigation.state;
        let iconName;
        if(routeName=='Timer')iconName='ios-timer'
        else if(routeName=='Statistics')iconName='ios-ribbon';

        return <Icon
          name={iconName}
          type='ionicon'
          size={25}
          color={tintColor}
          containerStyle={{marginTop:6}}
          />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'dodgerblue',
      inactiveTintColor: 'gray',
    },
  }
);

export default createAppContainer(BottomTabNavigator);