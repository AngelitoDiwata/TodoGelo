<template>
<div class="flex justify-center items-center w-full h-screen">
<div class="align-middle bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 sm:w-1/3 lg:w-1/4">
<div class="bg-purple-700 p-1 rounded-tl-full rounded-r-full m-10 shadow-md">
<h1 class="m-5 text-4xl font-bold text-white">TASKS<i class="material-icons text-4xl font-bold text-white">list_alt</i></h1>
</div>
       
           <div id="google-signin-button" ></div>
       
        </div>
        </div>
</div>
</template>

<script>
export default {
  /**
   * This is the name of this component
   */
  name: "login",
  /**
   * This is where the google api is initialized.
   */
  mounted() {
    gapi.signin2.render('google-signin-button', {
      onsuccess: this.onSignIn,
      width: 240,
      height: 50,
      longtitle: true,
      theme: 'dark'
    });
  },
  /**
   * These are the methods used in this component
   */
  methods: {
    /**
     * This is the method used to get data from
     * google authentication and to log in.
     */
    onSignIn (user) {
      let mParent = this;
      const profile = user.getBasicProfile();
      console.log(profile);
      new duDialog('WELCOME ' +  profile.ofa + '!', 'List your tasks here!', { okText: 'Proceed',
      callbacks: {
        okClick: function(){
      mParent.$cookies.set('loginState', true);
         window.location.replace('/');
      this.hide();
        }
      }
    }); 
      this.$cookies.set('loginState', true);
   
    }
  }
};
</script>
