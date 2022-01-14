<template>
  <div class="q-pa-md wrapper_form--login">
    <h2 class="text-h3 h3">Đăng ký tài khoản</h2>
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        filled
        v-model="name"
        label="Họ tên"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Hãy nhập thông tin']"
      />

      <q-input
        filled
        v-model="email"
        label="Email"
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
      <q-input
        filled
        v-model="rePassword"
        type="password"
        label="Nhập lại mật khẩu"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Hãy nhập thông tin']"
      />

      <p class="button__register">
        <router-link to="/login">Đăng nhập</router-link>
      </p>
      <div>
        <q-btn label="Đăng ký" type="submit" color="primary" />
        <q-btn label="Hủy" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { ref } from "vue";
import { api } from "boot/axios";

export default {
  setup() {
    const $q = useQuasar();

    const name = ref(null);
    const password = ref(null);
    const rePassword = ref(null);
    const email = ref(null);

    const onSubmit = async () => {
      // router.push({ path: "login" });
      if (password.value != rePassword.value) {
        $q.notify({
          color: "red-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Login false",
        });
        return;
      }
      const { data } = await api.post("/register", {
        email: email.value,
        password: password.value,
        name: name.value,
      });
      if (data) {
        $q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Login success",
        });
        // router.push({ path: "login" });
      } else
        $q.notify({
          color: "red-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Login false",
        });
    };

    return {
      name,
      email,
      password,
      rePassword,
      onSubmit,
      onReset() {
        name.value = null;
        email.value = null;
        password.value = null;
        rePassword.value = null;
      },
    };
  },
};
</script>
