<template>
    <div class="modal" v-if="visible" @click="closeModal">
        <div class="modal-container">
            <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2"
                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="close-icon" @click.stop="closeModal">
                <path
                    d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z" />
            </svg>

            <img :src="image?.urls.regular" alt="Selected Image" class="modal-image" />
            <div class="modal-image-info">
                <p class="author">{{ image?.user?.name || '' }}</p>
                <p class="description">{{ image?.description || '' }}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { UnsplashImage } from '../types/unsplashImage';

export default defineComponent({
    props: {
        visible: {
            type: Boolean,
            required: true,
        },
        image: {
            type: Object as () => UnsplashImage | null,
            required: false,
        },
    },
    emits: ['close'],
    setup(props, { emit }) {
        const closeModal = () => {
            emit('close');
        };

        return {
            closeModal,
        };
    },
});
</script>

<style lang="scss" scoped>
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
    height: 500px;
    max-height: 90%;
    max-width: 100%;
    // margin-bottom: 20px;
    object-fit: cover;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}

.modal-container {
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    position: relative;
}

.modal-image-info {
    padding: 30px;

    .author {
        font-weight: bold;
        color: #2A385D;
        font-size: 20px;
        margin-bottom: 10px;
    }

    .description {
        font-size: 16px;
        color: #72788A;
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
