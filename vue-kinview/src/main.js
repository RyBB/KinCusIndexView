import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

const viewId = 5744049;
kintone.events.on('app.record.index.show', event => {
  if (event.viewId !== viewId) return;
  new Vue({
    render: h => h(App),
  }).$mount('#app')
});
