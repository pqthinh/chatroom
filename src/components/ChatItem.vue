<template>
  <q-chat-message
    :name="name"
    :avatar="avatar"
    :text="content"
    :stamp="stamp"
    :sent="sender_id"
    :class="sender_id ? 'me' : 'you'"
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
  setup(props) {
    // console.log(props.toString(), "props");
    // xu ly du lieu o day
    // console.log(props.sender_id, "props.sender_id")
    // return {
    //   ...props,
    //   sender_id: Boolean(props.sender_id),
    // };
  },
});
</script>
