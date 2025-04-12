/// <reference types="vite/client" />
interface Window {
    ethereum?: {
      isMetaMask?: boolean
      request: (request: { method: string; params?: any[] }) => Promise<any>
    }
}

interface LocalReponse {
    code: number;
    message: string;
    data: Object
}