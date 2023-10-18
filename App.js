import { StyleSheet, Text, View,Button,TextInput } from 'react-native'
import React,{useEffect,useState} from 'react'

// import Opencamera from './src/screens/Opencamera'

import { NavigationContainer } from '@react-navigation/native'

import { createStackNavigator } from '@react-navigation/stack'
import Opencamera from './src/screens/Opencamera'
import Chat from './src/screens/Chat'
import Login from './src/screens/Login'
import Channel from './src/screens/Channel'
// import Chatscreen from './src/screens/Chatscreen'


const Stack=createStackNavigator()


// import WebSocket from 'react-native-websocket'




const App = () => {


  // const [message, setMessage] = useState('');
  // const [receivedMessages, setReceivedMessages] = useState([]);
  // const [socket, setSocket] = useState(null);

  // useEffect(() => {
  //   // Replace with your WebSocket server URL
  //   const newSocket = new WebSocket('ws://your-websocket-server-url');
  //   setSocket(newSocket);

  //   return () => {
  //     newSocket.close();
  //   };
  // }, []);

  // useEffect(() => {
  //   if (socket) {
  //     socket.onopen = () => {
  //       // WebSocket connection is open, you can send messages now
  //     };

  //     socket.onmessage = (event) => {
  //       const updatedMessages = [...receivedMessages, event.data];
  //       setReceivedMessages(updatedMessages);
  //     };

  //     socket.onclose = (event) => {
  //       console.log('WebSocket closed:', event);
  //     };
  //   }
  // }, [socket, receivedMessages]);

  // const sendMessage = () => {
  //   if (message && socket && socket.readyState === WebSocket.OPEN) {
  //     socket.send(message);
  //     setMessage('');
  //   } else {
  //     console.error('WebSocket not open for sending messages.');
  //   }
  // };
  const screenOptions = {
    headerShown: false
}

  return (
    // <View>
    //   <Text>WebSocket Example</Text>
    //   <TextInput
    //     placeholder="Enter a message"
    //     value={message}
    //     onChangeText={(text) => setMessage(text)}
    //   />
    //   <Button title="Send" onPress={sendMessage} />
    //   <View>
    //     <Text>Received Messages:</Text>
    //     {receivedMessages.map((msg, index) => (
    //       <Text key={index}>{msg}</Text>
    //     ))}
    //   </View>
    // </View>
 
    // <View>
    //   <Text>dfkljlksdf</Text>
    // </View>
    // <Chat/>

    <NavigationContainer>
       <Stack.Navigator  initialRouteName='Login' screenOptions={screenOptions}>
         <Stack.Screen name ="Chat" component={Chat} />
         <Stack.Screen name ="Login" component={Login}/>
         <Stack.Screen name ="Channel" component={Channel}/>

         <Stack.Screen name ="Opencamera" component={Opencamera}/>
       </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})