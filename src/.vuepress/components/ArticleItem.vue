<template>
  <v-card class="item-wrapper" elevation="16" :color="'indigo'"
    :subtitle="`写作时间-${info.l} 字数-${info.r.words} 预估时长-${info.r.minutes}`">
    <template #title>
      {{ info.t }}
    </template>
    <div style="margin: 30px;" v-html="info.e">
    </div>
    <v-card-actions>
      <v-btn @click="$router.push(path)" variant="text">点击阅读</v-btn>
    </v-card-actions>

  </v-card>
</template>
<script setup>
import { VCard, VBtn, VCardActions } from 'vuetify/components';
const props = defineProps({
  info: {
    type: Object,
    required: true,
  },
  path: { type: String, required: true },
})
console.log(props.info)
</script>
<style>
.item-wrapper {
  margin: 10px;
}

.v-card-title {
  text-align: left;
}

.v-card-subtitle {
  text-align: left;
}

.v-card-actions>button {
  margin-left: auto;
}
</style>