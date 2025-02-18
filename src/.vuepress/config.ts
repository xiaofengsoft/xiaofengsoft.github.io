import { defineUserConfig } from "vuepress";
import { getDirname, path } from "vuepress/utils";
import { appendDatePlugin } from '@vuepress/plugin-append-date'
import { searchProPlugin } from "vuepress-plugin-search-pro";
import { gitPlugin } from '@vuepress/plugin-git'
import { CodeLinkReplacer } from './plugins/CodeLinkReplacer.js'
import { viteBundler } from '@vuepress/bundler-vite'
const __dirname = getDirname(import.meta.url);
import theme from "./theme.js";
import { markdownMathPlugin } from '@vuepress/plugin-markdown-math'
import { seo, sitemap } from "vuepress-theme-hope";

export default defineUserConfig({

  bundler: viteBundler({
    // vite options
    viteOptions: {
    },
    // ssg options
    vuePluginOptions: {
    }
  }),

  alias: {
    "@theme-hope/modules/blog/components/BlogHero": path.resolve(
      __dirname,
      "./components/BlogHero.vue"
    ),
    "@theme-hope/modules/blog/components/ArticleItem": path.resolve(
      __dirname,
      "./components/ArticleItem.vue"
    ),
    // "@theme-hope/modules/navbar/components/Navbar": path.resolve(
    //   __dirname,
    //   "./components/NavBar.vue"
    // ),
    // "@theme-hope/components/CommonWrapper": path.resolve(
    //   __dirname,
    //   "./components/CommonWrapper.vue"
    // )

    /*     "@theme-hope/modules/sidebar/components/Sidebar": path.resolve(
          __dirname,
          "./components/Sidebar.vue"
        ) */
  },
  base: "/",

  lang: "zh-CN",
  title: "张一风",
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
  ],

  // 和 PWA 一起启用
  // shouldPrefetch: false,

  extendsMarkdown: (md) => {
    md.use(CodeLinkReplacer, {});
  },
  head: [
  ]
});
