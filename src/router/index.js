Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    name: "Login",
    path: "/login",
    component: () => import("@/views/Login"),
  },
  {
    path: "/home",
    name: "Home",
    redirect: "/home/discovery",
    component: () => import("@/views/Home"),
    children: [
      {
        name: "Search",
        path: "search",
        component: () => import("@/views/searchList"),
      },
      {
        name: "Discovery",
        path: "discovery",
        component: () => import("@/views/discovery"),
      },
      {
        name: "recommendplaylist",
        path: "recommendplaylist",
        component: () => import("@/views/RecommendPlayList"),
      },
      {
        name: "recommendmusic",
        path: "recommendmusic",
        component: () => import("@/views/RecommendMusic"),
      },
      {
        name: "Movie",
        path: "movie",
        component: () => import("@/views/Movie"),
      },
      {
        name: "Video",
        path: "video/:id",
        component: () => import("@/views/Video"),
      },
      {
        name: "playlistmusic",
        path: "playlistmusic/:musicid",
        component: () => import("@/views/PlayListMusic"),
      },
      {
        name: "singer",
        path: "singer/:singerid",
        component: () => import("@/views/Singer"),
      },
      {
        name: "album",
        path: "album/:albumid",
        component: () => import("@/views/Album"),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
