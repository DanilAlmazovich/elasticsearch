<template>
  <Layout>
    about
  </Layout>
</template>
<script>
export default {
  methods: {
    async getShow() {
      const res = await fetch(`${import.meta.env.VITE_CONTENT_URL}/shows/19`)
      const data = await res.json()
    }
  },
  mounted() {
    this.getShow()
  }
}
</script>