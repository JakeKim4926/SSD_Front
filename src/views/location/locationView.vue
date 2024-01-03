<template>
  <div class="text-center">
    <div style="padding: 20px">
      <span style="font-size: 30px; font-weight: bold">{{
        route.query.label
      }}</span>
    </div>
    <!--store에서 해당 지역에 있는 산 정보 받아서 출력-->
    <div class="d-flex flex-wrap justify-content-around card-box">
      <MountainCard
        v-for="(slideContent, index) in findAll"
        :key="index"
        :virtualIndex="index"
        :slideContent="slideContent"
      />
    </div>
  </div>
</template>

<script setup>
import MountainCard from "@/components/mountain/MountainCard.vue";
import { onMounted, ref, computed } from "vue";
import { useMountainStore } from "@/stores/mountain";
import { useRoute } from "vue-router";

const store = useMountainStore();
const route = useRoute();

const slides = ref([]);
const name = computed(() => route.params.label);

const findAll = computed(() => {
  store.findAllMountain(route.params.id);
  slides.value = store.mountains;
  return slides.value;
});
</script>

<style scoped></style>
