import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import LeftPanel from '../chat/LeftPanel';
import MessageBox from '../chat/MessageBox';
// import User from '../chat/User';
import './Chat.scss'
import WithMessageBox from './WithMessageBox';
import axios from "axios";
import * as c from "../../../api/constant";





function ChatView() {
  let [ chatRoom, setChatRoom ] = useState([]);
  let [ userData, setUserData ] = useState([]);
  let [ chatRoomCode, setChatRoomCode ] = useState('');
  let [isMessageBox, setIsMessageBox] = useState(true);

  const chatRoomeShoow = async () => {
    try {
      const header = localStorage.getItem("__tokenCode");
      const url = c.CHATROOME+"/"+localStorage.getItem("__userId");
      const res = await axios.get(url, {
        headers: JSON.parse(header),
      });   

      if(res.data.success === 1){
        setChatRoom(res.data.data);
      } 

    } catch (error) {
      console.log(error);
    }
  };

  const getLoginUser = async () => {
    try{
      const header = localStorage.getItem("__tokenCode");
      const userCode = localStorage.getItem("__userId");
      const url = c.USER+"/"+userCode;

      const res = await axios.get(url, {
        headers: JSON.parse(header),
      }); 

      if(res.data.success === 1){
        setUserData(res.data.data);
      } 
    }catch (error) {
      console.log(error);
    }
  }
  
  const getMessage = (chatRoomCode) =>{
    setIsMessageBox(false);
    setChatRoomCode(chatRoomCode)
  }
  
  useEffect(() => { 
    chatRoomeShoow();
    getLoginUser();  
  },[]);
  return (
    <div className="admin-wrapper">
        <LeftPanel />
        <div className="right-content d-flex">
            <div className="chat-box">
              <div className="chat-box-top d-flex justify-content-between align-items-center">
                      <Link href="/" className="chat-box-left d-flex align-items-center">
                        <div className="chat-box-pic">
                            <span><img src={userData.image?c.IMG+userData.image:require('../../../assets/img/user1.png')} alt="" /></span>
                        </div>
                        <div className="chat-box-txt">
                            <h6>{userData.firstName+ ' '+ userData.lastName }</h6>  
                            {/* <p>sharon12_</p> */}
                        </div>
                    </Link>
                    {/* <Link href="/"><img src={require('../../../assets/img/edit-icon.png')} alt="" /></Link> */}
              </div>
              <div className="chat-box-btm">
                  <h3>Messages</h3>
                  <ul>
                    {
                      chatRoom.map((room, index) => {
                        return (
                          <li key={index}>
                          <Link href="/" onClick={()=>getMessage(room.chatroomCode)}>
                          <div  className="user-box d-flex align-items-center">
                            <span className="user-active"></span>
                            <div className="user-box-left">
                                <span><img src={ room.image?c.IMG+room.image:require('../../../assets/img/user2.png')} alt="" /></span>
                            </div>
                            <div className="user-box-right">
                                <h4>{room.name}</h4>
                                <p><span>∙ 1min</span></p>
                            </div>
                          </div>
                          </Link>
                        </li>
                        )
                      })
                    }                 
                  
                  </ul>
              </div>
            </div>
            {
              isMessageBox == true?<MessageBox />:<WithMessageBox chatRoomCode={chatRoomCode}/>
            }
        </div>
    </div>
  )
}

export default ChatView