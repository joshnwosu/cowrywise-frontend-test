<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { fetchImages } from '../services/api';
import SkeletonLoader from './SkeletonLoader.vue';
import ImageCard from './ImageCard.vue';
import { UnsplashImage } from '../types/unsplashImage';
import SearchBar from './SearchBar.vue';
import { useRouter } from 'vue-router';
import OverlapBG from './OverlapBG.vue';

export default defineComponent({
    components: { SkeletonLoader, ImageCard, SearchBar, OverlapBG },
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

            console.log('selected image: ', image)
        };

        const closeModal = () => {
            modalVisible.value = false;
            selectedImage.value = null;
        };

        const searchImages = (query: string) => {
            console.log('key: ', query)
            // loadImages(query);

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
    <div class="main">
        <SearchBar @search="searchImages" />
        <div class="gallery">
            <ImageCard v-for="image in images" :key="image.id" :image="image" @click="showImage(image)" />

            <!-- Skeleton loader for loading state -->

            <SkeletonLoader v-if="loading" v-for="n in 8" :key="n" />

            <!-- Modal to display the selected image -->
            <div v-if="modalVisible" class="modal" @click="closeModal">

                <div class="modal-container">

                    <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2"
                        viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="close-icon">
                        <path
                            d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z" />
                    </svg>

                    <img :src="selectedImage?.urls.regular" alt="Selected Image" class="modal-image" />

                    <!-- <div class="modal-image-info">
                        <p class="author">{{ selectedImage?.user?.name || '' }}</p>
                        <p class="description">{{ selectedImage?.description || '' }}</p>
                    </div> -->
                </div>
            </div>
        </div>
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

.gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    /* Responsive columns */
    grid-gap: 30px;
    width: 100%;
    margin: 0 auto;
    padding: 50px 20px;
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-image {

    // width: 500px;
    height: 500px;
    max-height: 90%;
    max-width: 100%;
    margin-bottom: 20px;
    object-fit: cover;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;


}

.modal-container {
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    // overflow: hidden;
    position: relative;
    /* padding: 20px; */
}

.modal-image-info {
    padding: 20px;

    .author {
        font-weight: bold;
    }

    .description {
        font-size: 12px;
        opacity: 0.8;
    }
}

.close-icon {
    position: absolute;
    width: 24px;
    height: 24px;
    right: -50px;
    top: 0;
    fill: #ffffff;
    z-index: 2;
    cursor: pointer;
}
</style>
