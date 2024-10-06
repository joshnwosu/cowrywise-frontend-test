<template>
    <div class="skeleton-loader">
        <div class="skeleton-image"></div>
        <div class="skeleton-info">
            <div class="skeleton-line"></div>
            <div class="skeleton-line short"></div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.skeleton-loader {
    position: relative;
    display: grid;
    grid-template-rows: auto 1fr;
    background-color: #f6f6f6;
    border-radius: 10px;
    height: 300px;
    overflow: hidden;
    /* Prevents overflow if the lines animate out of bounds */
}

.skeleton-info {
    width: 100%;
    position: absolute;
    bottom: 0;
    padding: 20px;
}

.skeleton-line {
    height: 20px;
    width: 60%;
    background-color: #e7e7e7;
    margin-bottom: 10px;
    border-radius: 4px;
    animation: pulse 1.5s infinite;
    /* Add animation */
}

.skeleton-line.short {
    width: 30%;
}

/* Keyframes for the pulse animation */
@keyframes pulse {
    0% {
        background-color: #e7e7e7;
        /* Initial color */
    }

    50% {
        background-color: #d0d0d0;
        /* Color during the pulse */
    }

    100% {
        background-color: #e7e7e7;
        /* Return to initial color */
    }
}
</style>
