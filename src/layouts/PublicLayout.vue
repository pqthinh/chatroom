<template>
  <q-layout view="lhh LpR lff" class="layout__public--container">
    <router-view />
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "PublicLayout",
});
</script>
