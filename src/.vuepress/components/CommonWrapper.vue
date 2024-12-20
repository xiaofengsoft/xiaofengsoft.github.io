<template>
  <v-app class="theme-container" :class="containerClasses" @touchstart="onTouchStart" @touchend="onTouchEnd">
    <!-- Navbar -->
    <NavBar />

    <!-- Sidebar mask -->
    <v-overlay v-if="isMobileSidebarOpen" class="vp-sidebar-mask" @click="toggleMobileSidebar(false)" />

    <!-- Toggle sidebar button -->
    <v-btn v-if="!isMobile" icon class="toggle-sidebar-wrapper" @click="toggleDesktopSidebar">
      <v-icon>{{ isDesktopSidebarCollapsed ? 'mdi-menu' : 'mdi-menu-open' }}</v-icon>
    </v-btn>

    <!-- Sidebar -->
    <v-navigation-drawer v-if="enableSidebar" app :model-value="isMobileSidebarOpen"
      @update:model-value="toggleMobileSidebar">
      <slot name="sidebarTop" />
      <slot name="sidebar" />
      <slot name="sidebarBottom" />
    </v-navigation-drawer>

    <!-- Main content -->
    <div class="main-content">
      <slot />
    </div>

    <!-- Footer -->
    <PageFooter />
  </v-app>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useEventListener } from '@vueuse/core';
import PageFooter from '@theme-hope/components/PageFooter';
import { usePageFrontmatter, useRouter } from 'vuepress/client';
import { useThemeData, useThemeLocaleData, useWindowSize } from '@theme-hope/composables/index';
import { useSidebarItems } from '@theme-hope/modules/sidebar/composables/index';
import { VAppBar, VBtn, VIcon, VNavigationDrawer, VOverlay, VApp } from 'vuetify/components';
import NavBar from './NavBar.vue';

const router = useRouter();
const { isMobile, isPC } = useWindowSize();
const frontmatter = usePageFrontmatter();
const themeData = useThemeData();
const themeLocale = useThemeLocaleData();
const sidebarItems = useSidebarItems();

const isPure = ref(false); // Placeholder for actual logic
const isMobileSidebarOpen = ref(false);
const isDesktopSidebarCollapsed = ref(false);
const touchStart = { x: 0, y: 0 };

const enableNavbar = computed(() => {
  if (frontmatter.value.navbar === false || themeLocale.value.navbar === false) {
    return false;
  }
  return Boolean(themeLocale.value.logo || themeLocale.value.repo || themeLocale.value.navbar);
});

const enableSidebar = computed(() => {
  if (frontmatter.value.sidebar === false || sidebarItems.value.length === 0 || frontmatter.value.home) {
    return false;
  }
  return true;
});

const containerClasses = computed(() => {
  return [
    'theme-container',
    {
      'hide-navbar': false,
      'no-navbar': !enableNavbar.value,
      'sidebar-collapsed': isDesktopSidebarCollapsed.value,
      'sidebar-open': isMobileSidebarOpen.value,
      'no-sidebar': !enableSidebar.value,
    },
    frontmatter.value.containerClass || '',
  ];
});

function toggleMobileSidebar(state = !isMobileSidebarOpen.value) {
  isMobileSidebarOpen.value = state;
}

function toggleDesktopSidebar() {
  isDesktopSidebarCollapsed.value = !isDesktopSidebarCollapsed.value;
}

function onTouchStart(e) {
  touchStart.x = e.changedTouches[0].clientX;
  touchStart.y = e.changedTouches[0].clientY;
}

function onTouchEnd(e) {
  const dx = e.changedTouches[0].clientX - touchStart.x;
  const dy = e.changedTouches[0].clientY - touchStart.y;

  if (Math.abs(dx) > Math.abs(dy) * 1.5 && Math.abs(dx) > 40) {
    if (dx > 0 && touchStart.x <= 80) {
      toggleMobileSidebar(true);
    } else {
      toggleMobileSidebar(false);
    }
  }
}

useEventListener('scroll', () => {
  // Scroll handling logic here
});

watch(isMobile, (value) => {
  if (!value) toggleMobileSidebar(false);
});
</script>
