<template>
  <div class="q-pa-md row justify-center chat__content">
    <div style="width: 100%">
      <q-chat-message
        name="me"
        avatar="https://cdn.quasar.dev/img/avatar3.jpg"
        :text="['hey, how are you?']"
        stamp="7 minutes ago"
        sent
        bg-color="amber-7"
      />
      <q-chat-message
        name="Jane"
        avatar="https://cdn.quasar.dev/img/avatar5.jpg"
        :text="[
          'doing fine, how r you?',
          'I just feel like typing a really, really, REALLY long message to annoy you...',
          'I just feel like typing a really, really, REALLY long message to annoy you...I just feel like typing a really, really, REALLY long message to annoy you...',
        ]"
        size="6"
        stamp="4 minutes ago"
      />
      <q-chat-message
        name="Jane"
        avatar="https://cdn.quasar.dev/img/avatar5.jpg"
        :text="['Did it work?']"
        stamp="1 minutes ago"
        size="6"
      />
    </div>
    <q-input filled v-model="text_content" label="Nhập nội dung" />
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

const sendMessage = {
  room_id: '', sender_id: '',content: ''
}
const listMessage = [
  
]

export default defineComponent({
  setup() {
    const conversationChat = ref(null);
    return null;
  },
});
</script>
