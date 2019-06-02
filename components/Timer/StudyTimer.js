import React, { Component } from "react";
import { View, Text, AsyncStorage,Easing, Alert } from "react-native";
import { Button,Icon } from 'react-native-elements';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import DatePicker from 'react-native-datepicker'

class StudyTimer extends Component {
  constructor(props){
    super(props);
    this.state={
      time:'00:25',
      isDisabled: false,
      fill:0,
      display_hour:0,
      display_min:0,
      display_sec:0,
      StudyPoints:0,
      Temp:0,
    }
  }
  componentWillMount(){
    this._loadStudyPoints()
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      this._loadStudyPoints()
    })
  }

  _loadStudyPoints = async () => {
    try{
      let value_str=""
      value_str = await AsyncStorage.getItem('StudyPoints');
      if(value_str==null){
        await AsyncStorage.setItem('StudyPoints','0');
        value_str='0'
      }
      let value=parseInt(value_str)
      this.setState({StudyPoints:value})
    }catch(error){
      Alert.alert(error)
    }
  }

  _saveStudyPoints = async () =>{
    try{
      let value=this.state.StudyPoints+this.state.Temp
      let value_str=value.toString()
      await AsyncStorage.setItem('StudyPoints', value_str);
      this.setState({StudyPoints:value,Temp:0})
    }catch(error){
      Alert.alert(error)
    }
  }

  Timerbegin=()=>{
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
      Temp:sec/60000
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
    this._saveStudyPoints()
    this.timer&&clearInterval(this.timer)
    if(this.state.isDisabled==true){
      this.setState({
        fill:1,
        isDisabled:false,
        display_hour:0,
        display_min:0,
        display_sec:0,
        time:'00:25'
      })
      this.setState({fill:0})
    }
  }

  componentWillUnmount(){
    this.timer&&clearInterval(this.timer)
    this._navListener.remove();
    this.setState({
      fill:1,
      isDisabled:false,
      display_hour:0,
      display_min:0,
      display_sec:0,
      time:'00:25'
    })
    this.setState({fill:0})
  }

  render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
        <Text style={{fontSize:20}}>
          Points: {this.state.StudyPoints.toString()}
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

  export {StudyTimer}