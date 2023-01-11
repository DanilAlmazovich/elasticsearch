<template>
  <div>
    <v-header/>
    <main>
      <slot/>
    </main>
  </div>
</template>
<script>
import Header from '@/components/Header.vue'
export default {
  components: {
    'v-header': Header
  }
}
</script>