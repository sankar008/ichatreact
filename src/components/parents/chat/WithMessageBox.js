import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import LeftChat from './RightBox/LeftChat';
import RightChat from './RightBox/RightChat';
import AudioChat from './RightBox/AudioChat';
import './Chat.scss'

import axios from "axios";
import * as c from "../../../api/constant";
import { io } from "socket.io-client";
import { Avatar, Badge, Button, ButtonGroup, IconButton } from '@mui/material';
import { PiPaperPlaneRightFill, PiXBold } from 'react-icons/pi'
const initialPostvalue = {
    message: ''
};
function WithMessageBox(props) {
    const socket = io(c.SOCKET_URL);
    let [chatUser, setchatUser] = useState([]);
    let [chatCode, setChatCode] = useState(props.chatRoomCode);
    let [userMessage, setUserMessage] = useState([]);
    const [formData, setformData] = React.useState(initialPostvalue);


    const getChatUser = async () => {
        try {
            const header = localStorage.getItem("__tokenCode");
            const userCode = localStorage.getItem("__userId");
            const chatRoomCode = props.chatRoomCode;
            const url = c.CHATROOME + "/participants/" + chatRoomCode + '/' + userCode;

            const res = await axios.get(url, {
                headers: JSON.parse(header),
            });

            if (res.data.success === 1) {
                let participant = '';
                res.data.data.map((user, index) => {
                    if (user.userCode != userCode) {
                        participant = user;
                    }
                })
                setchatUser(participant);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getMessage = async () => {
        try{
            const header = localStorage.getItem("__tokenCode");
            const userCode = localStorage.getItem("__userId");
            const chatRoomCode = props.chatRoomCode;
            const url = c.CHAT+"/"+chatRoomCode;
            const res = await axios.get(url, {
                headers: JSON.parse(header),
            }); 
            if(res.data.message === 1){
                setUserMessage(res.data.data);
            }
        }catch(error){
            console.log(error);   
        }
    }

    const getMessageio = async () => {
        socket.once("receiveMessage", (data) => {
            setUserMessage(data);
        });     
    }

    const handalerChanges = async (e) => {     
        const { name, value } = e.target;
        setformData({ ...formData, [name]: value });
    }

    const submitMessage = () => {
        const chatRoomCode = props.chatRoomCode;
        const imageData = '';
        const text = formData.message;
        const sendStatus = socket.emit("sendMessageByUser", {
            sendBy: localStorage.getItem("__userId"),
            chatroomCode: chatRoomCode,
            message: text,
            image: imageData,
        });
        getMessageio();
        setformData(initialPostvalue)
    };


    useEffect(() => {
        getChatUser();
        getMessage();
        getMessageio()
    }, [props.chatRoomCode]);

    return (
        <div className="with-message-box">
            <div className="user-details">
                <Link href="/" className="user-details-left">
                    <div className="user-details-pic">
                        <figure><img src={chatUser.image ? c.IMG + chatUser.image : require('../../../assets/img/user2.png')} alt="" /></figure>
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
                {/* <h5>Today</h5> */}
            </div>
            <ul>
                {
                    userMessage.map((message, index) => {
                        return (
                            message.sendBy == localStorage.getItem("__userId") ? <li className='my_msgs' key={index}>
                                <div className="right-chat">
                                    <p>{message.message}</p>
                                    {/* <span>09:25 AM</span> */}
                                </div>
                            </li> : <li className='frnd_msgs' key={index}>
                                <div className="left-chat">
                                    <div className="chat-innr">
                                        <div className="chat-img">
                                            <figure><img src={c.IMG+message.user.image} alt="" /></figure>
                                        </div>
                                        <div className="chat-txt">
                                            <h3>{message.user.firstName+' '+message.user.lastName}</h3>
                                            <p>{message.message}</p>
                                            {/* <span>09:25 AM</span> */}
                                        </div>
                                    </div>
                                </div>
                            </li>);
                    })
                }
            </ul>
            <div className="write-message">
                <div className="attach-file">
                    <span className="attach-icon"><img src={require('../../../assets/img/attach-icon.png')} alt="" /></span>
                    <input className="input-file" type="file" />
                </div>
                <div className="write-message-box">
                    <input className="input-message" type="text" value={formData.message} name="message" id="message" onChange={handalerChanges} placeholder='Write your message' />
                    <div className="input-file-innr">
                        {/* <span><img src={require('../../../assets/img/file-icon.png')} alt="" /></span>
                    <input className="input-file" type="file" /> */}
                        <ButtonGroup spacing="0.5rem" aria-label="spacing button group">
                            <IconButton sx={{ color: 'white' }} onClick={submitMessage}><PiPaperPlaneRightFill /></IconButton>
                        </ButtonGroup>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WithMessageBox