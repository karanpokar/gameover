import axios from "axios";
import { ethers, Wallet } from "ethers";
import { PARTNER_ID,PARTNER_KEY } from "../constants";
import { getProvider } from "./provider";



const SignTransaction = async (message) => {
        await axios.post(`https://sdk.komet.me/transaction/sign-message`,{
            "partnerId":PARTNER_ID,
            "partnerKey":PARTNER_KEY,
            "chainId":137,
            "message":message
        },{
            headers:{
                'Authorization':`Bearer ${localStorage.getItem('auth')}`
            }
        }).then((res)=>{
            console.log('Signature',res.data.signature);
            alert(res.data.signature);
        })
}
const TransferAmount=()=>{

}

export {SignTransaction,TransferAmount}