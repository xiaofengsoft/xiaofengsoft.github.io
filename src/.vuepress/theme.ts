import { hopeTheme } from "vuepress-theme-hope";

import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

export default hopeTheme(
  {
    hostname: "https://mister-hope.github.io",

    author: {
      name: "张一风",
      url: "https://github.com/xiaogfengsoft",
      email: "xiaofengs@yeah.net",
    },

    iconAssets: "fontawesome-with-brands",
    favicon: "https://foruda.gitee.com/avatar/1737268770223115743/5371216_xiaofengsb_1737268770.png!avatar100",

    logo: "https://foruda.gitee.com/avatar/1737268770223115743/5371216_xiaofengsb_1737268770.png!avatar100",

    repo: "xiaofengsoft/xiaofengsoft.github.io",

    docsDir: "src",

    // 导航栏
    navbar,

    // 侧边栏
    sidebar: false,

    // 页脚
    footer: "",
    displayFooter: true,

    // 博客相关
    blog: {
      description: "张一风的个人博客",
      intro: "/intro.html",
      medias: {
        BiliBili: "https://space.bilibili.com/447758911",
        Email: "mailto:xiaofengs@yeah.net",
        Gitee: "https://gitee.com/xiaofengsb",
        GitHub: "https://github.com/xiaofengsoft",
        Twitter: "https://x.com/xiaofengsxf",
        Youtube: "https://www.youtube.com/@%E5%BC%A0%E4%B8%80%E9%A3%8E-j9y",
        Zhihu: "https://www.zhihu.com/people/xfs-xiaofeng",
      },
    },

    // 加密配置
    // encrypt: {
    //   config: {
    //     "/demo/encrypt.html": ["1234"],
    //   },
    // },

    // 多语言配置
    metaLocales: {
      editLink: "在 GitHub 上编辑此页",
    },

    // 如果想要实时查看任何改变，启用它。注: 这对更新性能有很大负面影响
    // hotReload: true,

    // 在这里配置主题提供的插件
    plugins: {
      blog: true,
      seo: {
        hostname: "https://xiaofengsoft.github.io",
      },
      sitemap: {
        hostname: "https://xiaofengsoft.github.io",
        changefreq: "always",
      },

      // 启用之前需安装 @waline/client
      // 警告: 这是一个仅供演示的测试服务，在生产环境中请自行部署并使用自己的服务！
      // comment: {
      //   provider: "Waline",
      //   serverURL: "https://waline-comment.vuejs.press",
      // },
      comment: {
        provider: "Giscus",
        repoId: "R_kgDONRLacQ",
        repo: "xiaofengsoft/xiaofengsoft.github.io",
        category: "General",
        categoryId: "DIC_kwDONRLacc4CkXyN",
      },

      markdownHint: {
        alert: true,
      },

      markdownTab: {
        tabs: true,
      },

      components: {
        components: ["Badge", "VPCard"],
      },

      // 此处开启了很多功能用于演示，你应仅保留用到的功能。
      markdownImage: {
        figure: true,
        lazyload: true,
        size: true,
      },

      markdownMath: {
        // 或者安装 mathjax-full
        type: "mathjax",
      },



      // 此处开启了很多功能用于演示，你应仅保留用到的功能。
      mdEnhance: {
        align: true,
        attrs: true,
        component: true,
        markmap: true,
        demo: true,
        include: true,
        mark: true,
        plantuml: true,
        spoiler: true,
        stylize: [
          {
            matcher: "Recommended",
            replacer: ({ tag }) => {
              if (tag === "em")
                return {
                  tag: "Badge",
                  attrs: { type: "tip" },
                  content: "Recommended",
                };
            },
          },
        ],
        sub: true,
        sup: true,
        tasklist: true,
        vPre: true,

        // 在启用之前安装 chart.js
        // chart: true,

        // insert component easily

        // 在启用之前安装 echarts
        // echarts: true,

        // 在启用之前安装 flowchart.ts
        flowchart: true,

        // gfm requires mathjax-full to provide tex support
        // gfm: true,

        // 在启用之前安装 mermaid
        mermaid: true,

        // playground: {
        //   presets: ["ts", "vue"],
        // },

        // 在启用之前安装 @vue/repl
        // vuePlayground: true,

        // install sandpack-vue3 before enabling it
        // sandpack: true,
      },

      // 如果你需要 PWA。安装 @vuepress/plugin-pwa 并取消下方注释
      // pwa: {
      //   favicon: "/favicon.ico",
      //   cacheHTML: true,
      //   cacheImage: true,
      //   appendBase: true,
      //   apple: {
      //     icon: "/assets/icon/apple-icon-152.png",
      //     statusBarColor: "black",
      //   },
      //   msTile: {
      //     image: "/assets/icon/ms-icon-144.png",
      //     color: "#ffffff",
      //   },
      //   manifest: {
      //     icons: [
      //       {
      //         src: "/assets/icon/chrome-mask-512.png",
      //         sizes: "512x512",
      //         purpose: "maskable",
      //         type: "image/png",
      //       },
      //       {
      //         src: "/assets/icon/chrome-mask-192.png",
      //         sizes: "192x192",
      //         purpose: "maskable",
      //         type: "image/png",
      //       },
      //       {
      //         src: "/assets/icon/chrome-512.png",
      //         sizes: "512x512",
      //         type: "image/png",
      //       },
      //       {
      //         src: "/assets/icon/chrome-192.png",
      //         sizes: "192x192",
      //         type: "image/png",
      //       },
      //     ],
      //     shortcuts: [
      //       {
      //         name: "Demo",
      //         short_name: "Demo",
      //         url: "/demo/",
      //         icons: [
      //           {
      //             src: "/assets/icon/guide-maskable.png",
      //             sizes: "192x192",
      //             purpose: "maskable",
      //             type: "image/png",
      //           },
      //         ],
      //       },
      //     ],
      //   },
      // },

      // 如果你需要幻灯片，安装 @vuepress/plugin-revealjs 并取消下方注释
      // revealjs: {
      //   plugins: ["highlight", "math", "search", "notes", "zoom"],
      // },
    },
  },
  {
    custom: true,
  }
);
