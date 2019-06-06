import React, { Component } from "react";
import { View, Text, AsyncStorage,Easing, Alert, AppState, Vibration } from "react-native";
import { Button,Icon } from 'react-native-elements';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import DatePicker from 'react-native-datepicker'
import KeepAwake from 'react-native-keep-awake';

class MealTimer extends Component {
  constructor(props){
    super(props);
    this.state={
      time:'00:10',
      isDisabled: false,
      fill:0,
      display_hour:0,
      display_min:0,
      display_sec:0,
      MealPoints:0,
      Temp:0,
    }
  }

  _resetCircularProgress=()=>{
    KeepAwake.deactivate()
    this.timer&&clearInterval(this.timer)
    if(this.state.isDisabled==true){
      this.setState({
        isDisabled:false,
        display_hour:0,
        display_min:0,
        display_sec:0,
        time:'00:10',
        Temp:0
      })
      this.refs.circularProgress.reAnimate(0,0)
    }
  }

  componentWillMount(){
    this._resetCircularProgress()
    AppState.addEventListener('change',()=>this._resetCircularProgress())
    this._loadMealPoints()
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      this._loadMealPoints()
      this._resetCircularProgress()
    })
  }

  _loadMealPoints = async () => {
    try{
      let value_str=""
      value_str = await AsyncStorage.getItem('MealPoints');
      if(value_str==null){
        await AsyncStorage.setItem('MealPoints','0');
        value_str='0'
      }
      let value=parseInt(value_str)
      this.setState({MealPoints:value})
    }catch(error){
      Alert.alert(error)
    }
  }

  _saveMealPoints = async () =>{
    try{
      let value=this.state.MealPoints+this.state.Temp
      let value_str=value.toString()
      await AsyncStorage.setItem('MealPoints', value_str);
      this.setState({MealPoints:value,Temp:0})
    }catch(error){
      Alert.alert(error)
    }
  }

  Timerbegin=()=>{
    KeepAwake.activate()
    let sec=0
    let a=this.state.time
    sec+=(a[0]-'0')*36000000
    sec+=(a[1]-'0')*3600000
    sec+=(a[3]-'0')*600000
    sec+=(a[4]-'0')*60000

    this.setState({
      display_hour:(a[0]-'0')*10+(a[1]-'0'),
      display_min:(a[3]-'0')*10+(a[4]-'0'),
      display_sec:0,
      isDisabled:true,
      Temp:1
    })
    if(sec/1000<300){
      this.setState({Temp:0})
      Alert.alert("Time is too short to have a meal. You will not get points")
    }
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
        androidMode="spinner"
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
        <Text style={{fontSize:40}}>
        {this.state.display_hour<10?"0":null}{this.state.display_hour.toString()}:
        {this.state.display_min<10?"0":null}{this.state.display_min.toString()}:
        {this.state.display_sec<10?"0":null}{this.state.display_sec.toString()}
        </Text>
    )
  }

  onComplete=()=>{
    this.state.isDisabled&&Alert.alert("Finished, you got "+this.state.Temp+" points")
    this.state.isDisabled&&Vibration.vibrate(1000)
    this._saveMealPoints()
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
          Points: {this.state.MealPoints.toString()}
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
          title="     START     "
          onPress={()=>this.Timerbegin()}
          disabled={this.state.isDisabled}
        />
      </View>
      );
    }
  }

  export {MealTimer}