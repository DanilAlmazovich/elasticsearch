<template>
  <div class="flex mb-10 items-center">
    <div class="w-20 h-20 mr-4">
      <img class="w-full h-full object-contain"
           :src="item?.image?.medium || 'https://upload.wikimedia.org/wikipedia/ru/thumb/a/ac/No_image_available.svg/1200px-No_image_available.svg.png'"
           :alt="item.name">
    </div>
    <p class="first-letter:text-blue-500 first-letter:font-semibold">{{ item.name }}</p>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>