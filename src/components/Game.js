import React, { useState, useEffect } from 'react'
import { GAME_HEIGHT, GAME_WIDTH, BIRD_WIDTH, BIRD_HEIGHT, BIRD_JUMP, GRAVITY, PIPE_WIDTH, BIRD_LEFT, PIPE_GAP, GROUND_HEIGHT } from "../constants"
import Bird from './Bird'
import Pipes from './Pipes'
import Ground from './Ground'
import Score from './Score'
import Logo from '../images/game-logo.svg'
import Leaderboard from './Leaderboard'
import ScoreCardModal from './ScoreCardModal'
import { getBalance } from './cryptoFunctions'
import { eventTrack } from './eventTrack'
import { useAudio } from './useAudio'

const Game = () => {
    const [gameStatus, setGameStatus] = useState('no-playing')
    const [birdY, setBirdY] = useState(GAME_HEIGHT / 2 - BIRD_WIDTH / 2)
    const [angle, setAngle] = useState(0)
    const [balance,setBalance]=useState(0)
    const [time, setTime] = useState(0)

    //const [playing, toggle] = useAudio('https://www.mboxdrive.com/best-time-112194.mp3');

    const [pipes, setPipes] = useState([
        {
            pipeHeight: Math.floor(Math.random() * (GAME_HEIGHT / 2 - 2 * BIRD_HEIGHT + 1) + 2 * BIRD_HEIGHT),
            pipeLeft: GAME_WIDTH
        },
        {
            pipeHeight: Math.floor(Math.random() * (GAME_HEIGHT / 2 - 2 * BIRD_HEIGHT + 1) + 2 * BIRD_HEIGHT),
            pipeLeft: GAME_WIDTH + 200
        },
    ])
    const [score, setScore] = useState(0)
    const [played, setPlayed] = useState(false)
    const [gameScore,setGameScore]=useState(0)

    const handleOnClick = () => {
        if (gameStatus === 'no-playing' && !played) {
            setGameStatus('playing')
            //toggle(true)
            setPlayed(true)
            eventTrack('GAME_STARTED',localStorage.getItem('userId'),'SUCCESS')
        }
        if (gameStatus === 'playing') {
            // fly
            setBirdY(birdY => birdY - BIRD_JUMP)
            setAngle(-20)
            setTime(0)
        }
    }

    useEffect(() => {
        let timer
        if (gameStatus === 'playing') {
            timer = setTimeout(() => {
                //bird drop
                setBirdY(birdY => birdY + GRAVITY + (50 * time * time) / 2000000)
                setAngle(20)
                setTime(time => time + 100)
                //pipes move
                setPipes(pipes => pipes.map((item) => {
                    return {
                        ...item,
                        pipeLeft: item.pipeLeft - 15
                    }
                }))
                //pipes generate
                if (pipes[score].pipeLeft + PIPE_WIDTH <= BIRD_LEFT) {
                    const newPipes = [...pipes]
                    newPipes.push(
                        {
                            pipeHeight: Math.floor(Math.random() * (GAME_HEIGHT / 2 - 2 * BIRD_HEIGHT + 1) + 2 * BIRD_HEIGHT),
                            pipeLeft: GAME_WIDTH + 200
                        }
                    )
                    setPipes(newPipes)
                    setScore(score => score + 1)
                    setGameScore(gameScore=>gameScore+100)
                }
            }, 100)
        }
        return () => {
            if (timer) clearTimeout(timer)
        }
    })

   


    useEffect(() => {
        let timer
        if (gameStatus === 'playing') {
            timer = setTimeout(() => {
                if (pipes[score].pipeLeft <= BIRD_LEFT + BIRD_WIDTH && pipes[score].pipeLeft + PIPE_WIDTH >= BIRD_LEFT) {
                    if (birdY <= pipes[score].pipeHeight || birdY >= pipes[score].pipeHeight + PIPE_GAP) {
                        setGameStatus('no-playing')
                        eventTrack('GAME_OVER',localStorage.getItem('userId'),"")
                        //toggle(false)
                    }
                }
                if (birdY >= GAME_HEIGHT - GROUND_HEIGHT - BIRD_HEIGHT) {
                    setGameStatus('no-playing')
                    eventTrack('GAME_OVER',localStorage.getItem('userId'),"")
                    //toggle(false)
                }
            }, 10)
        }
        return () => {
            if (timer) clearTimeout(timer)
        }
    })

    const newGame = (type) => {
        setBirdY(GAME_HEIGHT / 2 - BIRD_WIDTH / 2)
        setAngle(0)
        setTime(0)
        setPipes([
            {
                pipeHeight: Math.floor(Math.random() * (GAME_HEIGHT / 2 - 2 * BIRD_HEIGHT + 1) + 2 * BIRD_HEIGHT),
                pipeLeft: GAME_WIDTH
            },
            {
                pipeHeight: Math.floor(Math.random() * (GAME_HEIGHT / 2 - 2 * BIRD_HEIGHT + 1) + 2 * BIRD_HEIGHT),
                pipeLeft: GAME_WIDTH + 200
            },
        ])
        setScore(0)
        setGameScore(0)
        eventTrack('NEW_GAME',localStorage.getItem('userId'),type)
        //eventTrack('CHAIN_WITHDRAW','FAILURE',tx.hash)
        setPlayed(false)
    }

    return (
        <div style={{flex:1,display:'flex',flexDirection:'column',width:'100%',minHeight:'100vh',alignItems:'center',overflowY: 'auto',backgroundColor:'black',paddingBottom:100}}>
        
        <ScoreCardModal gameStatus={gameStatus} played={played}/>
    
         <div style={{ alignSelf: "center", alignItems: 'center', justfyContent: 'center', flexDirection: 'row',display:'flex' }}>
              {/* <img height={100} width={90} style={{borderRadius:10,marginLeft:10}} src='https://i.gifer.com/yy3.gif'/> */}
              <img style={{borderRadius:10,width:320,height:100,objectFit:'contain'}}  src={Logo} />
            </div>
        <div style={{
            borderRadius: '20px',
            position: "relative",
            width: GAME_WIDTH,
            height: GAME_HEIGHT,
            backgroundImage: "url('/images/bg.png')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            overflow: "hidden"
        }} onClick={handleOnClick}>
            {gameStatus === 'no-playing' && played && <button style={{
                position: 'absolute',
                width: 155,
                height: 44,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                border: 'none',
                cursor: 'pointer',
               zIndex:10,
                backgroundImage: "url('/images/gameover.png')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                
            }} onClick={()=>newGame('RESET')}></button>}
            {gameStatus === 'no-playing' && !played && <button style={{
                position: 'absolute',
                width: 155,
                height: 44,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                border: 'none',
                cursor: 'pointer',
zIndex:10,
                backgroundImage: "url('/images/GetReady.png')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                
            }} onClick={()=>newGame('NEW_GAME')}></button>}
            <Score scores={gameScore} gameStatus={gameStatus} played={played} />
            <Bird birdY={birdY} angle={angle}  />
            <Pipes pipes={pipes} />
            <Ground />
        </div>
        <div className='h-[100px]'></div>
        {/* <Leaderboard gameStatus={gameStatus} played={played}/> */}
        </div>
    )
}

export default Game