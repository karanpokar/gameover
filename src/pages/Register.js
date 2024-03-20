import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { API_URL, TESTAPI } from '../components/Cred';
import { createWallet, encryptData, generatePhrase } from '../components/cryptoFunctions';
import { eventTrack } from '../components/eventTrack';
import Gif from '../images/Flappy.gif';
//import Logo from '../res/flappy-bird-logo.png'
import Logo from '../images/gameover.gif'

export default function Register() {
    const navigate=useNavigate()

    const [userName,setUserName]=useState('')

   

  return (
   <></>
  )
}
