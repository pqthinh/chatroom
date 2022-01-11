<template>
  <router-view />
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  sockets: {
    texto(text) {
      console.log("oi");
      this.activeAlert(text);
    },
  },
  methods: {
    activeAlert(text) {
      alert(text);
    },
  },
});
</script>
