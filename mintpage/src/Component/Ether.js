import {ethers} from "ethers";
import abi from '../Contract/Abi/abi.json'
import { config } from "../config";
export let tempProvider,tempSigner,tempAddress,tempContract ;

export const getAddress = async() => {
  if(window.ethereum){
    return window.ethereum
    .request({ method: "eth_requestAccounts" })
    .then((res) => {
        tempAddress = res;
      return res;
    })
    .catch((err) => {
      return err;
    });
  } else {
    return {msg:"windows.ethereum is null"}
  }
 
};

export const getProvider = async()=>{
    tempProvider = new  ethers.providers.Web3Provider(window.ethereum,"any")
    return tempProvider
}

export const getSigner = async()=>{
    tempSigner = await tempProvider.getSigner()
    return tempSigner;
}

export const setContract = async(signer)=>{
    return new ethers.Contract(config.development.contractAddress,abi,signer)
}

export const getTotalSupply = async(contract)=>{

    return await contract.totalSupply().then(res=>{
        let hexToInt = parseInt(res.toHexString(),16)
        return hexToInt;
    }).catch(err=>{
        return err
    })
}

export const _Mint = async(contract,quantity)=>{
  let price = 0.002*quantity;
  let option = {
    value:ethers.utils.parseEther(price.toString())
  }
  return await contract.mint(quantity,option).then(res=>{
    console.log(res)
    return res
  })
}