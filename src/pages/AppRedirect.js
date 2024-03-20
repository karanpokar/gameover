import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function AppRedirect() {
    const redirect=window.location.href;
    const navigate=useNavigate();
    console.log(redirect.split('?')[1]);
  return (
    <div className='w-[100%] min-h-[1080px] flex flex-col items-center pt-20'>
        <div className='loader'/>
    </div>
  )
}
