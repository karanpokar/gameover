import { GAME_WIDTH, GROUND_HEIGHT } from "../constants"
import { memo } from "react";

const Ground = () => {
    return (
        <div style={{
            width: GAME_WIDTH,
            height: GROUND_HEIGHT,
            backgroundColor: "brown",
            position: "absolute",
            bottom: 0,
            backgroundImage: "url('/images/ground.png')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
        }}></div>
    )
}

export default memo(Ground)