<template>
  <div>
    <TodoList :todos="todos" @delete-todo="deleteTodo"/>
    <transition name="scale-x">
      <input
        class="input input-todo"
        type="text"
        v-show="inputing"
        v-model="newTodo"
        ref="inputTodo"
        @keyup.enter="addTodo"
      >
    </transition>
    <button class="btn btn-add btn-ripple" @click="toggleNewTodo">+</button>
  </div>  
</template>

<script>
import TodoList from "./TodoList.vue";

export default {
  name: "TodoApp",
  components: { TodoList },
  data() {
    return {
      todos: [],
      inputing: false,
      newTodo: ""
    };
  },
  methods: {
    toggleNewTodo() {
      this.inputing = !this.inputing;
      setTimeout(() => this.$refs.inputTodo.focus(), 250);
    },
    addTodo() {
      this.todos.push(this.newTodo);
      this.newTodo = "";
      this.$refs.inputTodo.blur();
      this.toggleNewTodo();
    },
    deleteTodo(index) {
      this.todos.splice(index, 1);
    }
  }
}
</script>
  
<style scoped>
.input-todo {
  display: inline-block;
  min-width: 10rem;
  font-size: 2rem;
}

.btn-add {
  box-sizing: border-box;
  width: 3rem;
  height: 3rem;
  padding: 0.5rem;
  border: 2px solid white;
  border-radius: 50%;
  line-height: 2rem;
  font-size: 2rem;
  cursor: pointer;
  float: right;
}

.scale-x-enter-active { animation: scale-x 0.25s ease-out forwards ; }
.scale-x-leave-active { animation: scale-x 0.25s ease-out forwards reverse; }

@keyframes scale-x {
  from { transform-origin: center; transform: scaleX(0); }
  to { transform-origin: center; transform: scaleX(1); }
}
</style>