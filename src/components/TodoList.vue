<template>
    <transition-group
      class="ul"
      tag="ul"
      name="smooth-list"
    >
      <li
        class="todo-item"
        v-for="(todo, index) in todos"
        :key="index"
        @click="$emit('delete-todo', index)"
      >
        {{ todo }}
      </li>
    </transition-group>
</template>

<script>
export default {
  name: "TodoList",
  props: { todos: Array }
}
</script>
  
<style scoped>
.todo-item {
  display: block;
  height: 3rem;
  background-color: transparent;
  line-height: 3rem;
  font-size: 2rem;
  text-align: end;
  color: white;
  cursor: pointer;
}

.smooth-list-enter-active { transition: transform 1s ease-out; }
.smooth-list-enter { transform: translateY(100%); }
.smooth-list-leave-active { transition: transform 1s ease-in; transform-origin: right; position: absolute; z-index: -1; }
.smooth-list-leave-to { transform: translateX(100%); }
.smooth-list-move { transition: transform 1s ease-in; }
</style>