<template>
  <div>
    <div v-if="loginState === true" class="rounded-b-lg shadow-lg w-full sticky top-0 flex items-center justify-between flex-wrap bg-purple-900 p-4 z-40 h-20">
    <h1 @click="setSaveFlag" class="focus:outline-none"><nuxt-link class="mx-5 text-lg font-bold text-white focus:outline-none" to="/">TASKS<i class="material-icons">list_alt</i></nuxt-link></h1>
    
    <div>
     <label v-if="saveFlag === '' && todos !== null" class="mx-5">
          <input @click="setDelState"  type="checkbox" />
          <span class="text-white">Multi-Delete</span>
     </label>
        <button @click="logOut"  class="focus:outline-none bg-purple-700 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-full">Log out</button>
     </div>

    </div>
    <br>
    <nuxt />
  </div>
</template>
<script>
export default{
  /**
   * This initializes the google api
   */
    mounted(){
        gapi.load('auth2', function() {
          gapi.auth2.init();
        });
    },
    /**
     * This is the data to be used in this default component
     * @returns loginState bool
     */
    data(){
      if(this.$store.getters.getLoginState === false || typeof this.$store.getters.getLoginState === 'undefined'){
        return {
            loginState: false
        }
      }
      return {
          loginState: true
      }
    },
    /**
     * This are the methods to be used in this default component
     */
    methods: {
      /**
       * This method prompts a confirmation to the user
       * before logging out.
       */
      logOut(){
        let mParent = this;
        new duDialog('Log out', 'Are you sure you want to log-out?', duDialog.OK_CANCEL, {
          okText: 'Log out',
          callbacks: {
            okClick() {
              mParent.$cookies.set('loginState', false);
                var auth2 = window.gapi.auth2.getAuthInstance();
                auth2.signOut().then(function () {
                  window.location.replace('/login');
                });
              this.hide();
            }
          }
        });
       
      },
      /**
       * This sets the delete state value in the store to TRUE
       */
      setDelState() {
        this.$store.dispatch('setDelState');
      },
      /**
       * This sets the save flag state value in the
       * store to ''.
       */
      setSaveFlag(){
        this.$store.dispatch('modifySaveFlag', '');
      }
    },
    /**
     * These are the computed values to be used
     * in this default component
     */
     computed: {
      todos() {
          let todoObj = this.$store.getters.getTodos;
        if(typeof todoObj[0] === 'undefined') {
          return null;
        }
        return this.$store.getters.getTodos;
      },
      saveFlag() {
        return this.$store.getters.getSaveFlag;
      }
    }
  }
</script>
