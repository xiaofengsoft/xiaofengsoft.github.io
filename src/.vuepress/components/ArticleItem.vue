<template>
  <Card ref="card" :bordered="false" headerBordered hover-shadow @click="$router.push(path)"
    @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <template #header style="padding: 0 auto;">
      <h4 style="margin: 0 auto;text-align: left;">{{ info.t }}</h4>
    </template>

    <template #actions>
    </template>
    <div style=" margin: 30px;text-align: left;" v-html="info.e">
    </div>
  </Card>
</template>
<script setup>
import { defineProps, onMounted, ref } from 'vue'
import { Card } from 'tdesign-vue-next'
import anime from 'animejs'
const card = ref(null)
const props = defineProps({
  info: {
    type: Object,
    required: true,
  },
  path: { type: String, required: true },
})
const handleMouseEnter = () => {
  anime({
    targets: card.value.$el,
    scale: 1.03,
    duration: 300,
    easing: 'easeOutQuad',
  })
}

const handleMouseLeave = () => {
  anime({
    targets: card.value.$el,
    scale: 1,
    duration: 300,
    easing: 'easeOutQuad',
  })
}

onMounted(() => {

})
</script>
<style scope>
.t-card {
  margin: 20px 0;
  cursor: pointer;
  background-color: var(--td-brand-color-6);
  color: white;
}
</style>