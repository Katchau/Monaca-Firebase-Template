<template>
  <!-- App -->
  <f7-app :params="f7params">
    <!-- Statusbar -->
<!--    <f7-statusbar></f7-statusbar>-->

      <!-- Landing View -->
      <f7-view v-if="!isLoggedIn" id="main-view" url="/" main ></f7-view>

      <!-- LogIn View -->
      <f7-view v-if="!isLoggedIn" id="login-screen-view" url="/login/" login-screen></f7-view>

      <!-- Register View -->
      <f7-view v-if="!isLoggedIn" id="register-screen-view" url="/register/" login-screen></f7-view>

      <!-- Main Menu View -->
      <f7-view v-if="isLoggedIn" id="main-menu-view" url="/main/" main ></f7-view>

  </f7-app>
</template>

<script>
// Import Routes
import routes from './routes.js'
import {auth, isLoggedIn} from "@/firebaseConfig";
const fb = require('./firebaseConfig.js');

export default {
  data() {
    return {
      // Framework7 parameters here
      f7params: {
        id: 'io.framework7.testapp', // App bundle ID
        name: 'Framework7', // App name
        theme: 'auto', // Automatic theme detection
        // App routes
        routes: routes,
        statusbar: {
          enabled: false,
        },
      },
      isLoggedIn: fb.isLoggedIn()
    }
  },
  mounted () {
    this.isLoggedIn = fb.isLoggedIn();
  },
  watch: {
    "fb.auth.currentUser": function (val) {
      this.isLoggedIn = val !== null;
    }
  }
}
</script>
