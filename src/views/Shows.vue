<template>
  <Layout>
    <div>
      <div class="flex justify-center py-8">
        <input class="w-1/3 md:w-2/3 sm:w-full sm:mx-6 border border-solid border-gray-600 py-2 px-4"
               placeholder="search..."
               v-model="searchValue"
               @input="searchInput"
               type="text">
      </div>
      <div class="px-6" v-if="result.length">
        <p class="text-sm font-medium text-gray-400 mb-10" v-if="searchValue.length">Результат запроса по
          <span class="text-blue-600">{{ searchValue }}</span>
        </p>
        <div v-for="item in result" :key="item">
          <card @deleteFavorite="deleteFavorite"
                @addFavorite="addFavorite"
                :item="item"
                type="shows"/>
        </div>
      </div>
      <div class="px-6" v-else>
        <p>Данных нет</p>
      </div>
    </div>
  </Layout>
</template>
<script>
import { mapStores } from "pinia";
import { useHeaderStore } from "@/stores/header";
import Card from '@/components/Card.vue'
export default {
  components: {
    Card
  },
  computed: {
    ...mapStores(useHeaderStore)
  },
  data: () => ({
    searchValue: '',
    controller: new AbortController(),
    result: []
  }),
  methods: {
    async deleteFavorite(show) {
      console.log('delete', show)
      const options = {
        method: 'DELETE',
      }
      const URL = `${import.meta.env.VITE_SERVER_URL}/favourite/${show.id}.json`
      const response = await fetch(URL, options)
      if(response.ok) {
        this.headerStore.getFavourite()
      }
      const data = response.json()
    },
    async addFavorite(show) {
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(show)
      }
      const URL = `${import.meta.env.VITE_SERVER_URL}/favourite/${show.id}.json`
      const response = await fetch(URL, options)
      if(response.ok) {
        this.headerStore.getFavourite()
      }
      const data = response.json()
    },
    searchInput() {
        this.controller.abort()
        this.controller = new AbortController()
        this.search()
    },
    async search() {
      if(this.searchValue.length) {
        const URL = `${import.meta.env.VITE_CONTENT_URL}/search/shows?q=`
        const response = await fetch(`${URL}${this.searchValue}`, {
          method: 'GET',
          signal: this.controller.signal
        })
        const data = await response.json()
        this.result = await data.map(item => ({
          ...item.show
        }))
      }
    },
    async getAllShows() {
      const URL = `${import.meta.env.VITE_CONTENT_URL}/shows`
      const response = await fetch(URL)
      const data = await response.json()
      this.result = await data.filter(item => item.id < 50)
    }
  },
  mounted() {
    this.getAllShows()
  },
  watch: {
    searchValue() {
      if(!this.searchValue.length) {
        this.getAllShows()
      }
    }
  }
}
</script>