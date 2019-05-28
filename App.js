import React from "react";
import { View, Text, AsyncStorage } from "react-native";
import { createStackNavigator, createAppContainer, createBottomTabNavigator, createMaterialTopTabNavigator } from "react-navigation";
import { Button, ThemeProvider,Icon } from 'react-native-elements';
import StudyStatistics from "./components/StudyStatistics";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { FlatGrid } from 'react-native-super-grid';


class StudyTimerScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
        <AnimatedCircularProgress
          ref={(ref) => this.circularProgress = ref}
          duration={80000}
          size={300}
          width={15}
          fill={100}
          tintColor="dodgerblue"
          onAnimationComplete={() => console.log('onAnimationComplete')}
          backgroundColor="gray"/>
      </View>
    );
  }
}

class MealTimerScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>MealTimerScreen</Text>
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

class StudyStatisticsHomeScreen extends React.Component {
  render() {
    return (
      <StudyStatistics
        navigation={()=> this.props.navigation.push('StudyStatisticsDetail')}
      />
    );
  }
}

class StudyStatisticsDetailScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>StudyStatisticsDetailScreen</Text>
      </View>
    );
  }
}

class MealStatisticsHomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Go to MealStatisticsDetail"
          onPress={() => this.props.navigation.push('MealStatisticsDetail')}
        />
      </View>
    );
  }
}

class MealStatisticsDetailScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>MealStatisticsDetailScreen</Text>
      </View>
    );
  }
}

class SleepStatisticsHomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>SleepStatisticsHomeScreen</Text>
      </View>
    );
  }
}

class SleepStatisticsDetailScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>SleepStatisticsDetailScreen</Text>
      </View>
    );
  }
}

// Timer Navigator
const TopTimerNavigator = createMaterialTopTabNavigator(
  {
    Study: StudyTimerScreen,
    Meal: MealTimerScreen,
    Sleep: SleepTimerScreen,
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

export default createAppContainer(BottomTabNavigator);