import React, { Component } from "react";
import { View, Text, AsyncStorage,Easing, Alert } from "react-native";
import { createStackNavigator, createAppContainer, createBottomTabNavigator, createMaterialTopTabNavigator, DeviceEventEmitter} from "react-navigation";
import { Button, ThemeProvider,Icon, Input } from 'react-native-elements';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import DatePicker from 'react-native-datepicker'
import { FlatGrid } from 'react-native-super-grid';


class StudyTimer extends Component {
  constructor(props){
    super(props);
    this.state={
      time:'00:01',
      isDisabled: false,
      fill:0
    }
  }
  
  Timerbegin=()=>{
    let sec=0
    let a=this.state.time
    sec+=(a[0]-'0')*36000000
    sec+=(a[1]-'0')*3600000
    sec+=(a[3]-'0')*600000
    sec+=(a[4]-'0')*60000

    this.refs.circularProgress.animate(100,sec,Easing.linear)

    this.setState({
      isDisabled:true
    })
  }

  renderFill=()=>{
    return(
      this.state.isDisabled==false?
      <DatePicker
        style={{width: 500}}
        date={this.state.time}
        is24Hour={true}
        mode="time"
        format="HH:mm"
        showIcon={false}
        disabled={this.state.isDisabled}
        customStyles={{
          dateInput: {
            borderWidth:0,
            flex: 1,
            height:100
          },
          dateText: {
            fontSize:40
          }
        }}
        onDateChange={(date) => {this.setState({time: date})}}
        />:
        <Text
          style={{fontSize:40}}
        >{this.state.fill}</Text>
    )
  }
  
  render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
        <Text></Text><Text></Text>
        <AnimatedCircularProgress
          ref="circularProgress"
          size={300}
          width={15}
          lineCap="round"
          fill={this.state.fill}
          tintColor="dodgerblue"
          onAnimationComplete={() => console.log('onAnimationComplete')}
          backgroundColor="gray"
          children={
            (fill)=>this.renderFill()
          }
        />
        <Text></Text><Text></Text><Text></Text>
        <Button
          title="     START     "
          onPress={()=>this.Timerbegin()}
        />
      </View>
      );
    }
  }

  export {StudyTimer}