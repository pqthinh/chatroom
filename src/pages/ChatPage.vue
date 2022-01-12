<template>
  <div class="q-pa-md row justify-center chat__content">
    <div class="chat_content--list-message" ref="chat_content">
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
        autogrow
      />
      <q-btn label="Gửi" type="submit" color="primary" />
    </q-form>
  </div>
</template>

<script>
import {
  defineComponent,
  ref,
  onMounted,
  onUpdated,
  onUnmounted,
  onBeforeMount,
} from "vue";
import moment from "moment";
import ChatItem from "components/ChatItem.vue";
moment.locale("vi");

const sendData = {
  room_id: "123",
  sender_id: "thinhpq",
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
    sender_id: "thinhpq",
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
    const conversationChat = ref([]);
    const textContent = ref(null);
    const chat_content = ref(null);

    const scrollToBottom = () => {
      if (!chat_content.value) return;
      const scrollArea = chat_content.value;
      scrollArea.scrollTop = scrollArea.scrollHeight;
      scrollArea.scrollIntoView({ behavior: "smooth", block: "end" });
    };
    
    onBeforeMount(() => {
      console.log("before mount!");
      conversationChat.value= [...listMessage]
    });
    onMounted(() => {
      console.log("mounted!");
      scrollToBottom();
    });
    onUpdated(() => {
      console.log("updated!");
      scrollToBottom();
    });
    onUnmounted(() => {
      console.log("unmounted!");
    });

    return {
      conversationChat,
      textContent,
      chat_content,
      sendMessage() {
        conversationChat.value.push({
          ...sendData,
          content: [textContent.value],
        });
        textContent.value = null;
      },
    };
  },
});
</script>
