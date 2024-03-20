import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const RedirectRoute=()=>{
    //Handle Redirect
    //Decode URI and get the info in json
    const uri=JSON.parse(decodeURI(window.location.search)?.split('?')[1])
    const navigate=useNavigate();
    React.useEffect(()=>{
        const {kometAccount,bearerToken}=uri;
        //console.log(uri)
        //You will get three items, Komet Account, Google Account & Komet Bearer Token
        if(bearerToken){
            localStorage.setItem('auth',bearerToken)
            navigate('/bored-birdy')
            localStorage.setItem("username", kometAccount?.username);
            localStorage.setItem("userId", kometAccount?.userId);
            localStorage.setItem('address',kometAccount?.walletAddress)
        }
    },[uri,navigate])

  return (
    <div className='w-[100%] min-h-[740px] flex flex-col items-center pt-20'>
        <div className='loader'/>
    </div>
  )
}

export default RedirectRoute
