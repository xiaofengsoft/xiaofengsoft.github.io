<template>
  <v-app-bar class="navbar" :elevation="2" style="height: 70px;" color="indigo">
    <template v-slot:prepend>
      <v-avatar size="x-large" class="brand-img"><navbar-brand /></v-avatar>
    </template>
    <v-app-bar-title>{{ siteTitle }}</v-app-bar-title>
    <NavbarLinks />
    <NavScreen />
    <div id="navbar-end" ref="navbarEnd"></div>
  </v-app-bar>
</template>

<script setup>
import { render, ref } from "vue";
import NavScreen from "@theme-hope/modules/navbar/components/NavScreen";
import noopComponent from "@vuepress/helper/noopComponent";
import { resolveComponent, h, onMounted } from "vue";
import RepoLink from "@theme-hope/modules/navbar/components/RepoLink";
import LanguageDropdown from "@theme-hope/modules/navbar/components/LanguageDropdown";
import OutlookButton from "@theme-hope/modules/outlook/components/OutlookButton";
import { hasGlobalComponent } from "@vuepress/helper/client";
import { computed } from "vue";
import { useThemeLocaleData } from "@theme-hope/composables/index";
import NavbarLinks from "@theme-hope/modules/navbar/components/NavbarLinks";
import { useSiteLocaleData, withBase, } from "vuepress/client";
import { VAppBar, VAppBarTitle, VAvatar, VBtn } from "vuetify/components";
import NavbarBrand from "@theme-hope/modules/navbar/components/NavbarBrand";
const siteLocale = useSiteLocaleData();
const themeLocale = useThemeLocaleData();
const siteTitle = computed(() => siteLocale.value.title);
const navbarLayout = computed(() => themeLocale.value.navbarLayout ??
{
  start: ["Brand"],
  center: ["Links"],
  end: ["Language", "Repo", "Outlook", "Search"],
});
const navbarComponentMap = {
  Brand: NavbarBrand,
  Language: __VP_MULTI_LANGUAGES__ ? LanguageDropdown : noopComponent,
  Links: NavbarLinks,
  Repo: RepoLink,
  Outlook: OutlookButton,
  Search: hasGlobalComponent("SearchBox")
    ? resolveComponent("SearchBox")
    : noopComponent,
};
const navbarEnd = ref(null);
const getNavbarComponent = (component) => navbarComponentMap[component]
onMounted(() => {
  try {
    const content = h("div", {}, [
      navbarLayout.value.center?.map((item) => h(getNavbarComponent(item)))
    ]);
    render(content, navbarEnd.value);
  } catch (e) {
    console.error(e);
  }

})
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: center;
  position: sticky;
  top: 0;
  z-index: 175;
  box-sizing: border-box;
}

.brand-img {
  background-clip: border-box;
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
}
</style>