import React, { Component } from "react";
import { View, Text, StyleSheet, AsyncStorage, TouchableOpacity, FlatList, Button, Image, ScrollView, Alert } from "react-native";

const TheOverlay =(props)=> (          //FS=0 => UNlocked    FS=1 => Locked
    <View>
        <View style={{ paddingLeft: '90%', height:'7%' }}>
            <TouchableOpacity   
                style={{backgroundColor: '' }}
                onPress={()=>{props.closeOverlay()}}
            >
                <Text style={{ fontSize: 30}}> × </Text>
            </TouchableOpacity>
        </View>
        {props.FS===0 ? 
            <View style={styles.overlayContainer}>
                <Image 
                    source={{uri : 'http://134.209.3.61/Mark.jpg'}}
                    style={styles.overlayImage} 
                />
                <Text style={styles.overlayName}>{props.name}</Text>
                <ScrollView>
                    <Text style={styles.overlayPoints}>Required Points: {props.RequiredPoints}/{props.Points}</Text> 
                </ScrollView>
                <Button
                    title="+1"
                    onPress={()=>{props._addPoints(1)}}
                />
                <Button
                    title="     UNLOCK     "
                    onPress={()=>{props.unlock(props.name)}}
                />
            </View>
            :<View style={styles.overlayContainer}>
                <Image 
                    source={{uri : props.img}}
                    style={styles.overlayImage} 
                />
                <Text style={styles.overlayName}>{props.name}</Text>
                <Text > </Text>
                <ScrollView>
                    <Text style={styles.overlayIntro}>{props.intro}</Text>
                </ScrollView>
            </View>
        }
    </View>
)
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
    //    marginTop: 20,
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
        height: 150,
    },
    itemName: {
        fontSize: 14,
        color: '#fff',
        fontWeight: '600',
        textAlign: "center",
    },
    itemImage: {
        width: "95%",
        height: "80%",
      //  margin: 12,
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
      //  margin: 12,
        borderRadius:8,
    },
    overlayName: {
        fontSize: 30,
    //    color: '#fff',
        fontWeight: '600',
        textAlign: "center",
    },
    overlayIntro: {
        fontSize: 16,
        // textBreakStrategy:'highQuality',
    //    color: '#fff',
    //    fontWeight: '600',
        // textAlign: "center",
    },
    overlayPoints: {
        fontSize: 24,
        // textBreakStrategy:'highQuality',
        color: 'red',
        fontWeight: '600',
         textAlign: "center",
    },  
})
export {TheOverlay};