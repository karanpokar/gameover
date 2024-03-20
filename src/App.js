import Game from "./components/Game"
import Logo from '../src/images/gameover.gif'

import React from "react";
import { SignTransaction } from "./components/transfer";

const App = () => {



  return (
    <div style={{
      width: '100vw',
      overflow:'auto',
      backgroundColor: "black",
      display: "flex",
      justifyContent: "center",
      flexDirection:"column",
      alignItems: "center",
      flex:1
    }}>
      <Game/>
     
          </div>   
     

  )
}

export default App