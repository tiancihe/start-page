import Vue from "vue";
import Router from "vue-router";
import store from "@/store";
import Home from "@/views/Home.vue";
import Welcome from "@/views/Welcome.vue";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/welcome",
            name: "welcome",
            component: Welcome
        },
        {
            path: "/",
            name: "home",
            component: Home,
            beforeEnter(to, from, next) {
                if (!store.state.userName) {
                    next("/welcome");
                }
                next();
            }
        }
    ]
});
