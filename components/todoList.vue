<template>
<div>
        <div v-if="loadData === null" class="p-8 hover:shadow-xl max-w-sm rounded overflow-hidden shadow-lg">
            <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2">Whew! a fresh start!</div>
                    <p class="text-gray-700 text-base">
                    Wanna add some task?
                    </p>
                </div>
            <div class="px-6 py-4">
            <button @click="addFlag" class="btn-floating btn-large waves-effect waves-light purple darken-4" to="/addTodos"><i class="material-icons">add</i></button>
            </div>
        </div>

    <div :key="todo.sequence" v-for="todo in loadData">
        <div class="hover:shadow-xl w-auto rounded overflow-hidden shadow-lg p-20" :id="todo.sequence">
            <transition name="fade">
                <p v-if="multiDel === true" class="float-left">
                  <label>
                    <input :id="todo.sequence" @click="registerDelData(todo.sequence)" class="filled-in" type="checkbox"/>
                    <span></span>
                  </label>
                </p>
            </transition>
            <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2">{{ todo.title }}</div>
                    <p class="text-gray-700 text-base">
                    {{ todo.description }}
                    </p>
                </div>
            <transition name="fade">
            <div v-if="multiDel === false" class="px-6 py-4">
            <button @click="editFlag(todo.sequence, todo.title, todo.description)" class="focus:outline-none bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full" to="/addTodos">Edit</button>
            <button @click="deleteAlert(todo.sequence)"  class="focus:outline-none bg-purple-900 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-full">Delete</button>
            </div>
            </transition>
        </div>
        <br>
    </div>
        <transition name="fade">
          <div v-if="multiDel === true  && loadData !== null" class="btnContainer">
        <button @click="multipleDelete" class="focus:outline-none btn-floating btn-large waves-effect waves-light purple darken-2" type="button">
          <i class="material-icons">delete</i>
          </button>
          </div>
    </transition>

     <transition name="fade">
    <div v-if="multiDel === false && loadData !== null" class="btnContainer">
    <button  v-if="loadData !== null" @click="addFlag" class="focus:outline-none btn-floating btn-large waves-effect waves-light purple darken-2" to="/addTodos"><i class="material-icons">add</i></button>
    </div>
     </transition>
</div>
</template>

<script>
export default {
  /**
   * This is the middleware used in this component
   */
  middleware: 'saveStateSetter',
  /**
   * This is the name of this component
   */
  name: 'todoList',
  /**
   * This are the computed values to be used in this component
   * @returns loadData array
   * @returns multiDel string
   */
  computed: {
    loadData() {
      let todoObj = this.$store.getters.getTodos;
      if(typeof todoObj[0] === 'undefined') {
        return null;
      }
      return this.$store.getters.getTodos;
    },
    multiDel() {
      return this.$store.getters.getDelState;
    }
  },
  /**
   * These are the methods used in this component
   */
  methods: {

    /**
     * This method loads all the todos from the store
     * requested to the API.
     */
     loadTodos() {
       this.$store.dispatch('loadTodos');
    },
    /**
     * This method prompts confirmation to the user
     * before deleting a specific todo data
     */
    deleteAlert(iTodoSeq) {
      const mParent = this;
        new duDialog(null, 'Are you sure to delete this to-do?', duDialog.OK_CANCEL, { okText: 'Delete',
            callbacks: {
                okClick() {
                  mParent.$store.dispatch('deleteTodoData', iTodoSeq);
                     new duDialog('Succesfully Deleted','Your to-do was successfully deleted!');
                     this.hide();
                }
            }
        });
    },
    /**
     * This method prompts confirmation to the user
     * before deleting multiple todo data
     */
     multipleDelete() {
        if(typeof this.$store.getters.getDelArray[0] === 'undefined') {
            return false;
        }
        else {
          const mParent = this;
          new duDialog(null, 'Are you sure to delete these to-dos?', duDialog.OK_CANCEL, { okText: 'Proceed',
              callbacks: {
                  okClick() {
                      mParent.$store.dispatch('multipleDelete');
                      new duDialog('Succesfully Deleted','Your to-dos was successfully deleted!');
                      this.hide();
                  }
              }
          });
        }

    },
    /**
     * This method registers the sequence of the todo
     * to be deleted in the delArray state in the store.
     */
    registerDelData(iTodoSeq) {
          this.$store.dispatch('checkDelArray', iTodoSeq);
    },
    /**
     * This sets the save flag to 'edit' and
     * stashes the data of the todo to be edited
     * in the editData in the store.
     */
    editFlag(iSeq, sTitle, sDesc) {
      let objParam = {
        sequence: iSeq,
        title: sTitle,
        description: sDesc
      }
      
         this.$store.dispatch('stashEditData', objParam);
         this.$store.dispatch('modifySaveFlag', 'edit');
          this.$router.push({
            path: '/addTodos'
          });
    },
    /**
     * This sets the save flag to 'add' in the store
     */
    addFlag() {
       this.$store.dispatch('stashEditData', '');
         this.$store.dispatch('modifySaveFlag', 'add');
          this.$router.push({
            path: '/addTodos'
          });
    }
  }
};
</script>

<style scoped>

.btnContainer {
   box-shadow: 0px 0px 10px -3px black;
   border-radius: 50%;
   position: fixed;
   right: 30px;
   bottom: 30px;
}
</style>
