import React, { Component } from "react";
import { View, Text, StyleSheet, AsyncStorage, TouchableOpacity, FlatList, Button, Image, ScrollView, Alert } from "react-native";
import { Divider, ListItem, Overlay } from 'react-native-elements';
import { FlatGrid } from 'react-native-super-grid';

import { TheOverlay } from "./Stateless";

class StudyStatistics extends Component {  //render the list award list
    constructor(props) {
        super(props);
        this.state = {
          data : [],
          StudyPoints: 0,
        }
    }
    componentDidMount(){
        fetch('http://134.209.3.61/Study/index')
          .then((response) => response.json())
          .then((data) => {
            this.setState({
                data : data
            })
          })
          .catch(error =>
            alert(error)
            );
        this._navListener = this.props.navigation.addListener('willFocus', () => {  //load points when user enter this screen 
            this._loadStudyPoints()
            })
    }
    _loadStudyPoints = async () => { //load points from asyncstorage
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
    renderItem = ({item}) => {
        return(
            <ListItem
                title={item.name}
                rightElement={">     "}
                titleStyle={styles.Classification}
                topDivider={true}
                onPress={()=>{this.props.navigation.navigate('StudyStatisticsDetail',{
                    name:item.name,
                    url:item.url,
                    });
                }}
            />
        )
    }
    componentWillUnmount(){
        this._resetCircularProgress()
    }
    render() {
        const data=[...this.state.data]
        return (
            <View>
                <View style={styles.StatisticsBar}>
                        <Text style={styles.StatisticData}>StudyPoints: {this.state.StudyPoints}</Text>
                </View>
                <Divider style={{ height: 0.5,backgroundColor: 'dodgerblue' }} />
                <FlatList
                    data={data}
                    renderItem={this.renderItem}
                />
            </View>
        );
    }
}
class StudyStatisticsDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data : [],
          status : [],      //determine weather the card is unlocked 
          isVisible : -1,   //determine which overlay will be rendered
          StudyPoints: 0,
          RequiredPoints: 500,   //the cost of every card 
        }
    }
    componentDidMount(){
        fetch(this.props.url)
          .then((response) => response.json())
          .then((data) => {
            this.setState({
                data : data
            })
          })
          .then(()=>{       
            let status = []
            for(let i=0;i<this.state.data.length;i++){      //load status of every item
                status.push('0')
                this._retrieveData(this.state.data[i].name)
            }
            this.setState({status : status})
            this._loadStudyPoints()
          })
    }
    _storeData = async (id,data) => {   //store status of card in the asyncstorage
        try {
            await AsyncStorage.setItem(id,data)
            this._retrieveData(id)  //update the state after changing the status
        } catch (error) {
            alert(error)
        }
    }
    _retrieveData = async (id) => {     //get status of card from the asyncstorage
        try {
            var value = await AsyncStorage.getItem(id)
            if (value == null) {
                await AsyncStorage.setItem(id,'0')
            }
            else{
                let status=this.state.status
                for(let i=0;i<this.state.data.length;i++)  //if any status is changed,find it and modify the state
                    if(id==this.state.data[i].name){
                        status[i]=value
                        break
                    }
                this.setState({status : status})      
            }
        } catch (error) {
            alert(error)
        }         
    }
    _loadStudyPoints = async () => {  //load points from asyncstorage
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
    _reduceStudyPoints = async (PointsNeed) =>{   //modify points in asyncstorage after user unlock a piece of card
        try{
            let value=this.state.StudyPoints-PointsNeed
            let value_str=value.toString()
            await AsyncStorage.setItem('StudyPoints', value_str);
            this.setState({StudyPoints:value})
        }catch(error){
            Alert.alert(error)
        }
    }
    unlock = (name) => {  // the unlock operation
        let CurrentPoints=this.state.StudyPoints
        let RequiredPoints=this.state.RequiredPoints
        if(CurrentPoints >= RequiredPoints){
            this._reduceStudyPoints(this.state.RequiredPoints)
            this._storeData(name,'1')
        }
        else{
            Alert.alert('lack of points!')
        }       
    }
    closeOverlay = (name) => {    // close the overlay
        this.setState({ isVisible : -1 })     
    }
    render() {
        const data=[...this.state.data]
        return (
            <FlatGrid
                itemDimension={90}
                items={data}
                style={styles.gridView}
                renderItem={({ item, index }) => (
                    <View>
                        {this.state.status[index]==='0' ? 
                            <TouchableOpacity   
                                style={[styles.itemContainer, { backgroundColor: 'black' }]}
                                onPress={()=>{this.setState({ isVisible : index }); this._loadStudyPoints()}}
                            >
                                <Image 
                                    source={{uri : 'http://134.209.3.61/Mark.jpg'}}
                                    style={styles.itemImage} 
                                />
                                <Text style={styles.itemName}>{item.name}</Text>
                            </TouchableOpacity>
                            :<TouchableOpacity   
                                style={[styles.itemContainer, { backgroundColor: '#144a74' }]}
                                onPress={()=>{this.setState({ isVisible : index }); this._loadStudyPoints()}}
                            >
                                <Image 
                                    source={{uri : item.img}}
                                    style={styles.itemImage} 
                                />
                                <Text style={styles.itemName}>{item.name}</Text>
                            </TouchableOpacity>
                        }
                        <Overlay isVisible={this.state.isVisible===index ? true:false} >
                            {this.state.status[index]==='0' ? 
                                <TheOverlay
                                    FS={0}
                                    name={item.name}
                                    RequiredPoints={this.state.RequiredPoints}
                                    Points={this.state.StudyPoints}
                                    unlock={this.unlock}     
                                    closeOverlay={this.closeOverlay}                          
                                />
                                :<TheOverlay
                                    FS={1}
                                    name={item.name}
                                    img={item.img}
                                    intro={item.intro}
                                    closeOverlay={this.closeOverlay}                          
                                />
                            }
                        </Overlay>
                    </View>
                )}
            />
        );
    }
}
const styles = StyleSheet.create({
    StatisticsBar: {
        height: 30,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'white'
    },
    StatisticData: {
        flex: 1,
        fontSize: 15,
        textAlign: "center",
    },
    Classification: {
        flex: 1,
        fontSize: 20,
        textAlign: "left",
        paddingLeft:20,
    },
    gridView: {
        flex: 1,
    },
    itemContainer: {
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 8,
        padding: 10,
        paddingTop:11,
        marginVertical: 5,
        marginHorizontal: 5,
        height: 130,
    },
    itemName: {
        fontSize: 12,
        color: '#fff',
        fontWeight: '600',
        textAlign: "center",
    },
    itemImage: {
        width: "95%",
        height: "80%",
        borderRadius:8,
    },
    overlayContainer: {
        justifyContent: "space-around",
        alignItems: "center",
        paddingHorizontal: '5%',
        paddingTop: '0%',
        paddingBottom: '5%',
        height:"93%",
        width:"100%",
    },
    ScrollViewContainer: {
        justifyContent: "space-around",
        alignItems: "center",
        height:"100%",
        width:"100%",
    },
    overlayImage: {
        width: "60%",
        height: "40%",
        borderRadius:8,
    },
    overlayName: {
        fontSize: 30,
        fontWeight: '600',
        textAlign: "center",
    },
    overlayIntro: {
        fontSize: 16,
    },
    overlayPoints: {
        fontSize: 24,
        color: 'red',
        fontWeight: '600',
         textAlign: "center",
    },  
})
export {StudyStatistics, StudyStatisticsDetail};
