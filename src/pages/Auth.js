import React from 'react'
import Gif from '../images/Flappy.gif';
//import Logo from '../res/flappy-bird-logo.png'
import Logo from '../images/game-logo.svg'
import axios from 'axios';
import { PARTNER_ID, PARTNER_KEY } from '../constants';

export default function Auth() {

console.log(`${window.location.origin}/redirect`)

  const KometLogin=async()=>{
    //Initialize PARTNER Credentials
    const ID=PARTNER_ID;
    const KEY=PARTNER_KEY;
    //Initialize Redirect URL where sdk will redirect after authentication
    const redirectUrl=`${window.location.origin}/redirect`
    window.location.href=`https://sdk.komet.me/google/partner/auth?partnerId=${ID}&partnerKey=${KEY}&redirectUrl=${redirectUrl}`
  }

  return (
    <div style={{backgroundColor:'black',height:'100vh',paddingBottom:150}}>
          <div style={{ backgroundColor: 'black', alignSelf: 'center', alignItems: 'center', display: 'flex', justifyContent: 'space-around', flex: 1, flexDirection: 'column', flex: 1,height:'100%' }}>
          <div style={{ alignSelf: "center", alignItems: 'center', justfyContent: 'center', flexDirection: 'row',display:'flex',position:'relative' }}>
              <img 
              alt=''
              onClick={()=>{
                //KometLogin();
              }} style={{borderRadius:10,width:320,height:150,objectFit:'contain'}}  src={Logo} />
            </div>
          
            <img style={{ borderRadius: 20 }} src={Gif} />
            <button onClick={()=>{
              //After Clicking on Login, Window will open sdk page and redirect on authentication
                KometLogin();
              }} className='loginText'>Login with Komet</button>
          </div>
        </div>
  )
}
