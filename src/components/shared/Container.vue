<template>
    <div class="container">
        <slot></slot>
    </div>
</template>

<style scoped>
.container {
    position: relative;
    width: 1000px;
    margin: 70px auto 0;
    padding: 30px;
    z-index: 2;
}
</style>