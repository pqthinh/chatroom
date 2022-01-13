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
  watch
} from "vue";
import moment from "moment";
import ChatItem from "components/ChatItem.vue";
import { useSocketIo } from "boot/socket";

moment.locale("vi");

const sendData = {
  room_id: "123",
  sender_id: "thinhpq",
  content: "",
};

export default defineComponent({
  name: "ChatPage",
  components: {
    ChatItem,
  },
  setup() {
    const conversationChat = ref([]);
    const textContent = ref(null);
    const chat_content = ref(null);
    const socket = useSocketIo();

    const scrollToBottom = () => {
      if (!chat_content.value) return;
      const scrollArea = chat_content.value;
      scrollArea.scrollTop = scrollArea.scrollHeight;
      scrollArea.scrollIntoView({ behavior: "smooth", block: "end" });
    };

    const messageList = ref("");
    const typing = ref(false);

    socket.on("send-message", (lastMessage) => {
      messageList.value = [...messageList.value, lastMessage.message];
    });

    socket.on("typing", (data) => {
      console.log(data, "typing");
      typing.value = data;
    });

    socket.on("stopTyping", () => {
      typing.value = false;
    });

    window.onbeforeunload = () => {
      socket.emit("leave", socket.id);
    };

    onBeforeMount(() => {
      console.log("before mount!");
      conversationChat.value = [...messageList.value];
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
      socket.emit("leave", socket.id);
      console.log("unmounted!");
    });

    watch(textContent, (textContent, _) => {
      textContent
        ? socket.emit("typing", "Thinhpq")
        : socket.emit("stopTyping");
    });

    return {
      conversationChat,
      textContent,
      chat_content,
      sendMessage() {
        socket.emit("send-message", {
          message: textContent.value,
          user_id: "thinhpq",
        });

        conversationChat.value.push({
          ...sendData,
          content: [textContent.value],
        });
        messageList.value = conversationChat.value;
        textContent.value = null;
      },
    };
  },
});
</script>
