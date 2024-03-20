import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
//import { Navigate } from 'react-router-dom';
import Copy from '../images/copy.png'
import { API_URL, PRIVATE_KEY } from './Cred';
import { getBalance } from './cryptoFunctions';
import { eventTrack } from './eventTrack';
import Loader from './Loader';
import { getProvider } from './provider';
import { SignTransaction, TransferAmount } from './transfer';
import Lottie from "lottie-react";
import json from '../images/success.json'
import Gif from '../images/Flappy.gif';
//import Logo from '../res/flappy-bird-logo.png'
import Logo from '../images/gameover.gif'
import Leaderboard from './Leaderboard';
import image from '../images/Poly.svg'
import close from '../images/close.svg'
import eye from '../images/eye.svg'

function ScoreCard() {
    const [userData,setUserData]=React.useState()
    const [loading,setLoading]=React.useState(false)
    const [balance,setBalance]=React.useState(0)
    const [claimed,setClaimed]=React.useState(false)
    const [leaderBoard,setLeaderBoard]=React.useState([])
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
        ret += "" + hrs + "hrs:" + (mins < 10 ? "0" : "mins");
    }

    ret += "" + mins + " min:" + (secs < 10 ? "0" : " ");
    ret += "" + secs +" sec";
    return ret;
}

