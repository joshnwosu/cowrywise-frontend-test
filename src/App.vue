<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
import ImageGallery from './components/ImageGallery.vue';
import OverlapBG from './components/OverlapBG.vue';
import Search from './components/Search.vue';
</script>

<template>

  <OverlapBG />

  <div class="main">

    <Search />

    <ImageGallery />


  </div>

</template>

<style lang="scss" scoped>
.main {
  position: relative;
  width: 1000px;
  margin: 0 auto;
  padding: 30px;
  z-index: 2;
}
</style>
