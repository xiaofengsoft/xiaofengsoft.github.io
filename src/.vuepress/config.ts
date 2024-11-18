import { defineUserConfig } from "vuepress";
import { getDirname, path } from "vuepress/utils";

const __dirname = getDirname(import.meta.url);
import theme from "./theme.js";

export default defineUserConfig({
  alias: {
    "@theme-hope/modules/blog/components/BlogHero": path.resolve(
      __dirname,
      "./components/BlogHero.vue"
    ),
  },
  base: "/",

  lang: "zh-CN",
  title: "ZhangYifeng",
  description: "张一风的个人博客",
  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