const formatUsername=(name)=>{
if(name?.length>6){
  return `${name?.substring(0,6)}..`
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

  const getBorder=(index)=>{
    var color;
    switch (index) {
        case 0:
          color = "#ffdc52";
          break;
        case 1:
            color = "#d8d9c9";
          break;
        case 2:
            color = "#CD7F32";
          break;
        default:
        color='white';
        break;
      }
      //console.log(color)
      return color
}

const fetchLeaderBoard=async()=>{
    await fetch(`${API_URL}/game/leaderBoard`)
          .then((resp) => {
            resp.json().then((res) => {
              setLeaderBoard(res)
            })
              .catch((error) => { 
                console.log('Error',error)
              });
          })
}

  React.useEffect(()=>{
      balanceAdd();
      fetchLeaderBoard();
  },[])

    const fetchScore=()=>{
        //console.log('Score fetched')
        fetch(`${API_URL}/game/user?userId=${localStorage.getItem('userId')}`,{
          headers:{
            'Authorization':`Bearer ${localStorage.getItem('auth')}`
          }
        }).then((resp) => {
            resp.json().then((res) => {
             // console.log("res", res)
              if (res.userId) {
                setUserData(res)
              } else {
                console.log("Logged");
                //this.setState({ newUser: true, loggedIn: true })
              }
            })
              .catch((error) => { });
          })
    }

    const withdrawAmountFromBlockchain=async()=>{
      
        const props = {
            address: localStorage.getItem("address"),
            api: PRIVATE_KEY,
            amount: '0.1',
          };
          //console.log(props)
          const tx = await TransferAmount(props);
          //console.log('Hash',tx)
          if (tx.hash) {
            
            getProvider()
              .waitForTransaction(tx.hash)
              .then((res) => {
                console.log('Success',tx.hash)
                setLoading(false)
                setClaimed(true)
                eventTrack('CHAIN_WITHDRAW',localStorage.getItem('userId'),tx.hash)
                setTimeout(()=>{
                  setClaimed(false)
                  window.location.reload(false)
                },[3000])
                // setIsFetch(false);
                // navigate(-1);
              })
              .catch((err) => 
              {
                console.log(err);
                eventTrack('CHAIN_WITHDRAW','FAILURE',tx.hash)
          });
          } else {
            eventTrack('CHAIN_WITHDRAW_WO_HASH','FAILURE','')
            //setIsFetch(false);
          }
    }

    const withdrawAmount=async()=>{
      setLoading(true)
        fetch(`${API_URL}/game/withdraw`, {
                method: 'POST',
                body: JSON.stringify({
                  userId:parseInt(localStorage.getItem('userId')),
                  score:userData?.score,
                  time:userData?.time,
                  claimedTokens:0.01
              }),
                headers: {
                  'Content-type': 'application/json; charset=UTF-8',
                  'Authorization':`Bearer ${localStorage.getItem('auth')}`
                }
              })
                .then(function async(response) {
                  //console.log(response)
                  
                  withdrawAmountFromBlockchain()
                  eventTrack('WITHDRAW',localStorage.getItem('userId'),userData?.score)
                  fetchScore()
                  //return response
                }).catch((error)=>{
                  console.log('Error Update',error)
                  eventTrack('WITHDRAW','FAILURE',localStorage.getItem('userId'))
                })
    }

    useEffect(()=>{
        //console.log('Game Status Modal',gameStatus)
       
            fetchScore();
        
           
        
    },[])
  return (
    <div style={{backgroundColor:'black',paddingBottom:150,alignItems:'center',justifyContent:'center',display:'flex',minHeight:'100vh',paddingLeft:5,paddingRight:5}}>
         <div style={{backgroundColor:'black',borderRadius:10,flexDirection:'column',display:'flex',justifyContent:'center',alignItems:'center',width: '100%',maxWidth:400,alignContent:'center',height:'100%',alignSelf:'center',overflow:'hidden'}}>
    {/* <img style={{height:30,width:30,marginRight:10}} src={'https://cdn-icons-png.flaticon.com/512/1496/1496830.png'}/>
    <p className='modalHeader'>{localStorage.getItem('username')}</p> */}
    {/* <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
    <p className='modalSubHeader'>{localStorage.getItem('address')?.substring(0,4)}...{localStorage.getItem('address')?.substring(38,42)}</p>
    <img onClick={() => {navigator.clipboard.writeText(localStorage.getItem('address'))}} style={{height:15,width:15,marginLeft:10}} src={Copy}/>
    </div> */}
<div style={{display:'flex',flexDirection:'row',alignItems:'center',alignSelf:'flex-end'}}>
<img style={{height:30,width:30,marginRight:5,marginTop:5}} onClick={()=>navigate(-1)} src={'https://cdn-icons-png.flaticon.com/512/463/463612.png'}/>
    </div>

    <div style={{height:20}}></div>
    <div className='gradient' style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-around',alignSelf:'center',alignItems:'center',borderRadius:40,padding:10}}>
    <div >
        <p className='modalHeader'>{localStorage.getItem('username')}</p>
        <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
    <p className='modalSubHeader'>{localStorage.getItem('address')?.substring(0,4)}...{localStorage.getItem('address')?.substring(38,42)}</p>
    <img onClick={() => {navigator.clipboard.writeText(localStorage.getItem('address'))}} style={{height:15,width:15,marginLeft:10}} src={Copy}/>
    </div>
        </div>
        <div className='gradientVertical' style={{height:40,width:0.4}}></div>
        {/* <div >
        <p className='modalHeader'>{userData?.score} Komets</p>
        <p className='modalSubHeader'>Total Score</p>
        </div> */}
        <div style={{display:'flex',alignItems:'center',justifyContent:'flex-start',}}>
        <div>
       
            <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
            
            <p className='modalSubHeader'>Komets</p>
        
        </div>
        
        
        <p className='modalHeader'>{userData?.score || 0}</p>
        {/* <p className='modalSubHeader'>Total Time</p> */}
        </div>
        <img style={{height:30,width:30}} src='https://cdn-icons-png.flaticon.com/512/8331/8331211.png'/>
        </div>
        
        
    </div>
    <div style={{width:'100%',height:44,backgroundColor:'#242C3B',borderRadius:8,alignItems:'center',justifyContent:'space-between',display:'flex',marginTop:20,marginBottom:20,paddingLeft:20,paddingRight:20}}>
    
    <p className='modalHeader'> Play more, Earn more!</p>
    <img src={'https://camo.githubusercontent.com/6eb91e77ff79a529a28351674edf08a43beffb797cc0838abdd0c89331620a82/68747470733a2f2f63646e33642e69636f6e73636f75742e636f6d2f33642f7072656d69756d2f7468756d622f706f6c79676f6e2d343932343330392d343130323036302e706e67'} style={{width:30,height:30}}/>
    
    </div>
   
    {/* <img style={{height:150,width:200,marginRight:0,borderRadius:20}} src={'https://cdn.dribbble.com/users/360356/screenshots/15315364/media/cd0616f68f7ee603fdfb250116377109.png'}/>
     */}
    {/* <div style={{height:20}}/> */}
    <p style={{color:'rgba(255,255,255,0.6)'}} className='modalSubHeader'>Score and collect +5000 Komets to be eligible for Exclusive Merch - Stickers and Hoodies!</p>

    {/* <div style={{height:20}}/> */}
    <Leaderboard />
    <div onClick={()=>{
    SignTransaction('Hello World')
    //localStorage.clear();
    //
    //navigate('/');
    //window.location.reload(false)
  }
    }  style={{width:'100%',height:44,backgroundColor:'#242C3B',borderRadius:8,alignItems:'center',justifyContent:'flex-start',display:'flex',marginTop:5,marginBottom:20,paddingLeft:20,paddingRight:20}}>
    {/* <img src={close} style={{width:20,height:20,marginRight:10}}/> */}
    
    <p className='modalHeader'> Sign Message</p>
    
    </div>
    <div onClick={()=>{
    window.location.replace(`https://polygonscan.com/address/${localStorage.getItem('address')}`)
  }
    } style={{width:'100%',height:44,backgroundColor:'#242C3B',borderRadius:8,alignItems:'center',justifyContent:'flex-start',display:'flex',marginTop:20,marginBottom:5,paddingLeft:20,paddingRight:20}}>
    <img src={eye} style={{width:20,height:20,marginRight:10}}/>
    
    <p className='modalHeader'> Track Wallet Transaction</p>
    
    </div>
   
    <div onClick={()=>{
    
    localStorage.clear();
    //
    navigate('/');
    window.location.reload(false)
  }
    }  style={{width:'100%',height:44,backgroundColor:'#242C3B',borderRadius:8,alignItems:'center',justifyContent:'flex-start',display:'flex',marginTop:5,marginBottom:20,paddingLeft:20,paddingRight:20}}>
    <img src={close} style={{width:20,height:20,marginRight:10}}/>
    
    <p className='modalHeader'> Logout</p>
    
    </div>
    {(userData?.time>600 && loading)&&
        <Loader/>
        }
        {claimed&&
          <Lottie animationData={json} style={{height:100,width:100}} loop={true} />
        }
        <div style={{flex:1,flexDirection:'row',display:'flex',width:320,justifyContent:'space-around'}}>
    
        
        
        
        
        </div>
        
        </div>
       
        </div>
  )
}

export default ScoreCard

{/*

*/}