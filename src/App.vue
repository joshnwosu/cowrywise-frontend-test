<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
import OverlapBG from './components/OverlapBG.vue';
import Search from './components/Search.vue';
import SkeletonLoader from './components/SkeletonLoader.vue';
</script>

<template>

  <OverlapBG />

  <div class="main">

    <Search />

    <div class="gallery">


      <!-- Skeleton loader for loading state -->
      <SkeletonLoader v-for="n in 8" :key="n" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main {
  position: relative;
  width: 1000px;
  margin: 0 auto;
  padding: 30px;
}

.gallery {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  grid-auto-flow: dense;
  grid-template-rows: subgrid;
  width: 900px;
  margin: 0 auto;
  padding: 50px 20px;
  /* Alternative to achieve the masonry effect */
}
</style>
