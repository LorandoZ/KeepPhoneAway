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
export {TheOverlay};