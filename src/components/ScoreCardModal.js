import React, { useEffect } from 'react'
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
//import { Navigate } from 'react-router-dom';
import Copy from '../images/copy.png'
import { API_URL, PRIVATE_KEY } from './Cred';
import { getBalance } from './cryptoFunctions';
import { eventTrack } from './eventTrack';
import Loader from './Loader';
import { getProvider } from './provider';
import { TransferAmount } from './transfer';
import Lottie from "lottie-react";
import json from '../images/success.json'


const customStyles = {
    content: {
      top: '20%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      borderRadius:10,
      transform: 'translate(-50%, -50%)',
    },
    overlay: {zIndex: 1000}
  };

export default function ScoreCardModal({gameStatus,played}) {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [userData,setUserData]=React.useState()
    const [loading,setLoading]=React.useState(false)
    const [balance,setBalance]=React.useState(0)
    const [claimed,setClaimed]=React.useState(false)
  const navigate=useNavigate()
    function fancyTimeFormat(duration)
{   
    // Hours, minutes and seconds
    var hrs = ~~(duration / 3600);
    var mins = ~~((duration % 3600) / 60);
    var secs = ~~duration % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}

const formatUsername=(name)=>{
if(name?.length>9){
  return `${name?.substring(0,9)}..`
}
else{
  return name
}

}

    const balanceAdd=async()=>{
      var balance=await getBalance()
      setBalance(balance);
      //return balance;
  }

  React.useEffect(()=>{
      //balanceAdd();
      
      
  },[gameStatus])

    

    useEffect(()=>{
        //console.log('Game Status Modal',gameStatus)
        if(modalIsOpen==true){
            //fetchScore();
        }
           
        
    },[modalIsOpen])

  return (
    <>
    <div style={{display:'flex',height:'100%',justifyContent:'flex-end',marginTop:10,marginBottom:10,width:320}}>
    {/* <Modal
        isOpen={modalIsOpen}
        ariaHideApp={false}
        onRequestClose={()=>setIsOpen(false)}
        style={customStyles}
        className="Modal"
        overlayClassName="Overlay"
        contentLabel="Modal"
      > 
        
      </Modal> */}
      <div style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingLeft:10,borderRadius:10,width:'100%',justifyContent:'space-between'}}>
      
      {/* <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',paddingLeft:10,borderRadius:10,backgroundColor:'#0A1E26',height:48,width:120}}>
      <p className='modalHeader'>
        {Math.round(balance*100)/100}
      </p>
      <img src='https://thegivingblock.com/wp-content/uploads/2021/07/Polygon-MATIC-Logo.png' height={16} width={16} style={{marginLeft:5,marginRight:5}} />
      </div> */}

      <div onClick={()=>{
        //setIsOpen(true)
        navigate('/score')
        //localStorage.clear();
        //window.location.reload(false)
      }
        } style={{borderRadius:10,width:120,padding:2,backgroundColor:'#2f3033',borderWidth:1,borderColor:'rgba(255,64,131,1)',height:48,flexDirection:'row',display:'flex',alignItems:'center',justifyContent:'center',zIndex:10}}>
        <p className='addressText'>{formatUsername(localStorage.getItem('username')) || 'Score'}</p>
        </div>

      </div>
      </div>
      </>
  )
}
