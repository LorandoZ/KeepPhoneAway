import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Button } from "react-native";
import { Divider, ListItem, Icon } from 'react-native-elements';

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
        fetch('http://134.209.3.61/Scientist')
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
                leftIcon={<Icon
                    name=''
                    type=''
                    color="gray"
                    />}
                topDivider={true}
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
                <Button
                    title="Go to MealStatisticsDetail"
                    onPress={this.props.navigation}
                />
                <FlatList
                    data={data}
                    renderItem={this.renderItem}
                />
            </View>
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
})
export default StudyStatistics;


[
    {
        "name": "Mathematician",
        "icon":"",
        "url":"http://134.209.3.61/study/Mathematician"
    },
    {
        "name": "Physicist",
        "url":"http://134.209.3.61/study/Physicist"
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



