import React, { useState, useEffect } from "react";

export const useAudio = url => {
    const [audio,setAudio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(false);
  
    const toggle = (val) => setPlaying(val);
  
    useEffect(() => {
        playing ? audio.play() : audio.pause();
      },

      [playing]
    );
  
    useEffect(() => {
      audio.addEventListener('ended', () =>setAudio(new Audio(url)));
      return () => {
        audio.removeEventListener('ended', () =>setAudio(new Audio(url)));
      };
    }, []);
  
    return [playing, toggle];
  };