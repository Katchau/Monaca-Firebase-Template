import HomePage from '@/pages/Landing.vue';
import LogIn from "@/pages/user/LogIn";
import Register from "@/pages/user/Register"
import MainMenu from "@/pages/Main"
import CreateLists from "@/pages/lists/Create"
import MyLists from "@/pages/lists/MyLists"

export default [
  {
    path: '/',
    component: HomePage,
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
    component: MainMenu,
    options: {
      props: {
        displayName: 'User'
      },
    },
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
