import { defineClientConfig } from "vuepress/client";
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
export default defineClientConfig({
  enhance({ app, router, siteData }) {
    const vuetify = createVuetify({

    })
    app.use(vuetify)
  },
  setup() { },
  rootComponents: [],

});
