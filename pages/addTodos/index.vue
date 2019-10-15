<template>
  <div class="container">
      <addTodoForm/>
  </div>
</template>

<script>
/**
 * Imported the addTodoForm as a component for this page.
 */
import addTodoForm from '~/components/addTodoForm.vue';
export default {
  name: 'addTodos',
  components: {
    addTodoForm
  },
  /**
   * This are the middlewares used in this page.
   */
  middleware: ['groupwareAuth','saveStateSetter']
};
</script>
