import React from "react";
import { View, Text, AsyncStorage } from "react-native";
import { createStackNavigator, createAppContainer, createBottomTabNavigator, createMaterialTopTabNavigator, DeviceEventEmitter} from "react-navigation";
import { Button, ThemeProvider,Icon } from 'react-native-elements';

import { StudyStatistics, StudyStatisticsDetail} from "./components/Statistics/StudyStatistics";
import { SleepStatistics, SleepStatisticsDetail} from "./components/Statistics/SleepStatistics";
import { MealStatistics, MealStatisticsDetail} from "./components/Statistics/MealStatistics";
import { StudyTimer } from "./components/Timer/StudyTimer";
import { MealTimer } from "./components/Timer/MealTimer";
import { SleepTimer,SleepTimerSetting } from "./components/Timer/SleepTimer";

class StudyTimerScreen extends React.Component {
  render() {
    return (
      <StudyTimer
        navigation={this.props.navigation}
      />
    );
  }
}

class MealTimerScreen extends React.Component {
  render() {
    return (
      <MealTimer
        navigation={this.props.navigation}
      />
    );
  }
}

class SleepTimerScreen extends React.Component {
  render() {
    return (
      <SleepTimer
        navigation={this.props.navigation}
      />
    );
  }
}

class SleepTimerSettingScreen extends React.Component {
  render(){
    return(
      <SleepTimerSetting
        navigation={this.props.navigation}
      />
    )
  }
}

class StudyStatisticsHomeScreen extends React.Component {
  render() {
    return (
      <StudyStatistics
        navigation={this.props.navigation}
      />
    );
  }
}

class StudyStatisticsDetailScreen extends React.Component {
  render() {
    const url = this.props.navigation.getParam('url', '');
    const name = this.props.navigation.getParam('name', '');
    return (
      <StudyStatisticsDetail
        url={url}
        name={name}
      />
    );
  }
}

class MealStatisticsHomeScreen extends React.Component {
  render() {
    return (
      <MealStatistics
        navigation={this.props.navigation}
      />
    );
  }
}

class MealStatisticsDetailScreen extends React.Component {
  render() {
    const url = this.props.navigation.getParam('url', '');
    const name = this.props.navigation.getParam('name', '');
    return (
      <MealStatisticsDetail
        url={url}
        name={name}
      />
    );
  }
}

class SleepStatisticsHomeScreen extends React.Component {
  render() {
    return (
      <SleepStatistics
        navigation={this.props.navigation}
      />
    );
  }
}

class SleepStatisticsDetailScreen extends React.Component {
  render() {
    const url = this.props.navigation.getParam('url', '');
    const name = this.props.navigation.getParam('name', '');
    return (
      <SleepStatisticsDetail
        url={url}
        name={name}
      />
    );
  }
}


const SleepTimerStackScreen = createStackNavigator(
  {
    SleepTimer: SleepTimerScreen,
    SleepTimerSetting: SleepTimerSettingScreen,
  },
  {
    initialRouteName: "SleepTimer",
    headerMode: "none"
  }
);

// Timer Navigator
const TopTimerNavigator = createMaterialTopTabNavigator(
  {
    Study: StudyTimerScreen,
    Meal: MealTimerScreen,
    Sleep: SleepTimerStackScreen,
  }
);


const StudyStatisticsStackScreen = createStackNavigator(
  {
    StudyStatisticsHome: StudyStatisticsHomeScreen,
    StudyStatisticsDetail: StudyStatisticsDetailScreen
  },
  {
    initialRouteName: "StudyStatisticsHome",
    headerMode: "none"
  }
)

const MealStatisticsStackScreen = createStackNavigator(
  {
    MealStatisticsHome: MealStatisticsHomeScreen,
    MealStatisticsDetail: MealStatisticsDetailScreen
  },
  {
    initialRouteName: "MealStatisticsHome",
    headerMode: "none"
  }
)

const SleepStatisticsStackScreen = createStackNavigator(
  {
    SleepStatisticsHome: SleepStatisticsHomeScreen,
    SleepStatisticsDetail: SleepStatisticsDetailScreen
  },
  {
    initialRouteName: "SleepStatisticsHome",
    headerMode: "none"
  }
)

// Statistics Navigator
const TopStatisticsNavigator = createMaterialTopTabNavigator(
  {
    Study: StudyStatisticsStackScreen,
    Meal:  MealStatisticsStackScreen,
    Sleep: SleepStatisticsStackScreen,
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
          containerStyle={{marginTop:8}}
          />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'dodgerblue',
      inactiveTintColor: 'gray',
    },
  }
);

// Disable Warning, just temporary
console.disableYellowBox = true;
export default createAppContainer(BottomTabNavigator);