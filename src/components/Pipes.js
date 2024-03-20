import { GAME_HEIGHT, GROUND_HEIGHT, PIPE_GAP, PIPE_WIDTH } from "../constants"
import { memo } from "react"

const Pipes = ({ pipes }) => {

    return (
        <>
            {pipes.map((pipe, index) => (
                <div key={index}>
                    <div style={{
                        width: PIPE_WIDTH,
                        height: pipe.pipeHeight,
                        position: "absolute",
                        left: pipe.pipeLeft,
                        top: 0,
                        backgroundImage: "url('/images/pipe.png')",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        transform: "rotate(180deg)",
                        transition: 'left 300ms'
                    }}></div>
                    <div style={{
                        width: PIPE_WIDTH,
                        height: GAME_HEIGHT - pipe.pipeHeight - (PIPE_GAP || 0) - GROUND_HEIGHT,
                        position: "absolute",
                        left: pipe.pipeLeft,
                        bottom: GROUND_HEIGHT,
                        backgroundImage: "url('/images/pipe.png')",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        transition: 'left 300ms'
                    }}></div>
                </div>
            ))}
        </>
    )
}

export default memo(Pipes)