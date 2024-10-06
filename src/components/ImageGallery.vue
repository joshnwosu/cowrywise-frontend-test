<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { fetchImages } from '../services/api';
import SkeletonLoader from './SkeletonLoader.vue';
import { UnsplashImage } from '../types/unsplashImage';
import SearchBar from './SearchBar.vue';
import { useRouter } from 'vue-router';
import OverlapBG from './shared/OverlapBG.vue';
import GalleryWrapper from './shared/GalleryWrapper.vue';
import Container from "./shared/Container.vue"
import ImageModal from './ImageModal.vue';
import ImageCardMasonry from './ImageCardMasonry.vue';

export default defineComponent({
    components: { SkeletonLoader, SearchBar, OverlapBG, GalleryWrapper, Container, ImageModal, ImageCardMasonry },
    setup() {
        const images = ref<UnsplashImage[]>([]); // Ensure you use the UnsplashImage type
        const query = ref('');
        const modalVisible = ref(false);
        const selectedImage = ref<UnsplashImage | null>(null);
        const loading = ref(false);
        const router = useRouter();


        const loadImages = async (searchQuery = 'African') => {
            try {
                loading.value = true;
                const data = await fetchImages(searchQuery);
                images.value = data;
                // console.log('images: ', data);
            } catch (error) {
                console.error('Error loading images:', error);
            } finally {
                loading.value = false;
            }
        };



        const showImage = (image: UnsplashImage) => {
            selectedImage.value = image;
            modalVisible.value = true;
        };

        const closeModal = () => {
            modalVisible.value = false;
            selectedImage.value = null;
        };

        const searchImages = (query: string) => {

            if (query.trim()) {
                router.push({ name: 'SearchResults', params: { query: query.trim() } });
            }
        };


        onMounted(() => {
            loadImages();
        });

        return {
            images,
            query,
            modalVisible,
            selectedImage,
            loading,
            loadImages,
            showImage,
            closeModal,
            searchImages
        };
    },
});
</script>

<template>
    <OverlapBG />
    <Container>
        <SearchBar @search="searchImages" />
        <gallery-wrapper>
            <template v-if="loading">
                <SkeletonLoader v-for="n in 8" :key="n" />
            </template>
        </gallery-wrapper>


        <masonry-wall v-if="!loading" :items="images" :ssr-columns="1" :column-width="250" :gap="30" class="masonry">
            <template #default="{ item, index }">
                <image-card-masonry :image="item" :index="index" @open-modal="showImage(item)" />
            </template>
        </masonry-wall>

        <image-modal :visible="modalVisible" :image="selectedImage" @close="closeModal" />

    </Container>
</template>

<style lang="scss" scoped>
.masonry {
    margin-top: -50px;
}

.image-container {
    position: relative;
    width: 100%;
    height: 350px;
}

.image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 8px;
    transition: background-color 0.3s;
}

.image-info {
    position: absolute;
    bottom: 10px;
    left: 10px;
    color: #fff;
    z-index: 2;
    font-size: 14px;

    .author {
        font-weight: bold;
    }

    .location {
        font-size: 12px;
        opacity: 0.8;
    }
}
</style>
