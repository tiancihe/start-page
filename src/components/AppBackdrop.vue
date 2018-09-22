<template>
    <div class="backdrop" :style="computedStyle">
        <div class="image-info">
            {{ this.image.description }}
            <a class="attribution" :href="this.image.html" target="_blank">
                By {{ this.image.author }} / Unsplash
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: "AppBackdrop",
    props: { image: Object },
    computed: {
        computedStyle() {
            return {
                "background-image": `url("${this.image.url || ''}")`
            };
        }
    }
};
</script>
  
<style scoped>
.backdrop {
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -100;
}

.image-info {
    display: block;
    font-size: 1rem;
    color: white;
    position: absolute;
    top: 1rem;
    left: 1rem;
}

.attribution {
    display: block;
    font-size: 0.6rem;
    text-decoration: none;
    color: white;
}
</style>