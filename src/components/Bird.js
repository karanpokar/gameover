import { BIRD_WIDTH, BIRD_HEIGHT, BIRD_LEFT } from "../constants"
import { memo } from "react"

const Bird = ({ birdY, angle }) => {

    return (
        <div style={{
            width: BIRD_WIDTH,
            height: BIRD_HEIGHT,
            position: "absolute",
            top: birdY,
            left: BIRD_LEFT,
            backgroundImage: "url('/images/bird.png')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            transform: `rotate(${angle}deg)`,
            transition: 'transform 300ms, top 300ms'
        }}></div>
    )

}

export default memo(Bird)