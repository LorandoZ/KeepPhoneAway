import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Button, DeviceEventEmitter, Image, ScrollView,
} from "react-native";
import { Divider, ListItem, Overlay } from 'react-native-elements';
import { FlatGrid } from 'react-native-super-grid';

class ItemDivideComponent extends Component {
    render() {
      return (
        <View style={{height: 2, backgroundColor: '#cccccc'}}/>
      );
    }
  };
class StudyStatistics extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data : [],
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
    }

    renderItem = ({item}) => {
        return(
            <ListItem
                title={item.name}
                titleStyle={styles.Classification}
                topDivider={true}
                onPress={()=>{this.props.navigation.push('StudyStatisticsDetail',{
                    name:item.name,
                    url:item.url,
                    });
                }}
            />
        )
    }
    render() {
        const data=[...this.state.data]
        return (
            <View>
                <View style={styles.StatisticsBar}>
                        <Text style={styles.StatisticData}>Total Time: xxx</Text>
                        <Text style={styles.StatisticData}>Cards: x/n</Text>
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
          isVisible : -1,
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
          .catch(error =>
            alert(error)
            );
    }

    render() {
        const data=[...this.state.data]
        return (
                <FlatGrid
                    itemDimension={100}
                    items={data}
                    style={styles.gridView}

                    renderItem={({ item, index }) => (
                        <View style={[styles.itemContainer, { backgroundColor: 'dodgerblue' }]}>
                            <TouchableOpacity      onPress={()=>{this.setState({ isVisible : index }) }}>
                                <Image 
                                    source={{uri : item.img}}
                                    style={styles.itemImage} 
                                />
                                <Text style={styles.itemName}>{item.name}</Text>
                            </TouchableOpacity>
                            <Overlay isVisible={this.state.isVisible===index ? true:false} >
                                <View style={styles.overlayContainer}>
                                    <Image 
                                        source={{uri : item.img}}
                                        style={styles.overlayImage} 
                                    />
                                    <Text style={styles.overlayName}>{item.name}}</Text>
                                    <Text>{item.intro}</Text>
                                    <Button
                                        title="Go Back"
                                        onPress={()=>{this.setState({ isVisible : -1 }) }}
                                    />
                                </View>
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
        textAlign: "center",
    },
    gridView: {
        marginTop: 20,
        flex: 1,
    },
    itemContainer: {
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 10,
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 5,
        height: 150,
    },
    itemName: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
        textAlign: "center",
    },
    itemImage: {
        width: "95%",
        height: "75%",
      //  margin: 12,
        borderRadius:12,
    },
    overlayContainer: {
        justifyContent: "space-around",
        alignItems: "center",
        padding: 10,
    },
    overlayName: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
        textAlign: "center",
    },
    overlayImage: {
        width: "40%",
        height: "30%",
      //  margin: 12,
        borderRadius:12,
    },
    
})
export {StudyStatistics, StudyStatisticsDetail};


[
    {
        "name": "Mathematician",
        "icon":"",
        "url":"http://134.209.3.61/Study/Mathematician"
    },
    {
        "name": "Physicist",
        "url":"http://134.209.3.61/Study/Physicist"
    },
    {
        "name": "Astronomer",
        "url":""
    },
    {
        "name": "Chemist",
        "url":""
    },
    {
        "name": "Biologist",
        "url":""
    },
    {
        "name": "Zoologist",
        "url":""
    },
    {
        "name": "Botanist",
        "url":""
    },
    {
        "name": "Geographer",
        "url":""
    }
]



