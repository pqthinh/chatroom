const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Index.vue") }],
  },
  {
    path: "/users",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/FriendList.vue") }],
  },
  {
    path: "/login",
    component: () => import("layouts/PublicLayout.vue"),
    children: [{ path: "", component: () => import("pages/Login.vue") }],
  },
  {
    path: "/register",
    component: () => import("layouts/PublicLayout.vue"),
    children: [{ path: "", component: () => import("pages/Signup.vue") }],
  },
  {
    path: "/chat",
    component: () => import("layouts/ChatLayout.vue"),
    children: [{ path: "", component: () => import("pages/ChatPage.vue") }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
