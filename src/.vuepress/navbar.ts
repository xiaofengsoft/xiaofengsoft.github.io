import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "编程语言",
    icon: "code",
    prefix: "/posts/编程语言/",
    children: [
      {
        text: "Python学习",
        link: "Python学习/",
      }
    ],
  },
  {
    text: "解决办法",
    icon: "pen-to-square",
    prefix: "/posts/解决办法/",
    children: [
      {
        text: "编辑器",
        link: "编辑器"
      },
      {
        text: "前端",
        link: "前端/",
      },
      {
        text: "Python",
        link: "Python/",
      },
      {
        text: "绿色上网",
        link: "绿色上网/",
      }
    ],
  },
  {
    text: "题解",
    icon: "pen-to-square",
    prefix: "/posts/题解/",
    children: [
      {
        text: "蓝桥杯题解",
        link: "蓝桥杯/",
      },
      {
        text: "力扣题解",
        link: "力扣/",
      },
    ],
  },
  {
    text: "数学建模",
    icon: "square-root-variable",
    prefix: "/posts/数学建模/",
    children: [
      {
        text: "统计学",
        link: "统计学/",
      },
      {
        text: "数据分析",
        link: "数据分析/",
      },
      {
        text: "微积分",
        link: "微积分/",
      },
      {
        text: "线性代数",
        link: "线性代数/",
      }
    ],
  },
  {
    text: "人工智能",
    icon: "microchip",
    prefix: "/posts/人工智能/",
    children: [
      {
        text: "机器学习",
        link: "机器学习/",
      }
    ],
  },
  {
    text: "英语学习",
    icon: "pen-nib",
    prefix: "/posts/英语学习/",
    children: [
      {
        text: "词汇笔记",
        link: "词汇笔记/",
      }
    ],
  },
  {
    icon: "face-rolling-eyes",
    text: "关于我",
    link: "/intro",
  },
]);
