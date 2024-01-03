<template>
  <div
    class="card card-hover"
    @click="detail_mountain()"
    style="width: 18rem; border-radius: 10%; overflow: hidden"
  >
    <img
      :src="src"
      class="card-img-top"
      alt="..."
      style="width: 100%; height: 90%"
    />
    <div class="card-body" style="border-top: 4px solid black">
      <p class="card-text">
        {{ props.slideContent.mountain }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
const props = defineProps(["slideContent"]);
const router = useRouter();
const route = useRoute();
const src = computed(() => {
  return `src/img/Mountain/M${props.slideContent.mountain_id}.jpg`;
});
//이미지 받아와서 경로 수정하기

//mountain 정보, props.slideContent.mountain_id, locationid를 넘겨야함
const detail_mountain = function () {
  router.push({
    name: "mountain",
    params: {
      location_id: `${props.slideContent.location_id}`,
      mountain_id: `${props.slideContent.mountain_id}`,
    },
  });
};
</script>

<style scoped>
.card {
  height: 400px;
  margin: 10px;
  border: 4px solid #000;
}
.card-hover:hover {
  cursor: pointer;
  animation: shake 0.5s;
}
@keyframes shake {
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-10px) rotate(1deg);
  }
  50% {
    transform: translateX(10px) rotate(-1deg);
  }
  75% {
    transform: translateX(-10px) rotate(1deg);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
