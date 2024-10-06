<template>
    <OverlapBG />
    <div class="main">
        <h1 class="search-title">Search Results for <span class="search-title-query"> "{{ $route.params.query }}"
            </span></h1>

        <div class="gallery">
            <ImageCard v-for="image in images" :key="image.id" :image="image" @click="showImage(image)" />
            <SkeletonLoader v-if="loading" v-for="n in 8" :key="n" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue';
import { fetchImages } from '../services/api';
import ImageCard from '../components/ImageCard.vue';
import SkeletonLoader from '../components/SkeletonLoader.vue';
import { UnsplashImage } from '../types/unsplashImage';
import { useRoute } from 'vue-router';
import OverlapBG from '../components/OverlapBG.vue';

export default defineComponent({
    components: { ImageCard, SkeletonLoader, OverlapBG },
    props: ['query'],
    setup() {
        const images = ref<UnsplashImage[]>([]);
        const loading = ref(false);
        const route = useRoute();

        const loadImages = async (query: string) => {
            try {
                loading.value = true;
                const data = await fetchImages(query, 8);
                images.value = data;
            } catch (error) {
                console.error('Error loading images:', error);
            } finally {
                loading.value = false;
            }
        };

        const showImage = (image: UnsplashImage) => {


            console.log('selected image: ', image)
        };

        // Watch for changes in the route params and reload images when the query changes
        watch(
            () => route.params.query,
            (newQuery) => {
                const query = Array.isArray(newQuery) ? newQuery.join(', ') : newQuery;  // Ensure it's a string
                if (query) {
                    loadImages(query);
                }
            }
        );

        // Load images on component mount with the initial query
        onMounted(() => {
            const initialQuery = route.params.query;
            const query = Array.isArray(initialQuery) ? initialQuery.join(', ') : initialQuery;  // Ensure it's a string
            loadImages(query || 'Africa');  // Default to 'Africa' if no query
        });


        return {
            showImage,
            images,
            loading,
        };
    },
});
</script>



<style lang="scss" scoped>
.main {
    position: relative;
    width: 1000px;
    margin: 0 auto;
    padding: 30px;
    z-index: 2;
}

.gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    /* Responsive columns */
    grid-gap: 30px;
    width: 100%;
    margin: 0 auto;
    padding: 50px 20px;
}

.search-title {
    color: #2A385D;

    .search-title-query {
        color: #72788A
    }
}
</style>