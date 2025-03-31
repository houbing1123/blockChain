import { useFetch } from "../hooks/useFetch";

export const createWallet = async (password: string):Promise<WalletResponse> => {
    return await useFetch('/api/wallet/create', {
        method: 'POST',
        body: JSON.stringify({
            password
        })
    });
}