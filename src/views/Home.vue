<template>
  <Layout>
    <promo :images="promoImages" :random="random"></promo>
    <div>
      <shows-slider
          :shows="thriller"
          title="Thriller"/>
    </div>
    <div>
      <shows-slider
          :shows="horror"
          title="Horror"/>
    </div>
    <div>
      <shows-slider
          :shows="crime"
          title="Crime"/>
    </div>
  </Layout>
</template>
<script>
import ShowsSlider from "@/components/ShowsSlider.vue"
import Promo from '@/components/Promo.vue'

export default {
  data: () => ({
    thriller: [],
    horror: [],
    crime: [],
    promoImages: [],
    random: []
  }),
  components: {
    ShowsSlider,
    Promo
  },
  methods: {
    async getAllShows() {
      const URL = `${import.meta.env.VITE_CONTENT_URL}/shows`
      const response = await fetch(URL)
      const data = await response.json()
      this.thriller = await data
          .filter(item => item.genres[2] === 'Thriller')
      this.horror = await data
          .filter(item => item.genres[1] === 'Horror')
      this.crime = await data
          .filter(item => item.genres[1] === 'Crime')
    },
    async getPromoImage(id) {
      const response = await fetch(`${import.meta.env.VITE_CONTENT_URL}/shows/${id}/images`)
      if(response.ok) {
        this.random.push(id)
        const data = await response.json()
        this.promoImages.push({first: data[0], second: data[1]})
      }
    }
  },
  mounted() {
    for(let i = 0; i < 4; i++) {
      this.getPromoImage(Math.floor(Math.random() * 240))
    }
    this.getAllShows()

  }
}
</script>