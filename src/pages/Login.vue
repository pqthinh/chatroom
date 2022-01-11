<template>
  <div class="q-pa-md wrapper_form--login">
    <h2 class="text-h3 h3">Đăng nhập</h2>
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        filled
        v-model="username"
        label="Tên đăng nhập"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Hãy nhập thông tin']"
      />

      <q-input
        filled
        v-model="password"
        type="password"
        label="Nhập mật khẩu"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Hãy nhập thông tin']"
      />

      <p class="button__register">
        <router-link to="/register">Đăng ký tài khoản</router-link>
      </p>

      <div>
        <q-btn label="Đăng nhập" type="submit" color="primary" />
        <q-btn label="Hủy" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { ref } from "vue";

export default {
  setup() {
    const $q = useQuasar();

    const username = ref(null);
    const password = ref(null);

    return {
      username,
      password,

      onSubmit() {
        console.log(username, password);
        $q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Submitted",
        });
      },

      onReset() {
        username.value = null;
        password.value = null;
      },
    };
  },
};
</script>
