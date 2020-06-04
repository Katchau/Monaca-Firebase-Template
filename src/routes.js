import HomePage from './pages/Landing.vue';
import LogIn from "./pages/user/LogIn";
import Register from "./pages/user/Register"
import MainMenu from "./pages/Main"
import CreateLists from "./pages/lists/Create"
import MyLists from "./pages/lists/MyLists"
const fb = require('./firebaseConfig.js');

export default [
  {
    path: '/',
    async(routeTo, routeFrom, resolve, reject) {
      if (!fb.isLoggedIn()) {
        // resolve promise
          // resolve with component
        resolve({component: HomePage})
      } else {
          resolve({url: '/main/', component: MainMenu})
      }
    }
  },
  {
    path: '/login/',
    component: LogIn
  },
  {
    path: '/register/',
    component: Register
  },
  {
    path: '/main/',
    component: MainMenu
  },
  {
    path: '/create/',
    component: CreateLists
  },
  {
    path: '/lists/',
    component: MyLists
  }
];
