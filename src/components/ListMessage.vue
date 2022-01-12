<template>
  <q-item class="chat__item-friend">
    <q-item-section avatar>
      <q-avatar>
        <img :src="avatar" />
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label class="message-inline">{{ name }}</q-item-label>
      <q-item-label caption class="message-inline">
        {{ lastMessage }}
      </q-item-label>
    </q-item-section>

    <q-item-section class="text-right fit-content">
      <q-item-label class="chat-item__time">{{ stamp }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ListMessage",
  props: {
    name: {
      type: String,
      default: "Thanhnt",
    },

    lastMessage: {
      type: String,
      default: "hello ban",
    },

    avatar: {
      type: String,
      default: "https://cdn.quasar.dev/img/avatar3.jpg",
    },

    stamp: {
      type: String,
      default: '',
    },
  },
  setup(props, ctx) {
    // console.log(ctx, "name")
  }
});
</script>
