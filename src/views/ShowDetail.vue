<template>
  <Layout>
    <div v-if="show" class="mb-8">
      <div class="w-1/2 md:w-full h-auto mx-auto">
        <img class="w-full h-auto" :src="show?.image?.original || 'https://upload.wikimedia.org/wikipedia/ru/thumb/a/ac/No_image_available.svg/1200px-No_image_available.svg.png'" alt="">
      </div>
      <div class="flex items-center py-8 px-4" v-if="rating">
        <star-rating class="w-auto m-0 p-0" :numberOfStars="10" :showControl="false" :disableClick="true" :step=".2" v-model="rating"></star-rating>
        <span class="ml-2 text-lg">{{ show.rating.average }}</span>
      </div>
      <div class="px-4 py-4" v-html="show.summary"/>
    </div>
    <h4 class="text-6xl py-6 px-4">Seasons</h4>
    <div v-if="seasons" class="flex flex-wrap">
      <div v-for="season in seasons" class="relative w-1/3 ">
        <img v-if="season.image"
             class="w-full"
             :src="season?.image?.original || 'https://upload.wikimedia.org/wikipedia/ru/thumb/a/ac/No_image_available.svg/1200px-No_image_available.svg.png'" alt="">
        <div v-if="season.image"
             class="absolute w-full h-full left-0 top-0 bg-gray-900/50 flex items-center justify-center">
          <p class="text-8xl text-white font-bold">{{ season.number }}</p>
        </div>
      </div>
    </div>
    <h4 class="text-6xl py-6 px-4">Cast</h4>
    <div v-for="cast in casts">
      <cast-show :cast="cast"/>
    </div>
  </Layout>
</template>
<script>
import CastShow from '@/components/CastShow.vue'
import vue3StarRatings from "vue3-star-ratings";
export default {
  data: () => ({
    show: null,
    seasons: null,
    casts: null,
    rating: 0
  }),
  components: {
    CastShow,
    'star-rating': vue3StarRatings
  },
  methods: {
    async getShow() {
      const URL = `${import.meta.env.VITE_CONTENT_URL}/shows/`
      const response = await fetch(`${URL}${this.$route.params.id}`)
      const data = await response.json()
      this.show = await data
    },
    async getSeason() {
      const URL = `${import.meta.env.VITE_CONTENT_URL}/shows/${this.$route.params.id}/seasons`
      const response = await fetch(`${URL}`)
      const data = await response.json()
      this.seasons = await data
    },
    async getCasts() {
      const URL = `${import.meta.env.VITE_CONTENT_URL}/shows/${this.$route.params.id}/cast`
      const response = await fetch(`${URL}`)
      const data = await response.json()
      this.casts = await data
    }
  },
  async mounted() {
    await this.getShow()
    await this.getSeason()
    await this.getCasts()
    this.rating = +this.show.rating.average
  }
}

</script>
