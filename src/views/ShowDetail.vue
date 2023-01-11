<template>
  <Layout>
    <div v-if="show" class="mb-8">
      <div class="w-full h-auto">
        <img class="w-full h-auto" :src="show?.image?.original || 'https://upload.wikimedia.org/wikipedia/ru/thumb/a/ac/No_image_available.svg/1200px-No_image_available.svg.png'" alt="">
      </div>
      <div class="px-4 py-4" v-html="show.summary"/>
    </div>
    <h4 class="text-6xl py-6 px-4">Seasons</h4>
    <div v-if="seasons">
      <div v-for="season in seasons" class="relative">
        <img v-if="season.image"
             :src="season?.image?.original || 'https://upload.wikimedia.org/wikipedia/ru/thumb/a/ac/No_image_available.svg/1200px-No_image_available.svg.png'" alt="">
        <div v-if="season.image"
             class="absolute w-full h-full left-0 top-0 bg-gray-900/50 flex items-center justify-center">
          <p class="text-8xl text-white font-bold">{{ season.number }}</p>
        </div>
      </div>
    </div>
  </Layout>
</template>
<script>
export default {
  data: () => ({
    show: null,
    seasons: null
  }),
  methods: {
    async getShow() {
      const URL = 'https://api.tvmaze.com/shows/'
      const response = await fetch(`${URL}${this.$route.params.id}`)
      const data = await response.json()
      this.show = await data
    },
    async getSeason() {
      const URL = `https://api.tvmaze.com/shows/${this.$route.params.id}/seasons`
      const response = await fetch(`${URL}`)
      const data = await response.json()
      this.seasons = await data
    }
  },
  mounted() {
    this.getShow()
    this.getSeason()
  }
}

</script>
