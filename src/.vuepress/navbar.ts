import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "关于我",
    link: "/intro",
  },
  {
    text: "文章",
    link: "/posts/",
  },
  {
    text: "机器学习",
    icon: "pen-to-square",
    prefix: "/posts/",
    children: [
      {
        text: "Pandas学习",
        link: "pandas",
      },
    ],
  },
]);
