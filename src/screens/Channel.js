import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getAllChannel } from '../services'

const Channel = ({navigation,...props}) => {
    console.log(props.route.params)

    const [allChannel, setAllChannel] = useState([])


    useEffect(() => {

        async function getChannelData() {
            try {
                const res = await getAllChannel(props.route.params)
                // console.log("response>>>>>>", res.result.channels)
                setAllChannel(res.result.channels)
            } catch (error) {

            }
        }
        getChannelData()

    }, [])
    return (
        <View>
            <Text style={{ textAlign: "center", fontSize: 30, fontWeight: "600", padding: 20, color: "#000000" }}>All Channels</Text>
            <FlatList
                data={allChannel}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => {
                   
                    return (
                        <>
                            {
                                item.name.slice(0,7) != "OdooBot" ?
                                    <TouchableOpacity 
                                    style={{ padding: 10, borderWidth: 1,width:"90%",alignSelf:"center",borderRadius:10,marginTop:10}}
                                        onPress={() => navigation.navigate("Opencamera",item.id)
                                          
                                      
                                           
                                         }
                                    >
                                        <Text>{item.name}</Text>
                                    </TouchableOpacity>

                                    :
                                    null
                                   


                            } 
                        </>

                      


                    )
                }}

            />
        </View >
    )
}

export default Channel

const styles = StyleSheet.create({})