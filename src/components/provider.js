import { ethers } from "ethers"
const rpcUrl="https://polygon-mainnet.g.alchemy.com/v2/XeQqz2MyT7LbBTuWjVXxdiN05TCqQKuH";
//'https://polygon-rpc.com'
export const getProvider = () => {
    return new ethers.providers.JsonRpcProvider(rpcUrl);
}