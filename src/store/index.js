import Vue from "vue";
import Vuex from "vuex";
import mutations from "./mutations";
import actions from "./actions";

Vue.use(Vuex);

const userName = localStorage.getItem("userName") || "";

const store = new Vuex.Store({
    state: {
        userName,
        focus: "",
        backdropImage: {},
        showBackdrop: false
    },
    mutations,
    actions
});

export default store;