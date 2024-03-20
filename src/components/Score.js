import { memo,useEffect, useState } from "react"
import { API_URL } from "./Cred"

const Score = ({ scores,gameStatus,played }) => {
    //const arrScore = score.toString().split('')
    const [score,setScore]=useState(scores)
    const [lastScore,setLastScore]=useState(0)
    const [time,setTime]=useState(0)
    const [timeinSec,setTimeinSec]=useState(0)
    useEffect(()=>{
        setScore(score+100)
    },[scores])

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
    

    const updateScore=(score,time)=>{
        fetch(`${API_URL}/game/updateScore`, {
                method: 'POST',
                body: JSON.stringify({
                    userId:parseInt(localStorage.getItem('userId')),
                  score:score,
                  time:time,
              }),
                headers: {
                  'Content-type': 'application/json; charset=UTF-8',
                  'Authorization':`Bearer ${localStorage.getItem('auth')}`
                }
              })
                .then(function async(response) {
                  //console.log(response)

                  //return response
                }).catch((error)=>{
                  console.log('Error Update',error)
                })
    }

    //console.log('Score',score)
    useEffect(() => {
        let interval;
        let interval2;
        if(gameStatus=='playing'){
            interval = setInterval(() => {
                setScore(score=>score+1)
        }, 25) // in milliseconds
        interval2=setInterval(()=>{
            setTime(time=>time+1)
        },1000)
        }
        if(gameStatus!='playing'){
            setLastScore(score)
            setTimeinSec(time)
            
            if(played){
                updateScore(score,time);
                //console.log('Game Over')
            }
            setScore(0)
            setTime(0)
        }
        return () => {
            if (interval) clearInterval(interval)
            if(interval2) clearInterval(interval2)
        }
      }, [gameStatus,scores])
    return (

        <div style={{
            position: "absolute",
            height: 36,
            width: '100%',
            top: 30,
            zIndex:1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding:5,
            gap: 5
        }}>
        
            {score===0?
            <p className="scorecard">{lastScore}</p>
            :<p className="scorecard">{score}</p>
}
{time!==0?
            <p className="scorecard">{fancyTimeFormat(time)}</p>
            :<p className="scorecard">{fancyTimeFormat(timeinSec)}</p>
}
    

</div>
    )
}

export default memo(Score)

{/*
score?.toString()?.split('').map((item, index) => (
                <div key={`score${index}`} style={{
                    width: 24,
                    height: 36,
                    backgroundImage: `url('/images/${item}.png')`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                }}></div>
            ))}

*/}