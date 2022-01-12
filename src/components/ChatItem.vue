<template>
  <q-chat-message
    :name="name"
    :avatar="avatar"
    :text="content"
    :stamp="stamp"
    :sent="sender_id"
    :class="sent ? 'me' : 'you'"
  />
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ChatItem",
  props: {
    room_id: { type: String, default: "123" },
    name: {
      type: String,
      default: "Thanhnt",
    },
    avatar: {
      type: String,
      default: "https://cdn.quasar.dev/img/avatar3.jpg",
    },
    content: {
      default: "hey, how are you?",
    },
    stamp: {
      type: String,
      default: "4 minutes ago",
    },
    sender_id: {
      type: Boolean,
      default: false,
    },
  },
  updated() {
    // console.log(props);
  },
});
</script>
