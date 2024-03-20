import { utils } from "ethers";
import { Buffer } from 'buffer';
import {ethers} from 'ethers'
import { getProvider } from "./provider";
import { TESTAPI } from "./Cred";
var bip39 = require("bip39"); // npm i -S bip39
var cryptojs = require("crypto-js");
var crypto = require("crypto-browserify");


export const decryptData = async (encrypted, key) => {
  //console.log('Key',key)
    var decrypted = await cryptojs.AES.decrypt(encrypted, key);
    var text = decrypted.toString(cryptojs.enc.Utf8);
    //console.log('decrypt',decrypted.toString(cryptojs.enc.Utf8))
    return text;
  };

export const encryptData = async (message, key) => {
    //console.log(message,key,'abc')
    var encrypted = await cryptojs.AES.encrypt(message, key);
    //console.log('Encryoted',encrypted.toString())
    return encrypted.toString();
  }; 
  


  export const getOneAccountDetails=(mnemonic)=>{
    const hdNode = utils.HDNode.fromMnemonic(mnemonic);
    const FirstAccount = hdNode.derivePath(`m/44'/60'/0'/0/0`);
    return FirstAccount;
}  

export const generatePhrase=()=>{
    var randomBytes = crypto.randomBytes(16);
    var mnemonic = bip39.entropyToMnemonic(randomBytes.toString("hex"));
    return mnemonic
}

export const createWallet=(phrase)=>{
    
    //console.log(mnemonic);
   var account=getOneAccountDetails(phrase);
   return account;

}




export const getBalance = async (addresses) => {
  var address=localStorage.getItem('address')
    const provider = getProvider();
    const balance = await provider.getBalance(address);
    const formetedBalance = Object.values(balance)[0];
    //console.log('balance', ethers.utils.formatEther(formetedBalance))
    return ethers.utils.formatEther(formetedBalance)
}