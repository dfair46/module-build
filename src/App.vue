<script setup lang="ts">
import {useRouter} from "vue-router";

const router = useRouter()

const linkTo = (link:string) => {
  router.push(link)
}
</script>

<template>

  <div>app内容</div>
  <button @click="linkTo('/')">按钮-base</button>
  <button @click="linkTo('/moduleA')">按钮-A</button>
  <button @click="linkTo('/moduleB')">按钮-B</button>
  <router-view></router-view>

</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
