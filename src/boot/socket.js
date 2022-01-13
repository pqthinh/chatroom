import { ref } from "vue";
import openSocket from "socket.io-client";

export function useSocketIo() {
  return openSocket("http://localhost:3000");
}

export function useSocketName(socket) {
  const messageList = ref("");
  const typing = ref(false)

  socket.on("send-message", lastMessage => {
    console.log(lastMessage, "lastMessage")
    messageList.value = [...messageList.value, ...lastMessage];
  });

  socket.on("typing", (data) => {
    typing.value = data;
  });

  socket.on("stopTyping", () => {
    typing.value = false;
  });

  window.onbeforeunload = () => {
    socket.emit("leave", socket.id);
  };

  function setMessageList(value) {
    socket.emit("add-message", value);
  }

  return [messageList, setMessageList];
}
