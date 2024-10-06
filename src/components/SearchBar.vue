<template>
    <div class="search">


        <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg" class="search-icon">
            <path
                d="m15.97 17.031c-1.479 1.238-3.384 1.985-5.461 1.985-4.697 0-8.509-3.812-8.509-8.508s3.812-8.508 8.509-8.508c4.695 0 8.508 3.812 8.508 8.508 0 2.078-.747 3.984-1.985 5.461l4.749 4.75c.146.146.219.338.219.531 0 .587-.537.75-.75.75-.192 0-.384-.073-.531-.22zm-5.461-13.53c-3.868 0-7.007 3.14-7.007 7.007s3.139 7.007 7.007 7.007c3.866 0 7.007-3.14 7.007-7.007s-3.141-7.007-7.007-7.007z"
                fill-rule="nonzero" />
        </svg>


        <input placeholder="Search for photo" class="search-field" type="text" v-model="searchQuery"
            @keyup.enter="onSearch" />
    </div>

</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'SearchBar',
    emits: ['search'],
    setup(_, { emit }) {
        const searchQuery = ref('');

        const onSearch = () => {
            emit('search', searchQuery.value);
        };

        return {
            searchQuery,
            onSearch,
        };
    },
});
</script>



<style scoped>
.search {
    display: flex;
    align-items: center;
    background-color: #FFFFFF;
    width: 100%;
    padding: 20px;
    color: #222222;
    border: 0;
    border-radius: 10px;

    gap: 20px;
    position: relative;
    overflow: hidden;
}

.search-field {
    /* background-color: red; */
    flex: 1;
    position: absolute;
    width: 100%;
    height: 100%;
    outline: none;
    border: none;
    left: 0;
    padding-left: 80px;
    padding-right: 20px;
    font-size: 20px;
    line-height: 20px;
}

.search-icon {
    width: 24px;
    height: 24px;
    z-index: 2;
}
</style>