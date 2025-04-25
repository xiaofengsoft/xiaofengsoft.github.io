<template>
  <div class="article-card-wrapper">
    <Card ref="card" :bordered="false" hover-shadow @click="$router.push(path)"
      @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
      <template #header>
        <div class="card-header">
          <h4 class="card-title">{{ info.t }}</h4>
        </div>
      </template>

      <div class="card-content" ref="contentEl" v-html="info.e"></div>

      <template #actions>
        <div class="card-footer">
          <span class="read-more">阅读更多</span>
          <span class="arrow-icon">→</span>
        </div>
      </template>
    </Card>
  </div>
</template>
<script setup>
import { defineProps, onMounted, ref } from 'vue'
import { Card } from 'tdesign-vue-next'
import anime from 'animejs'
const card = ref(null)
const contentEl = ref(null)
const props = defineProps({
  info: {
    type: Object,
    required: true,
  },
  path: { type: String, required: true },
})

const handleMouseEnter = () => {
  // 卡片缩放动画
  anime({
    targets: card.value.$el,
    scale: 1.05,
    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)',
    duration: 500,
    easing: 'cubicBezier(0.25, 0.1, 0.25, 1)',
  })
  
  // 内容上移动画
  anime({
    targets: contentEl.value,
    translateY: -8,
    opacity: 1,
    duration: 400,
    easing: 'easeOutQuad',
  })
  
  // 底部按钮动画
  anime({
    targets: card.value.$el.querySelector('.arrow-icon'),
    translateX: 5,
    duration: 300,
    easing: 'easeOutQuad',
  })
}

const handleMouseLeave = () => {
  // 卡片恢复动画
  anime({
    targets: card.value.$el,
    scale: 1,
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
    duration: 500,
    easing: 'cubicBezier(0.25, 0.1, 0.25, 1)',
  })
  
  // 内容恢复动画
  anime({
    targets: contentEl.value,
    translateY: 0,
    opacity: 0.9,
    duration: 400,
    easing: 'easeOutQuad',
  })
  
  // 底部按钮恢复动画
  anime({
    targets: card.value.$el.querySelector('.arrow-icon'),
    translateX: 0,
    duration: 300,
    easing: 'easeOutQuad',
  })
}

onMounted(() => {
  // 初始化入场动画
  anime({
    targets: card.value.$el,
    translateY: [20, 0],
    opacity: [0, 1],
    duration: 800,
    easing: 'easeOutCubic',
  })
})
</script>
<style scoped>
.article-card-wrapper {
  margin: 30px 0;
  perspective: 1000px;
}

.t-card {
  margin: 0;
  cursor: pointer;
  background: linear-gradient(135deg, #4b6cb7 0%, #182848 100%);
  color: white;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transform-style: preserve-3d;
}

.card-header {
  padding: 5px 0;
  position: relative;
  overflow: hidden;
}

.card-header::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
}

.card-title {
  margin: 10px 20px;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: left;
}

.card-content {
  margin: 0;
  padding: 15px 25px;
  text-align: left;
  line-height: 1.6;
  opacity: 0.9;
  transform: translateY(0);
  transition: all 0.3s ease;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 20px 15px;
  font-size: 0.9rem;
  font-weight: 500;
}

.read-more {
  margin-right: 8px;
  opacity: 0.8;
}

.arrow-icon {
  display: inline-block;
  transition: transform 0.3s ease;
}

/* 卡片闪光效果 */
.t-card::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    to bottom right,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0)
  );
  transform: rotate(45deg);
  transition: all 1.5s ease;
  pointer-events: none;
  opacity: 0;
}

.t-card:hover::before {
  opacity: 1;
  transform: rotate(45deg) translate(0%, 0%);
}
</style>