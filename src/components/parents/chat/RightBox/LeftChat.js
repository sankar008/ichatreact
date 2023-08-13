import React, { useEffect, useState } from 'react'

import '../Chat.scss'
import FriendsChat from './FriendsChat'


function LeftChat() {
  return (
    <div className="left-chat">
        <div className="chat-innr">
            <div className="chat-img">
                <figure><img src={require('../../../../assets/img/chat-img.png')} alt="" /></figure>
            </div>
            <div className="chat-txt">
                <h3>Wayne D</h3>
                <FriendsChat />
                <FriendsChat />
                <span>09:25 AM</span>
            </div>
        </div>
    </div>
  )
}

export default LeftChat