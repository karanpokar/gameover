import React, { useEffect, useState } from 'react'
import { API_URL } from './Cred'

export default function Leaderboard({gameStatus,played}) {
const [leaderBoard,setLeaderBoard]=useState([])
const [index,setIndex]=useState(0)

useEffect(()=>{
    //console.log(gameStatus,played)
    setTimeout(()=>fetchLeaderBoard()
    ,1000)

    
},[])

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
const getText=(index)=>{
  var color;
  switch (index) {
      case 0:
        color = "#955FB8";
        break;
      case 1:
          color = "#7ED076";
        break;
      case 2:
          color = "#5899B4";
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
              var index = res.findIndex(function(item, i){
                return item.username === localStorage.getItem('username')
              });
              setIndex(index)
            })
              .catch((error) => { 
                console.log('Error',error)
              });
          })
}
console.log(index)
  return (
    <div className='gradientLeaderBoard' style={{width:'100%',marginTop:10,marginBottom:10,backgroundColor:'black',alignItems:'center',justifyContent:'center',display:'flex',paddingTop:1,borderRadius:20,paddingBottom:1}} >
    <div style={{width:'99%',backgroundColor:'#242C3B',borderRadius:20,paddingLeft:10,paddingRight:10,paddingBottom:10}}>
        <p className='loginText' style={{alignSelf:'flex-start'}}>Leaderboard</p>
        {leaderBoard.slice(0,3).map((item,ind)=>(
          <div style={{borderRadius:10,marginBottom: ind==2?0:10}}>
             <div className='glass'>
                <p className='leaderBoardText'>{ind+1}</p>
                <div style={{width:'80%',display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
                <p className='modalHeaderleader' style={{color:getText(ind),fontWeight:'bold'}}>{item.username}</p>
                <p className='modalSubHeaderleader' style={{color:'white',fontWeight:'bold'}}>{item.score}</p>
                </div>
            </div>
            </div>
        ))}
        <>
        {index==3?<div style={{borderRadius:10,marginBottom:10}}>
             <div className='glass'>
                <p className='leaderBoardText'>{index+1}</p>
                <div style={{width:'80%',display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
                <p className='modalHeaderleader' style={{color:getText(index),fontWeight:'bold'}}>{leaderBoard[index]['username']}</p>
                <p className='modalSubHeaderleader' style={{color:'white',fontWeight:'bold'}}>{leaderBoard[index]['score']}</p>
                </div>
            </div>
            </div>:<div style={{borderRadius:10,marginBottom:10,alignSelf:'flex-start',alignItems:'flex-start'}}>
            
             <p style={{color:'white',fontSize:20}}>.</p>
                <div style={{width:'80%',display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
                </div>
            
            </div>}
        </>
        
        <>
        {index==4?<div style={{borderRadius:10,marginBottom:10}}>
             <div className='glass'>
                <p className='leaderBoardText'>{index+1}</p>
                <div style={{width:'80%',display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
                <p className='modalHeaderleader' style={{color:getText(index),fontWeight:'bold'}}>{leaderBoard[index]['username']}</p>
                <p className='modalSubHeaderleader' style={{color:'white',fontWeight:'bold'}}>{leaderBoard[index]['score']}</p>
                </div>
            </div>
            </div>:<div style={{borderRadius:10,marginBottom:10,alignSelf:'flex-start',alignItems:'flex-start'}}>
             
             <p style={{color:'white',fontSize:20}}>.</p>
                <div style={{width:'80%',display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
                </div>
         
            </div>}
        </>
        <>
        {index==5?<div style={{borderRadius:10,marginBottom:10}}>
             <div className='glass'>
                <p className='leaderBoardText'>{index+1}</p>
                <div style={{width:'80%',display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
                <p className='modalHeaderleader' style={{color:getText(index),fontWeight:'bold'}}>{leaderBoard[index]['username']}</p>
                <p className='modalSubHeaderleader' style={{color:'white',fontWeight:'bold'}}>{leaderBoard[index]['score']}</p>
                </div>
            </div>
            </div>:<div style={{borderRadius:10,marginBottom:10,alignSelf:'flex-start',alignItems:'flex-start'}}>
            
             <p style={{color:'white',fontSize:20}}>.</p>
                <div style={{width:'80%',display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
                </div>
            
            </div>}
            <>
        {index>5?<div style={{borderRadius:10,marginTop:20}}>
             <div className='glass'>
                <p className='leaderBoardText'>{index+1}</p>
                <div style={{width:'80%',display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
                <p className='modalHeaderleader' style={{color:getText(index),fontWeight:'bold'}}>{leaderBoard[index]['username']}</p>
                <p className='modalSubHeaderleader' style={{color:'white',fontWeight:'bold'}}>{leaderBoard[index]['score']}</p>
                </div>
            </div>
            </div>:<div style={{backgroundColor:'black',borderRadius:10,marginBottom:0,alignSelf:'flex-start',alignItems:'flex-start'}}>
             
            </div>}
        </>
        </>
        
    </div>
    </div>
  )
}


{/*
<div style={{display:'flex',flexDirection:'row',padding:10,justifyContent:'space-between',alignItems:'center',borderRadius:10,backgroundColor:getBorder(index),marginTop:5,marginBottom:5,borderColor:getBorder(index),borderWidth:1}}>
                <p className='leaderBoardText'>{index+1}</p>
                <div style={{width:'80%',display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
                <p className='modalHeaderleader'>{item.username}</p>
                <p className='modalSubHeaderleader'>{item.score}</p>
                </div>
            </div>
*/}