<template>
  <q-layout view="lhh LpR lff">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          :icon="leftDrawerOpen ? 'unsubscribe' : 'mark_as_unread'"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Awesome Chat App </q-toolbar-title>

        <q-btn
          flat
          dense
          round
          icon="help_outline"
          @click="toggleRightDrawer"
        />
        <div>{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Cuộc trò chuyện </q-item-label>

        <ListMessage
          v-for="link in listConversation"
          :key="link.name"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-drawer
      side="right"
      v-model="drawerRight"
      bordered
      @click="toggleRightDrawer"
      class="bg-grey-3"
    >
      <q-list>
        <q-item-label header> Danh sách người dùng </q-item-label>

        <FriendList v-for="link in listUser" :key="link.name" v-bind="link" />
      </q-list>
    </q-drawer>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import ListMessage from "components/ListMessage.vue";
import FriendList from "components/FriendItem.vue";
import moment from "moment";

moment.fn.fromNow = function (a) {
  var duration = moment().diff(this, "day") + " ngày trước";
  if (moment().diff(this, "day") + 0 < 1)
    duration = moment().diff(this, "hours") + " giờ trước";
  return duration;
};

const listConversation = [
  {
    idRoom: 1,
    name: "Docs",
    lastMessage: "quasar.dev",
    stamp: moment(new Date("12/12/2021")).fromNow(),
    avatar: "https://cdn.quasar.dev/img/avatar3.jpg",
  },
  {
    idRoom: 1,
    name: "Github",
    lastMessage: "github.com/quasarframework",
    stamp: moment().fromNow().toString(),
    avatar: "https://cdn.quasar.dev/img/avatar3.jpg",
  },
  {
    idRoom: 1,
    name: "Discord Chat Channel",
    lastMessage: "chat.quasar.dev",
    stamp: moment(new Date("12/14/2021")).fromNow().toString(),
    avatar: "https://cdn.quasar.dev/img/avatar3.jpg",
  },
  {
    idRoom: 1,
    name: "Forum",
    lastMessage: "forum.quasar.dev",
    stamp: moment(new Date("12/14/2021")).fromNow().toString(),
    avatar: "https://cdn.quasar.dev/img/avatar3.jpg",
  },
  {
    idRoom: 1,
    name: "Twitter",
    lastMessage: "@quasarframework",
    stamp: moment(new Date("12/14/2021")).fromNow().toString(),
    avatar: "https://cdn.quasar.dev/img/avatar3.jpg",
  },
  {
    idRoom: 1,
    name: "Facebook",
    lastMessage: "@QuasarFramework",
    stamp: moment(new Date("12/14/2021")).fromNow().toString(),
    avatar: "https://cdn.quasar.dev/img/avatar3.jpg",
  },
  {
    idRoom: 1,
    name: "Quasar Awesome",
    lastMessage: "Community Quasar projects",
    stamp: moment(new Date("12/14/2021")).fromNow().toString(),
    avatar: "https://cdn.quasar.dev/img/avatar3.jpg",
  },
];

export default defineComponent({
  name: "ChatLayout",

  components: {
    ListMessage,
    FriendList,
  },

  setup() {
    const leftDrawerOpen = ref(false);
    const drawerRight = ref(true);
    return {
      listConversation: [...listConversation],
      listUser: [...listConversation, ...listConversation, ...listConversation],
      leftDrawerOpen,
      drawerRight,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      toggleRightDrawer() {
        drawerRight.value = !drawerRight.value;
      },
    };
  },
});
</script>
