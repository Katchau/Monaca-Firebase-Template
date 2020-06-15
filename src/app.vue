<template>
  <!-- App -->
  <f7-app :params="f7params">
    <!-- Statusbar -->
<!--    <f7-statusbar></f7-statusbar>-->

      <!-- Landing View -->
      <f7-view id="main-view" url="/" main ></f7-view>

      <!-- LogIn View -->
      <f7-view id="login-screen-view" url="/login/" login-screen></f7-view>

      <!-- Register View -->
      <f7-view id="register-screen-view" url="/register/" login-screen></f7-view>

  </f7-app>
</template>

<script>
// Import Routes
import routes from './js/routes.js'
import { Device }  from 'framework7/framework7-lite.esm.bundle.js';
import cordovaApp from './js/cordova-app.js';

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
      }
    }
  },
  mounted() {
    this.$f7ready((f7) => {
      // Init cordova APIs (see cordova-app.js)
      if (Device.cordova) {
        cordovaApp.init(f7);
      }
      // Call F7 APIs here
    });
  }
}
</script>
