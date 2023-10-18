import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { login,storeCredential } from '../services'
import Spinner from 'react-native-loading-spinner-overlay';



const Login = ({ navigation }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [db, setDb] = useState("")

    const [loading, setLoading] = useState(false)




    const LogIn = async () => {



       












        if (username === "") {
            alert("Please Enter Your Email")
            return true
        }

        if (password === "") {
            alert("Please Enter Your Password")
            return true
        }
        if (db === "") {
            alert("Please Enter Database Name")
            return true
        }
        if (username != "" && password != "" && db != "") {
            try {
                setLoading(true)
                const response = await login(username.trim(), password.trim(), db.trim())

                

                
                if (response.error && response.error.data.message != "Access Denied") {
                    alert(`database ${db} does not exist`)
                    setLoading(false)
                    return true
                }
                if (response.result) {
                    if (response.result.error) {
                        alert(response.result.error)
                        setLoading(false)
                        return true
                    }


                    storeCredential(username.trim(), password.trim(), response.result.uid)
                    // setUser(response.result.uid)
                    setLoading(false)
                    navigation.navigate("Channel", response.result.uid)
                }
                else {
                    setLoading(false)
                    alert("Username and password do not match!")
                }
            } catch (error) {
                setLoading(false)
                console.log("error", error)
            }
        }
    }






    return (
        <View style={{ flex: 1 }}>
             {
        loading ?
          <Spinner visible={true} />
          :
          null
      }
            <View style={{ flex: 0.2, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: 25, fontWeight: "600", color: "#000000" }}>Login</Text>

            </View>

            <View style={{ flex: 0.8, marginTop: 20, padding: 15 }}>
                <View style={{ borderWidth: 1, borderRadius: 10, padding: 3, }}>
                    <TextInput
                        placeholder='Enter username'
                        style={{ fontSize: 15, marginLeft: 10 }}
                        value={username}
                        onChangeText={(val) => setUsername(val)}
                    />
                </View>
                <View style={{ borderWidth: 1, borderRadius: 10, padding: 3, marginTop: 25 }}>
                    <TextInput
                        placeholder='Enter password'
                        style={{ fontSize: 15, marginLeft: 10 }}
                        value={password}
                        onChangeText={(val) => setPassword(val)}
                    />
                </View>
                <View style={{ borderWidth: 1, borderRadius: 10, padding: 3, marginTop: 25 }}>
                    <TextInput
                        placeholder='Enter database name'
                        style={{ fontSize: 15, marginLeft: 10 }}
                        value={db}
                        onChangeText={(val) => setDb(val)}
                    />
                </View>

                <TouchableOpacity style={{
                    backgroundColor: "blue",
                    marginTop: 80, padding: 10,
                    alignItems: "center",
                    borderRadius: 20,
                    width: "80%",
                    alignSelf: "center"
                }}

                    onPress={() => LogIn()}

                >
                    <Text style={{ color: "#FFFFFF", fontSize: 20, fontWeight: "700" }}>Login</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({})