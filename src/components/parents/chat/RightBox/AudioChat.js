import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import '../Chat.scss'


function AudioChat() {
  return (
    <div className="right-chat">
        <div className="audio-box">
            <Link href="/"><img src={require('../../../../assets/img/audio.png')} alt="" /></Link>
            <h6>00:16</h6>
        </div>
        <span>09:25 AM</span>
    </div>
  )
}

export default AudioChat