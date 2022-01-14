<template>
  <div class="q-pa-md row justify-center chat__content">
    <div class="chat_content--list-message" ref="chat_content">
      <ChatItem
        v-for="chatItem in messageList"
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
  watch,
} from "vue";
import moment from "moment";
import ChatItem from "components/ChatItem.vue";
import { useSocketIo } from "boot/socket";

moment.locale("vi");

const sendData = {
  room_id: "123",
  sender_id: "thinhpq",
  message: "",
};

export default defineComponent({
  name: "ChatPage",
  components: {
    ChatItem,
  },
  setup() {
    const textContent = ref(null);
    const chat_content = ref(null);
    const socket = useSocketIo();
    const roomId = "Thanh-Thinh";

    const scrollToBottom = () => {
      if (!chat_content.value) return;
      const scrollArea = chat_content.value;
      scrollArea.scrollTop = scrollArea.scrollHeight;
      scrollArea.scrollIntoView({ behavior: "smooth", block: "end" });
    };

    const messageList = ref([]);
    const typing = ref(false);

    socket.on("connect", function () {
      console.log(`client connection done..... ${socket.id}`);
      socket.emit("setRoomId", roomId);
    });

    socket.on("send-message", (lastMessage) => {
      messageList.value = [...messageList.value, lastMessage];
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
      socket.connect();
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
      socket.disconnect();
      console.log("unmounted!");
    });

    watch(textContent, (textContent, _) => {
      textContent
        ? socket.emit("typing", "Thinhpq")
        : socket.emit("stopTyping");
    });

    return {
      messageList,
      textContent,
      chat_content,
      sendMessage() {
        if (!textContent.value) return;
        socket.emit("send-message", {
          message: [textContent.value],
          user_id: "thinhpq",
        });

        messageList.value.push({
          ...sendData,
          message: [textContent.value],
        });
        textContent.value = null;
      },
    };
  },
});
</script>
