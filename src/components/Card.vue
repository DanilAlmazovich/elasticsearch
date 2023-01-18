<template>
  <router-link v-if="type.length" :to="`/${type}/${item.id}`" class="flex mb-5 items-center justify-between">
    <div class="flex items-center">
      <div class="w-20 h-20 mr-4">
        <img class="w-full h-full object-contain"
             :src="item?.image?.medium || 'https://upload.wikimedia.org/wikipedia/ru/thumb/a/ac/No_image_available.svg/1200px-No_image_available.svg.png'"
             :alt="item.name">
      </div>
      <p class="first-letter:text-blue-500 first-letter:font-semibold">{{ item.name }}</p>
    </div>
    <button :class="{'bg-red-500': status}"
            class="border border-solid border-gray-400 px-2 py-1"
            @click.prevent="favorite">
      <span v-if="!status">Favorite</span>
      <span v-else>Delete</span>
      </button>
  </router-link>
</template>
<script>
import { mapStores } from "pinia";
import { useHeaderStore } from "@/stores/header";

export default {
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    },
    type: {
      type: String,
      default: ''
    },
  },
  computed: {
    ...mapStores(useHeaderStore),
    status() {
      if(this.headerStore.favourite) {
        return this.headerStore.favourite.
        find(item => item.id === this.item.id) || null
      }
    }
  },
  methods: {
    favorite() {
      if(this.status) {
        this.$emit('deleteFavorite', this.item)
      }else {
        this.$emit('addFavorite', this.item)
      }
    }
  },
}
</script>