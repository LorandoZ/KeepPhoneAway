import React, { Component } from "react";
import { View, Text, AsyncStorage, Easing, Alert, AppState, StatusBar} from "react-native";
import { Button,Icon, Overlay } from 'react-native-elements';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import DatePicker from 'react-native-datepicker'
import KeepAwake from 'react-native-keep-awake';
import moment from "moment";

class SleepTimer extends Component {
  constructor(props){
    super(props);
    this.state={
      time:'23:00',
      isDisabled: false,
      fill:0,
      SleepPoints:0,
      Temp:0,
      display_hour:0,
      display_min:0,
      display_sec:0,
    }
  }

  _resetCircularProgress=()=>{
    KeepAwake.deactivate()
    this.timer2&&clearInterval(this.timer)
    this.timer2&&clearInterval(this.timer2)
    if(this.state.isDisabled==true){
      this.setState({
        isDisabled: false,
        SleepPoints:0,
        Temp:0,
        display_hour:0,
        display_min:0,
        display_sec:0,
      })
      this.refs.circularProgress.reAnimate(0,0)
    }
  }

  componentWillMount(){
    this._loadSleepPoints()
    this._resetCircularProgress()
    AppState.addEventListener('change',()=>this._resetCircularProgress())
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBackgroundColor('#2196f3');
      this._loadSleepPoints()
      this._loadSleepTime()
    })
    setInterval(()=>{
      let value=moment().format('HH:mm')
      if(value==this.state.time)this.Timerbegin()
    },10000)
  }

  _loadSleepTime = async()=>{
    try{
      let value_str=""
      value_str = await AsyncStorage.getItem('SleepTime');
      if(value_str==null) this.props.navigation.navigate('SleepTimerSetting')
      else this.setState({time:value_str})
    }catch(error){
      Alert.alert(error)
    }
  }

  _loadSleepPoints = async () => {
    try{
      let value_str=""
      value_str = await AsyncStorage.getItem('SleepPoints');
      if(value_str==null){
        await AsyncStorage.setItem('SleepPoints','5');
        value_str='5'
      }
      let value=parseInt(value_str)
      this.setState({SleepPoints:value})
    }catch(error){
      Alert.alert(error)
    }
  }

  _saveSleepPoints = async () =>{
    try{
      let value=this.state.SleepPoints+this.state.Temp
      let value_str=value.toString()
      await AsyncStorage.setItem('SleepPoints', value_str);
      this.setState({SleepPoints:value,Temp:0})
    }catch(error){
      Alert.alert(error)
    }
  }

  Timerbegin=()=>{
    KeepAwake.activate()
    const sec=10800000
    let a=this.state.time
    this.setState({
      display_hour:3,
      display_min:0,
      display_sec:0,
      isDisabled:true,
      Temp:1
    })
    
    this.refs.circularProgress.animate(100,sec,Easing.linear)
    this.timer=setInterval(()=>{
      if(!this.timer)return;
      let h=this.state.display_hour
      let m=this.state.display_min
      let s=this.state.display_sec
      if(s==0){if(m==0){h-=1;if(h<0)h=0;m=59}else m--;s=59;}
      else s--
      this.setState({
        display_hour:h,
        display_min:m,
        display_sec:s,
      })
    },1000)
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
        disabled={true}
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
      />:
      <Text style={{fontSize:40}}>
      {this.state.display_hour<10?"0":null}{this.state.display_hour.toString()}:
      {this.state.display_min<10?"0":null}{this.state.display_min.toString()}:
      {this.state.display_sec<10?"0":null}{this.state.display_sec.toString()}
      </Text>
    )
  }

  onComplete=()=>{
    this._saveSleepPoints()
    this._resetCircularProgress()
  }

  componentWillUnmount(){
    AppState.removeEventListener('change',this._resetCircularProgress());
    this._navListener.remove();
  }

  render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
        <Text style={{fontSize:20}}>
          Points: {this.state.SleepPoints.toString()}
        </Text>
        <Text></Text>
        <Text></Text>
        <AnimatedCircularProgress
          ref="circularProgress"
          size={300}
          width={15}
          fill={this.state.fill}
          tintColor="dodgerblue"
          onAnimationComplete={()=>this.onComplete()}
          backgroundColor="gray">
          {
            ()=>this.renderFill()
          }
        </AnimatedCircularProgress>
        <Text></Text><Text></Text><Text></Text>
        <Button
          title="   It will start timing at the time you set   "
          disabled={true}
        />
      </View>
      );
    }
}

class SleepTimerSetting extends Component {
  constructor(props){
    super(props);
    this.state={
      time:'23:00',
    }
  }
  _saveSleepTime = async () =>{
    try{
      await AsyncStorage.setItem('SleepTime', this.state.time);
    }catch(error){
      Alert.alert(error)
    }
  }
  setTime=()=>{
    this._saveSleepTime()
    this.props.navigation.navigate('SleepTimer')
  }
  render(){
    return(
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
        <View >
          <Text 
            style={{fontSize:20,color:'black'}}
            >You need to set a target sleep time</Text>
        </View>
        <Text></Text><Text></Text><Text></Text><Text></Text>
      <DatePicker
        style={{width: 500}}
        date={this.state.time}
        is24Hour={true}
        placeholder="23:00"
        androidMode="spinner"
        mode="time"
        format="HH:mm"
        showIcon={false}
        customStyles={{
          dateInput: {
            borderWidth:0,
            flex: 1,
            height:100,
          },
          dateText: {
            fontSize:40
          }
        }}
        onDateChange={(date) => {this.setState({time: date})}}
      />
      <Text></Text><Text></Text><Text></Text><Text></Text>
      <Button
        title="      CONFIRM      "
        onPress={()=>this.setTime()}
      />
      </View>
    )
  }
}

export { SleepTimer, SleepTimerSetting }