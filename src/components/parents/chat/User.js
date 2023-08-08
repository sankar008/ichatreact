import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './Chat.scss'


function User() {
  return (
    <div  className="user-box d-flex align-items-center">
        <span className="user-active"></span>
        <div className="user-box-left">
            <span><img src={require('../../../assets/img/user2.png')} alt="" /></span>
        </div>
        <div className="user-box-right">
            <h4>Mike Paul</h4>
            <p>Hey! Let’s catch up<span>∙ 1min</span></p>
        </div>
    </div>
  )
}

export default User