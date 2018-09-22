<template>
    <form
        class="form"
        @submit.prevent="handleSubmit">
        <div class="time">{{ timeString }}</div>
        <div class="greeting">Good {{ period }}, {{ userName }}.</div>
        <transition name="fade">
            <div
                class="question"
                v-if="modifyFocus"
                key="question">
                What is your main focus for today?
                <input
                    class="input input-focus"
                    type="text"
                    v-model="focusInput"
                    ref="focusInput">
            </div>
            <div
                class="focus"
                v-else
                key="focus"
                @click="changeFocus">
                {{ focus }}
            </div>
        </transition>
    </form>
</template>

<script>
import { mapState } from 'vuex';
import { getTime } from "@/util";

export default {
    name: "FocusForm",
    data: () => ({
        time: {},
        focusInput: "",
        modifyFocus: true,
        interval: null
    }),
    computed: {
        ...mapState(["userName", "focus"]),
        timeString() {
            return `${this.time.hour}:${this.time.minute}`;
        },
        period() {
            const { hour } = this.time;
            if (hour >= 0 && hour <= 11) {
                return "morning";
            } else if (hour >=12 && hour <= 18 ) {
                return "afternoon";
            } else {
                return "evening";
            }
        }
    },
    methods: {
        setTime() {
            const temp = getTime();
            const hour = temp.getHours();
            const minute = temp.getMinutes() < 10 ? `0${temp.getMinutes()}` : temp.getMinutes();
            this.time = { hour, minute };
        },
        handleSubmit() {
            this.$store.commit("setFocus", this.focusInput);
            // cache the focus in localStorage
            localStorage.setItem("focus", this.focusInput);
            this.modifyFocus = false;
        },
        changeFocus() {
            // then user clicks the focus, go to modify mode
            this.modifyFocus = true;
        }
    },
    created() {
        if(this.focus) {
            // if the focus exists, go to display mode, and make the focusInput that value
            this.modifyFocus = false;
            this.focusInput = this.focus;
        }
        this.setTime();
        // update time every one minute
        this.interval = setInterval(this.setTime, 60000);
    },
    beforeDestroy() {
        // clear the timer
        clearInterval(this.interval);
    }
}
</script>
  
<style scoped>
.time { font-size: 8rem; }
.greeting { font-size: 4rem; }

.question {
    margin-top: 4rem;
    font-size: 2rem;
    font-weight: 300;
}

.input-focus {
    margin: 1rem auto 0 auto;
    font-size: 2rem;
    font-weight: 500;
}

.focus {
    margin-top: 4rem;
    font-size: 3rem;
    cursor: pointer;
}

.btn-del {
    line-height: 3rem;
    font-size: 2rem;
    opacity: 0;
    cursor: pointer;
    transition: opacity 0.5s;
}
</style>