import { defineClientConfig } from "vuepress/client";
import TDesign from "tdesign-vue-next";
import 'tdesign-vue-next/es/style/index.css';
import './styles/theme.css'

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    app.use(TDesign);
  },
  setup() { },
  rootComponents: [],

});
