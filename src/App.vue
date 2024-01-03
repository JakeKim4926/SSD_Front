<template>
  <div>
    <div>
      <TheHeader />
    </div>
    <div>
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import TheHeader from "./components/common/TheHeader.vue";
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Gamja+Flower&family=Grandiflora+One&family=Moirai+One&display=swap");
body {
  background-color: #fff;
  background: repeating-linear-gradient(
    to right,
    rgb(254, 247, 247),
    #f9f6f6 1px,
    transparent 350px
  );
  margin: 0;
}
</style>
