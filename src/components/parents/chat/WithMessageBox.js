import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import LeftChat from './RightBox/LeftChat';
import RightChat from './RightBox/RightChat';
import AudioChat from './RightBox/AudioChat';
import './Chat.scss'

import axios from "axios";
import * as c from "../../../api/constant";
import { io } from "socket.io-client";


function WithMessageBox(props) {
    const socket = io(c.SOCKET_URL);

    let [ chatUser, setchatUser ] = useState([]);
    let [ chatCode, setChatCode ] = useState(props.chatRoomCode);
    let [ userMessage, setUserMessage ] = useState([]);
 
    const getChatUser = async (chatRoomCode) => {
        try{
          const header = localStorage.getItem("__tokenCode");
          const userCode = localStorage.getItem("__userId");

          const url = c.CHATROOME+"/participants/"+chatRoomCode+'/'+userCode;
    
          const res = await axios.get(url, {
            headers: JSON.parse(header),
          }); 
    
          console.log(res.data.data);
          if(res.data.success === 1){
            let participant = '';
            res.data.data.map((user, index)=>{
               if(user.userCode != userCode){
                 participant = user;
               } 
            })   
            setchatUser(participant);
          } 
        }catch (error) {
          console.log(error);
        }
    }

    const getMessage = async (chatRoomCode) => {
        console.log("Test");
        //   socket.emit("activeuser", {
        //     userCode: localStorage.getItem("__userId"),
        //   });
          socket.once("receiveMessage", (data) => {
            console.log("data", data);
            setUserMessage(data);
          });
        // try{
        //     const header = localStorage.getItem("__tokenCode");
        //     const userCode = localStorage.getItem("__userId");
        //     const url = c.CHAT+"/"+chatRoomCode;
        //     const res = await axios.get(url, {
        //         headers: JSON.parse(header),
        //     }); 
        //     if(res.data.success === 1){
        //         setUserMessage(res.data.data);
        //     }
        // }catch (error) {
        //   console.log(error);
        // }      
    }

    const messageSend = (chatRoomCode) => {
        console.log(chatRoomCode);
        
        const imageData = '';
        const text = "Hello";
        const sendStatus = socket.emit("sendMessageByUser", {
          sendBy: localStorage.getItem("__userId"),
          chatroomCode: chatRoomCode,
          message: text,
          image: imageData,
        });
     
    };


    useEffect(() => {      
        getChatUser(props.chatRoomCode);
        getMessage(props.chatRoomCode);
        messageSend(props.chatRoomCode);
      }, [props.chatRoomCode]);


   
  return (
    <div className="with-message-box">
        <div className="user-details">
            <Link href="/" className="user-details-left">
                <div className="user-details-pic">
                    <figure><img src={chatUser.image?c.IMG+chatUser.image:require('../../../assets/img/user2.png')} alt="" /></figure>
                    <span className="user-act"></span>
                </div>
                <div className="user-details-txt">
                    <h4>{chatUser.name}</h4>
                    <p>Active now</p>
                </div>
            </Link>
            <ul>
                <li><Link href="/"><img src={require('../../../assets/img/tel-icon.png')} alt="" /></Link></li>
                <li><Link href="/"><img src={require('../../../assets/img/video-icon.png')} alt="" /></Link></li>
            </ul>
        </div>
        <div className="text-center">
            <h5>Today</h5>
        </div>
        <ul>

        {/* {
                userMessage.map((message, index) =>{
                    return (
                    message.sendBy == localStorage.getItem("__userId")? <li>
                     <div className="right-chat">
                        <p>Hey, what’s up?</p>
                        <span>09:25 AM</span>
                    </div>
                    </li>: <li>
                    <div className="left-chat">
                        <div className="chat-innr">
                            <div className="chat-img">
                                <figure><img src={require('../../../assets/img/user2.png')} alt="" /></figure>
                            </div>
                            <div className="chat-txt">
                                <h3>Wayne D</h3>
                                <p>This Is textT</p>
                                <span>09:25 AM</span>
                            </div>
                        </div>
                    </div>
                    </li>);
                })
            } */}
            <li>
                <RightChat />
            </li>
            <li>
                <RightChat />
            </li>
            <li>
                <RightChat />
            </li>
            <li>
                <RightChat />
            </li>
            <li>
                <RightChat />
            </li>
            <li>
                <LeftChat />
            </li> 
            <li>
                <LeftChat />
            </li> 
            <li>
                <LeftChat />
            </li> 
            <li>
                <LeftChat />
            </li>         
             <li>
                <AudioChat />
            </li>
        </ul>
        <div className="write-message">
            <div  className="attach-file">
                <span className="attach-icon"><img src={require('../../../assets/img/attach-icon.png')} alt="" /></span>
                <input className="input-file" type="file" />
            </div>
            <div className="write-message-box">
                <input className="input-message" type="text" placeholder='Write your message' />
                <div className="input-file-innr">
                    <span><img src={require('../../../assets/img/file-icon.png')} alt="" /></span>
                    <input className="input-file" type="file" />
                </div>
            </div>
            <Link href="/" className="camara-icon"><img src={require('../../../assets/img/camara-icon.png')} alt="" /></Link>
            <Link href="/" className="mic-icon"><img src={require('../../../assets/img/mic-icon.png')} alt="" /></Link>
        </div>
    </div>
  )
}

export default WithMessageBox