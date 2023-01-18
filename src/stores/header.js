import { defineStore } from 'pinia'

export const useHeaderStore = defineStore('header', {
    state: () => ({
        headerHeight: 0,
        headerContent: null,
        favourite: null
    }),
    actions: {
        async getHeader() {
            const URL = `${import.meta.env.VITE_SERVER_URL}/header.json`
            const response = await fetch(URL)
            this.headerContent = await response.json()
        },
        async getFavourite() {
            const URL = `${import.meta.env.VITE_SERVER_URL}/favourite.json`
            const response = await fetch(URL)
            const data = await response.json() || null
            const arr = []
            for (let key in data) {
                if(data[key]) {
                    arr.push(data[key])
                }
            }
            this.favourite = arr
        }
    },
    getters: {
        favouriteLength: (state) => {
            if(state.favourite) {
                return state.favourite.length
            }
        }
    }
})