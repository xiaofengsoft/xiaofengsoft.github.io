import { defineUserConfig } from "vuepress";
import { getDirname, path } from "vuepress/utils";
import { appendDatePlugin } from '@vuepress/plugin-append-date'
import { searchProPlugin } from "vuepress-plugin-search-pro";
import { gitPlugin } from '@vuepress/plugin-git'
const __dirname = getDirname(import.meta.url);
import theme from "./theme.js";
import { markdownMathPlugin } from '@vuepress/plugin-markdown-math'
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

  plugins: [
    appendDatePlugin(),
    searchProPlugin({
      indexContent: true,
      hotReload: true,
    }),
    markdownMathPlugin({
      // 选项
      type: "mathjax",
    }),
    gitPlugin({
      // 配置项
    }),
  ]

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});