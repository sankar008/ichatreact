import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './Chat.scss'


function MessageBox() {
  return (
    <div className="message-box d-flex align-items-center justify-content-center">
        <div className="message-box-innr">
          <Link href="/" className="chat-logo"><img src={require('../../../assets/img/chat-logo.png')} alt="" /></Link>
          <h3>Your messages</h3>
          <p>Send private photos and messages to a friend or group</p>
          <Link href="/" className="btn">Send message</Link>
        </div>
    </div>
  )
}

export default MessageBox