<template>
  <v-card class="item-wrapper" elevation="16" @click="$router.push(path)" :color="'indigo'"
    :subtitle="`写作时间-${info.l} 字数-${info.r.words} 预估时长-${info.r.minutes}`">
    <template #title>
      {{ info.t }}
    </template>
    <div style="margin: 30px;" v-html="info.e">
    </div>

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
</script>
<style>
.item-wrapper {
  margin: 10px;
  cursor: pointer;
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