<template>
  <div class="q-pa-md wrapper_form--login">
    <h2 class="text-h3 h3">Đăng nhập</h2>
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        filled
        v-model="email"
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
import { ref, onBeforeMount } from "vue";
import { api } from "boot/axios";
import { useRouter } from "vue-router";

export default {
  name: "LoginPage",
  components: {},
  setup() {
    const $q = useQuasar();
    const email = ref(null);
    const password = ref(null);
    const router = useRouter();

    // phân biết ref với reactive của hook Vue
    // watchEffect thường đi với reactive
    // This effect runs before the DOM is updated, and consequently,
    // the template ref does not hold a reference to the element yet.
    // cái này tương đương với watch nhưng chắc có thể kiểm soát được số lần render lại như useEffect của React

    onBeforeMount(() => {
      if (!localStorage.getItem("user")) return localStorage.clear();
      const { id, uid, name, email } = JSON.parse(localStorage.getItem("user"));
      if (id && uid && name && email) router.push({ path: "chat" });
    });
    const onSubmit = async () => {
      const { data } = await api.post("/login", {
        email: email.value,
        password: password.value,
      });

      if (data && data?.data) {
        const { user, token } = data.data;
        if (user && token) {
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
          $q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Login success",
          });
          router.push({ path: "chat" });
        }
        return;
      }

      $q.notify({
        color: "red-4",
        textColor: "white",
        icon: "cloud_done",
        message: "Login failed",
      });
    };
    return {
      email,
      password,
      onSubmit,
      onReset() {
        email.value = null;
        password.value = null;
      },
    };
  },
  methods: {},
};
</script>
