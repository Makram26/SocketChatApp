import React, { useEffect, useState, useRef } from 'react';
import { TextInput, View, Text, StyleSheet, DeviceInfo, ScrollView, VirtualizedList, TouchableOpacity, LogBox, FlatList, Modal, Keyboard, Dimensions, } from 'react-native';





// import WebSocket from 'react-native-websocket';


LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications


import Icon from 'react-native-vector-icons/Entypo';
import SendIcon from 'react-native-vector-icons/Ionicons';

import { useIsFocused } from '@react-navigation/native';

import { getAllMeassage, usersendMessage } from '../services';

import HTML from 'react-native-render-html';

const contentWidth = Dimensions.get('window').width;


// import EmojiSelector, { Categories } from 'react-native-emoji-selector'


import Svg, { Text as SvgText } from 'react-native-svg';




const Chat = (props) => {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMassages] = useState([])
  const [user, setUser] = useState(null);


  const [oldMessage, setOldMessage] = useState([])



  const [receivedMessages, setReceivedMessages] = useState("")


  const isFocused = useIsFocused();




  const scrollViewRef = useRef(null);
  const inputRef = useRef()
  const myViewRef = useRef(null);


  const [isModalVisible, setIsModalVisible] = useState(false);


  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
















  const ws = new WebSocket('ws://10.1.1.58:8069/websocket');


  // useEffect(() => {
  //   if (myViewRef.current) {
  //     // Perform operations on myViewRef.current
  //     myViewRef.current.blur();
  //   }
  //   const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
  //   const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);

  //   return () => {
  //     keyboardDidShowListener.remove();
  //     keyboardDidHideListener.remove();
  //   };
  // }, []);

  useEffect(() => {
    
    if (isFocused) {
      // This code will run when the Chat screen gains focus.
      console.log('Chat screen is focused');


      ws.onopen = (msg) => {
        // const val={"event_name":"subscribe","data":{"channels":[],"last":1337}}
        // console.log(typeof val)
        ws.send(JSON.stringify({ "event_name": "subscribe", "data": { "channels": [], "last": 0 } }))
        // ws.close()
        console.log("msg", msg)
  
      };
  
      ws.onmessage = (event) => {
  
        console.log(event)
  
        const parsedData = JSON.parse(event.data);
  
        console.log("All record >>>>>>>>>>", parsedData[0].message.type)
        // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>", parsedData[0].message.payload.isTyping)
  
  
        // const dataString = parsedData.data;
  
  
        // const innerData = JSON.parse(dataString);
        // console.log('Received message:', (parsedData[0].message.payload.message.id));
        if (parsedData[0].message.type == "mail.channel/last_interest_dt_changed" && props.route.params != "1" ) {
          console.log("single user communication ")
  
  
  
  
          if (parsedData[1].message.payload.isTyping == undefined && parsedData[0].message.payload.id == props.route.params) {
            const newMessage = {
              // id:23
              id: parsedData[1].message.payload.message.id,
              username: parsedData[1].message.payload.message.author.name,
              message: parsedData[1].message.payload.message.body,
              time: (parsedData[1].message.payload.message.date).slice(11, 16)
            }
            setOldMessage((prevMessage) => [...prevMessage, newMessage])
          }
        }
       
        if (parsedData[0].message.type == "mail.channel/new_message") {
          console.log("group wise communication ")
  
  
          if (parsedData[0].message.payload.isTyping == undefined && parsedData[0].message.payload.id == props.route.params) {
            const newMessage = {
              // id:23
              id: parsedData[0].message.payload.message.id,
              username: parsedData[0].message.payload.message.author.name,
              message: parsedData[0].message.payload.message.body,
              time: (parsedData[0].message.payload.message.date).slice(11, 16)
            }
            setOldMessage((prevMessage) => [...prevMessage, newMessage])
          }
        }
  
  
  
  
  
  
  
  
  
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollToEnd({ animated: true });
        }
  
  
  
  
  
  
        // const sortedData = [...oldMessage].sort((a, b) => b.id - a.id);
  
  
  
      };
  
      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
  
      ws.onclose = (event) => {
        console.log('WebSocket connection closed:', event);
      };
      
      // Add any setup logic you need here
    } else {
      // This code will run when the Chat screen loses focus.
      console.log('Chat screen is blurred');
      
      // Add any cleanup logic you need here
    }

   
  }, [isFocused]);

  const data = ['😀', '😃', '😄', '😆', '😝', '😅', '😂', '🤣', '🥲', '😇', '🙂', '😉', '😌', '😍', '🥰', '😘', '😗', '😚', '😋', '😛',
    '🤪', '🤨', '🧐', '🤓', '😎', '🥸', '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '😣', '😖', '😫', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬',
    '😳', '🥵', '🥶', '🤔', '🤗', '💋', '🤭', '👫', '🤫', '🙄', '🤒', '🤕', '😷', '🤠', '👍', '🤝', '🤞', '👌']; // Your emoji data


  console.log("message ", oldMessage)


  // Create a Set to store unique values based on 'id'
  const uniqueData = Array.from(new Set(oldMessage && oldMessage.map(item => item.id)))
    .map(id => oldMessage.find(item => item.id === id));

  const renderEmoji = ({ item }) => (
    <View style={{ padding: 10, backgroundColor: 'white' }}>
      <TouchableOpacity onPress={() => handleEmojiSelect(item)}>
        <Svg width="35" height="35">

          <SvgText x="0" y="20" fontSize="20">
            {item}
          </SvgText>


        </Svg>
      </TouchableOpacity>

    </View>
  );

  const handleEmojiSelect = emoji => {

    setMessage(message + emoji)


  };







  const openModal = () => {
    setIsModalVisible(true);
    Keyboard.dismiss()
  };

  const closeModal = () => {
    // setIsModalVisible(false);
  };




  const openKeyboard = () => {
    setIsModalVisible(false)
    inputRef.current.focus()
  }




  

  const keyboardDidShow = () => {
    setIsModalVisible(false)
    setIsKeyboardOpen(true);
  };

  const keyboardDidHide = () => {
    setIsKeyboardOpen(false);
  };




  const onBottomButtonPressed = event => {
    const { action } = event;

    console.log("<><>", action)

    if (action === 'capture') {
      // Handle capture logic
    } else if (action === 'cancel') {
      // Handle cancel logic
      console.log(event)
    }
  };



  const ReceivedMessage = async () => {
    const res = await getAllMeassage(props.route.params)
    setOldMessage(res)
    // console.log("old messages", res)
  }



  const renderItem = ({ item }) => (
    <View style={{ padding: 16 }}>
      <Text style={{ fontWeight: 'bold' }}>{item.username}</Text>
      <HTML source={{ html: item.message }} contentWidth={contentWidth} />
    </View>
  );




  const sendMessage = async () => {
    setMessage("")
    scrollViewRef.current.focus()
    const res = await usersendMessage(props.route.params, message)
    // console.log("response>>>>>>>", res)

    // ReceivedMessage()
  }


  console.log("channel id",props.route.params)
  return (
    // <GiftedChat
    //   messages={messages}
    //   onSend={onSend}
    //   user={user}
    //   placeholder="Type your message..."
    // />
   
      <View ref={myViewRef}  style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        {/* <Text>{props.route.params}</Text> */}
        <ScrollView style={{ flex: 0.9, }} ref={scrollViewRef} keyboardShouldPersistTaps="always">

          <View style={{ width: "100%" }}>
            {
              uniqueData && uniqueData.map((item) => {
                return (
                  <View key={item.id.toString()} style={{ padding: 16 }}>
                    <Text style={{ fontWeight: 'bold' }}>{item.username}</Text>
                    <HTML source={{ html: item.message }} contentWidth={contentWidth} />
                  </View>
                )
              })
            }
            {/* <FlatList
              data={uniqueData}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
            /> */}
          </View>
        </ScrollView>
        <View style={{ flexDirection: "row", width: "100%", alignItems: "center", margin: 10, marginBottom: 0 }}>
          <View style={{ width: "83%", borderRadius: 100, backgroundColor: "#FFFFFF", elevation: 10, marginBottom: 5 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {
                isModalVisible ?
                  <TouchableOpacity onPress={() => openKeyboard()}>
                    <Icon name="keyboard" size={25} color="#000000" style={{ marginLeft: 10 }} />
                  </TouchableOpacity>
                  :
                  <TouchableOpacity
                    onPress={() => {
                      openModal()
                    }}
                  >
                    <Icon name="emoji-happy" size={25} color="#000000" style={{ marginLeft: 10 }} />
                  </TouchableOpacity>
              }
              <TextInput
                ref={inputRef}
                style={{ paddingLeft: 10, alignItems: "center", width: message == "" ? "65%" : "76%" }}
                placeholder="Message "
                value={message}
                autoCorrect={false}
                onChangeText={(val) => setMessage(val)}
              />
              <Icon name="link" size={25} color="#000000" style={{ marginLeft: 10 }} />
              {message == "" && (
                <TouchableOpacity >
                  <Icon name="camera" size={25} color="#000000" style={{ marginLeft: 10 }} />
                </TouchableOpacity>
              )
              }
            </View>

          </View>
          <View style={{ alignItems: "center", backgroundColor: "green", borderRadius: 48 / 2, height: 48, width: 48, margin: 5, justifyContent: "center", marginRight: 10 }}>
            {message == "" ?
              <Icon name="mic" size={20} color="#FFFFFF" />
              :
              <TouchableOpacity onPress={() =>
                sendMessage()
              }>
                <SendIcon name="send" size={23} color="#FFFFFF" />
              </TouchableOpacity>
            }
          </View>
        </View>
        {
          isModalVisible ?
            <View style={{ flex: 0.7, alignItems: "center" }}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={data}
                renderItem={renderEmoji}
                keyExtractor={(item, index) => index.toString()}
                numColumns={7} // Set the number of columns you want
              />
            </View>
            :
            null
        }
      </View>
   
  );
};


export default Chat;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5FCFF",
    justifyContent: "center"
  },
  messageContainer: {
    borderRadius: 12,
    elevation: 10,
    padding: 10,
    marginVertical: 5,
    width: "70%"
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E0E0E0',
  },
  messageText: {
    fontSize: 16,
  },
})



