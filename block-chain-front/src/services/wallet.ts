import { useFetch } from "../hooks/useFetch";
import { getToken } from "../utils";

export const createWallet = async (password: string):Promise<WalletResponse> => {
    return await useFetch('/api/wallet/create', {
        method: 'POST',
        body: JSON.stringify({
            password
        })
    });
}

export const getWalletLocal = async (address: string):Promise<WalletBalanceResponse> => {
    return await useFetch('/api/wallet/getBalance', {
        method: 'POST',
        body: JSON.stringify({
            address,
        }),
        headers: {
            authorization: `Bearer ${getToken()}`, // 实际项目中这里应该是获取token的方式
        }
    });
}