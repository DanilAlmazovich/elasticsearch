import { defineStore } from 'pinia'

export const useHeaderStore = defineStore('header', {
    state: () => ({
        headerHeight: 0,
        headerContent: null,
    }),
    actions: {
        async getHeader() {
            const URL = 'http://localhost:3000/header'
            const response = await fetch(URL)
            this.headerContent = await response.json()
        }
    }
})