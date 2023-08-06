import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './Chat.scss'


function LeftPanel() {
  return (
    <div className="left-panel d-flex flex-column justify-content-between align-items-center">
        <div className="left-menu">
            <Link href="/" className="admin-logo"><img src={require('../../../assets/img/logo-wh.png')} alt="" /></Link>
            <ul>
                <li><Link href="/"><img src={require('../../../assets/img/icon1.png')} alt="" /></Link></li>
                <li><Link href="/"><img src={require('../../../assets/img/icon2.png')} alt="" /></Link></li>
                <li><Link href="/"><img src={require('../../../assets/img/icon3.png')} alt="" /></Link></li>
                <li><Link href="/"><img src={require('../../../assets/img/icon4.png')} alt="" /></Link></li>
                <li><Link href="/"><img src={require('../../../assets/img/icon5.png')} alt="" /></Link></li>
                <li><Link href="/"><img src={require('../../../assets/img/icon6.png')} alt="" /></Link></li>
                <li><Link href="/"><img src={require('../../../assets/img/icon7.png')} alt="" /></Link></li>
            </ul>
        </div>
        <div className="left-bar">
            <Link href="/"><img src={require('../../../assets/img/bar.png')} alt="" /></Link>
        </div>
    </div>
  )
}

export default LeftPanel