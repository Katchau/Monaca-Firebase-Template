// Import Vue
import Vue from 'vue';

// Import F7
import Framework7 from 'framework7/framework7.esm.bundle.js';

// Import F7 Vue Plugin
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js';

// Import F7 Styles
import Framework7Styles from 'framework7/css/framework7.css';

// Import Icons and App Custom Styles
import IconsStyles from './css/icons.css';
import AppStyles from './css/app.css';

//add firebase configuration and initialize it
const fb = require('./firebaseConfig.js');

// Import App Component
import App from './app.vue';

// Init F7 Vue Plugin
Framework7.use(Framework7Vue)

let app;
fb.auth.onAuthStateChanged(function (user){
  if (!app) {
    // Init App
    app = new Vue({
      el: '#app',
      template: '<app/>',

      // Register App Component
      components: {
        app: App
      }
    });
  }
  if (user) {

  }
});
