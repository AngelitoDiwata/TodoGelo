<template>
  <div class="container">
  <todoList/>
  </div>
</template>

<script>
/**
 * Imported todoList as a component for this page
 */
import todoList from '~/components/todoList.vue';
export default {
  components: {
    todoList
  },
  /**
   *This is the middleware used for this page
   */
  middleware: 'groupwareAuth'
};
</script>

<style>
</style>
