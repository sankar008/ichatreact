import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import LeftChat from './RightBox/LeftChat';
import RightChat from './RightBox/RightChat';
import AudioChat from './RightBox/AudioChat';
import './Chat.scss'

// const [chat, setChat] = useState([])


function WithMessageBox() {
  return (
    <div className="with-message-box">
        <div className="user-details">
            <Link href="/" className="user-details-left">
                <div className="user-details-pic">
                    <figure><img src={require('../../../assets/img/chat-img.png')} alt="" /></figure>
                    <span className="user-act"></span>
                </div>
                <div className="user-details-txt">
                    <h4>Wayne D</h4>
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
            <li>
                <RightChat />
            </li>
            <li>
                <LeftChat />
            </li>
            <li>
                <RightChat />
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