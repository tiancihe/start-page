<template>
    <form
        class="form"
        @submit.prevent="handleSubmit">
        <div class="greeting">
            Hi, How may i address you?
        </div>
        <input
            class="input name"
            type="text"
            v-model="name">
    </form>
</template>

<script>
import { mapState } from "vuex";

export default {
    data() {
        return { name: "" };
    },
    computed: mapState(["userName"]),
    methods: {
        handleSubmit() {
            this.$store.commit("setUserName", this.name);
            // cache the user name in localStorage
            localStorage.setItem("userName", this.name);
            // go to the main view
            this.$router.push("/");
        }
    },
    created() {
        this.name = this.userName;
    }
};
</script>
  
<style scoped>
.greeting {
    margin-bottom: 4rem;
    font-size: 4rem;
    font-weight: 500;
}

.name {
    margin: 0 auto;
    font-size: 2.5rem;
    font-weight: 400;
}
</style>