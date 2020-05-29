import HomePage from './pages/Landing.vue';
import LogIn from "./pages/user/LogIn";

export default [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/login/',
    component: LogIn
  }
];
