import { create } from 'zustand'

type loginStore = {
    loginStatus:boolean
}
const useLoginStore = create<loginStore>((set) => ({
    loginStatus: false,
    updateAuth: (newStatus:boolean) => set({ loginStatus: newStatus }),
}))

export {
    type loginStore,
    useLoginStore
}
