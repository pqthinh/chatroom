<template>
  <q-layout view="lhh LpR lff">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          :icon="leftDrawerOpen ? 'unsubscribe' : 'mark_as_unread'"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Awesome Chat App </q-toolbar-title>

        <q-btn
          flat
          dense
          round
          icon="help_outline"
          @click="toggleRightDrawer"
        />
        <div class="tab_profile--icon">{{ user?.name }}</div>

        <q-avatar class="tab_profile--icon">
          <img :src="user?.avatar" />
          <q-menu anchor="bottom right" self="bottom left">
            <q-list class="min-width-200">
              <q-item clickable v-close-popup>
                <q-item-section>Trang cá nhân</q-item-section>
              </q-item>

              <q-item clickable v-close-popup>
                <q-item-section @click="logout">Đăng xuất</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-avatar>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Cuộc trò chuyện </q-item-label>

        <ListMessage
          v-for="conversation in listRoom"
          :key="conversation.name"
          v-bind="conversation"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-drawer
      side="right"
      v-model="drawerRight"
      bordered
      @click="toggleRightDrawer"
      class="bg-grey-3"
    >
      <q-list>
        <q-item-label header> Danh sách người dùng </q-item-label>

        <FriendList v-for="link in listUser" :key="link.name" v-bind="link" />
      </q-list>
    </q-drawer>
  </q-layout>
</template>

<script>
import { defineComponent, ref, onBeforeMount } from "vue";
import ListMessage from "components/ListMessage.vue";
import FriendList from "components/FriendItem.vue";
import { useRouter } from "vue-router";
import moment from "moment";
import { api } from "boot/axios";

moment.fn.fromNow = function (a) {
  var duration = moment().diff(this, "day") + " ngày trước";
  if (moment().diff(this, "day") + 0 < 1)
    duration = moment().diff(this, "hours") + " giờ trước";
  return duration;
};

export default defineComponent({
  name: "ChatLayout",

  components: {
    ListMessage,
    FriendList,
  },

  setup() {
    const leftDrawerOpen = ref(false);
    const drawerRight = ref(true);
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const listUser = ref([]);
    const listRoom = ref([]);
    const router = useRouter();

    const logout = () => {
      router.push({ path: "login" });
      localStorage.clear();
    };

    onBeforeMount(async () => {
      const { id, email, name, avatar } = user;
      if (!id || !email || !name || !avatar) logout();

      const { data } = await api.get("/users");
      listUser.value = data;
      let rooms = await api.get(`/list-room/${id}`);
    
      listRoom.value = rooms.data?.map((room) => ({
        idRoom: room?.roomId,
        name: room?.name || "",
        avatar: room?.avatar || "",
        lastMessage: room?.lastMessage || "",
        stamp: moment(room?.lastActive || new Date())
          .fromNow()
          .toString(),
      }));
    });

    return {
      listRoom,
      listUser,
      leftDrawerOpen,
      drawerRight,
      user,
      logout,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      toggleRightDrawer() {
        drawerRight.value = !drawerRight.value;
      },
    };
  },
});
</script>
