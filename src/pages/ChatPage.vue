<template>
  <div class="q-pa-md row justify-center chat__content">
    <div class="chat_content--list-message">
      <ChatItem
        v-for="chatItem in conversationChat"
        :key="chatItem"
        v-bind="chatItem"
      />
    </div>
    <q-form @submit="sendMessage" class="input__send-message">
      <q-input
        filled
        v-model="textContent"
        label="Nhập nội dung"
        class="input__send-message--input"
      />
      <q-btn label="Gửi" type="submit" color="primary" />
    </q-form>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import moment from "moment";
import ChatItem from "components/ChatItem.vue";
moment.locale('vi')

const sendData = {
  room_id: "",
  sender_id: "",
  content: "",
};
const listMessage = [
  {
    room_id: "123",
    content: [
      "doing fine, how r you?",
      "I just feel like typing a really, really, REALLY long message to annoy you...",
      "I just feel like typing a really, really, REALLY long message to annoy you...  I just feel like typing a really, really, REALLY long message to annoy you...",
    ],
    sender_id: "",
    stamp: moment(new Date()).fromNow(),
  },
  {
    room_id: "123",
    content: ["hey, how are you?"],
    sender_id: "",
    stamp: moment(new Date()).fromNow(),
  },
  {
    room_id: "123",
    content: ["Did it work?"],
    sender_id: "",
    stamp: moment(new Date()).fromNow(),
  },
  {
    room_id: "123",
    content: [
      "doing fine, how r you?",
      "I just feel like typing a really, really, REALLY long message to annoy you...",
      "I just feel like typing a really, really, REALLY long message to annoy you...  I just feel like typing a really, really, REALLY long message to annoy you...",
    ],
    sender_id: "",
    stamp: moment(new Date()).fromNow(),
  },
  {
    room_id: "123",
    content: ["hey, how are you?"],
    sender_id: "",
    stamp: moment(new Date()).fromNow(),
  },
  {
    room_id: "123",
    content: ["Did it work?"],
    sender_id: "",
    stamp: moment(new Date()).fromNow(),
  },
  {
    room_id: "123",
    content: [
      "doing fine, how r you?",
      "I just feel like typing a really, really, REALLY long message to annoy you...",
      "I just feel like typing a really, really, REALLY long message to annoy you...  I just feel like typing a really, really, REALLY long message to annoy you...",
    ],
    sender_id: "",
    stamp: moment(new Date()).fromNow(),
  },
  {
    room_id: "123",
    content: ["hey, how are you?"],
    sender_id: "",
    stamp: moment(new Date()).fromNow(),
  },
  {
    room_id: "123",
    content: ["Did it work?"],
    sender_id: "",
    stamp: moment(new Date()).fromNow(),
  },
];

export default defineComponent({
  name: "ChatPage",
  components: {
    ChatItem,
  },
  setup() {
    const conversationChat = ref(listMessage);
    const textContent = ref(null);
    return {
      conversationChat,
      textContent,
      sendMessage() {
        console.log(textContent, sendData);
      },
    };
  },
});
</script>
