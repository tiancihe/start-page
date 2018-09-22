<template>
    <div id="app">
        <transition name="fade">
            <AppBackdrop v-if="showBackdrop" :image="backdropImage"/>
        </transition>
        <transition name="fade">
            <router-view id="router-view"/>
        </transition>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { getToday } from "@/util";
import AppBackdrop from "@/components/AppBackdrop.vue";

export default {
    name: "App",
    components: { AppBackdrop },
    computed: mapState(["backdropImage", "showBackdrop"]),
    created() {
        // when the app is created, check if it is still in today, this is to make sure one request per day by default
        const today = getToday();
        const dateCache = localStorage.getItem("today");
        // either dateCache is not true (null) or not equal to today, make request
        if(!dateCache || dateCache !== today) {
            this.$store.dispatch("fetchRandomImage");
            // store date info
            localStorage.setItem("today", getToday());
        } else {
            // get data from the cache (localStorage)
            const imageCache = JSON.parse(localStorage.getItem("imageCache"));
            this.$store.commit("setBackdropImage", imageCache);

            // get today's focus from localStorage, if not exsits, make it empty
            this.$store.commit("setFocus", localStorage.getItem("focus"));
        }
    }
};
</script>