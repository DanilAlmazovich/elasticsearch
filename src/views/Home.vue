<template>
  <Layout>
    <flickity ref="flickity">
      <div class="carousel-cell">1</div>
      <div class="carousel-cell">2</div>
      <div class="carousel-cell">3</div>
      <div class="carousel-cell">4</div>
      <div class="carousel-cell">5</div>
    </flickity>
  </Layout>
</template>
<script>
// import Flickity from 'vue-flickity';
export default {
  // components: {
  //   Flickity
  // },
  data: () => ({
    thriller: [],
    horror: [],
    crime: [],
    flickityOptions: {
      initialIndex: 3,
      prevNextButtons: false,
      pageDots: false,
      wrapAround: true
    }
  }),
  methods: {
    async getAllShows() {
      const URL = 'https://api.tvmaze.com/shows'
      const response = await fetch(URL)
      const data = await response.json()
      console.log(data)
      this.thriller = await data.filter(item => item.genres[2] === 'Thriller')
      this.horror = await data.filter(item => item.genres[1] === 'Horror')
      this.crime = await data.filter(item => item.genres[1] === 'Crime')
    }
  },
  mounted() {
    this.getAllShows()
  }
}
</script>