<template>
  <q-chat-message
    :name="name"
    :avatar="avatar"
    :text="message"
    :stamp="stamp"
    :sent="sender_id"
    :class="sender_id ? 'me' : 'you'"
  />
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "ChatItem",
  props: {
    room_id: { type: String },
    name: {
      type: String,
      default: "Thanhnt",
    },
    avatar: {
      type: String,
      default: "https://cdn.quasar.dev/img/avatar3.jpg",
    },
    message: {
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
});
</script>
