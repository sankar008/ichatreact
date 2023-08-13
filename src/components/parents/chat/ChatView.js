import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import LeftPanel from '../chat/LeftPanel';
import MessageBox from '../chat/MessageBox';
import User from '../chat/User';
import './Chat.scss'
import WithMessageBox from './WithMessageBox';


function ChatView() {
  return (
    <div className="admin-wrapper">
        <LeftPanel />
        <div className="right-content d-flex">
            <div className="chat-box">
              <div className="chat-box-top d-flex justify-content-between align-items-center">
                      <Link href="/" className="chat-box-left d-flex align-items-center">
                        <div className="chat-box-pic">
                            <span><img src={require('../../../assets/img/user1.png')} alt="" /></span>
                        </div>
                        <div className="chat-box-txt">
                            <h6>sharon.</h6>  
                            <p>sharon12_</p>
                        </div>
                    </Link>
                    <Link href="/"><img src={require('../../../assets/img/edit-icon.png')} alt="" /></Link>
              </div>
              <div className="chat-box-btm">
                  <h3>Messages</h3>
                  <ul>
                    <li>
                      <Link href="/">
                          <User />
                      </Link>
                    </li>
                    <li>
                      <Link href="/">
                          <User />
                      </Link>
                    </li>
                    <li>
                      <Link href="/">
                          <User />
                      </Link>
                    </li>
                    <li>
                      <Link href="/">
                          <User />
                      </Link>
                    </li>
                    <li>
                      <Link href="/">
                          <User />
                      </Link>
                    </li>
                    <li>
                      <Link href="/">
                          <User />
                      </Link>
                    </li>
                    <li>
                      <Link href="/">
                          <User />
                      </Link>
                    </li>
                    <li>
                      <Link href="/">
                          <User />
                      </Link>
                    </li>
                    <li>
                      <Link href="/">
                          <User />
                      </Link>
                    </li>
                    <li>
                      <Link href="/">
                          <User />
                      </Link>
                    </li>
                    <li>
                      <Link href="/">
                          <User />
                      </Link>
                    </li>
                  </ul>
              </div>
            </div>
            <WithMessageBox />
            {/* <MessageBox /> */}

        </div>
    </div>
  )
}

export default ChatView