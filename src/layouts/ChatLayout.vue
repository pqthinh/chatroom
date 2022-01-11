<template>
  <q-layout view="lhh LpR lff">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Quasar App </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <ListMessage
          v-for="link in essentialLinks"
          :key="link.name"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import ListMessage from 'components/ListMessage.vue'

const linksList = [
  {
    idRoom: 1,
    name: 'Docs',
    lastMessage: 'quasar.dev',
    sentTime: new Date(),
    avatar: 'https://quasar.dev'
  },
  {
    idRoom: 1,
    name: 'Github',
    lastMessage: 'github.com/quasarframework',
    sentTime: new Date(),
    avatar: 'https://github.com/quasarframework'
  },
  {
    idRoom: 1,
    name: 'Discord Chat Channel',
    lastMessage: 'chat.quasar.dev',
    sentTime: new Date(),
    avatar: 'https://chat.quasar.dev'
  },
  {
    idRoom: 1,
    name: 'Forum',
    lastMessage: 'forum.quasar.dev',
    sentTime: new Date(),
    avatar: 'https://forum.quasar.dev'
  },
  {
    idRoom: 1,
    name: 'Twitter',
    lastMessage: '@quasarframework',
    sentTime: new Date(),
    avatar: 'https://twitter.quasar.dev'
  },
  {
    idRoom: 1,
    name: 'Facebook',
    lastMessage: '@QuasarFramework',
    sentTime: new Date(),
    avatar: 'https://facebook.quasar.dev'
  },
  {
    idRoom: 1,
    name: 'Quasar Awesome',
    lastMessage: 'Community Quasar projects',
    sentTime: new Date(),
    avatar: 'https://awesome.quasar.dev'
  }
];

export default defineComponent({
  name: "ChatLayout",

  components: {
    ListMessage,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
