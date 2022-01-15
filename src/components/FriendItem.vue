<template>
  <q-item class="chat__item-friend" clickable @click="createRoom">
    <q-item-section avatar>
      <q-avatar>
        <img :src="avatar" />
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label class="text-weight-bold">{{ name }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from "vue";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "FriendList",
  props: {
    uid: {
      type: String,
    },
    name: {
      type: String,
      default: "Thanhnt",
    },
    avatar: {
      type: String,
      default: "https://cdn.quasar.dev/img/avatar3.jpg",
    },
  },
  setup() {
    const $q = useQuasar();
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const createRoom = async () => {
      const { id } = user;
      const res = await api.post("/chat/create-room", {
        uid: id,
        listUser: [uid],
      });
      const { roomId } = res;
      if (roomId) localStorage.setItem("roomId", roomId);
      else
        $q.notify({
          color: "red-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Login failed",
        });
    };
    return {
      createRoom,
    };
  },
});
</script>
