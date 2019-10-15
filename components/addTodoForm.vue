<template>
<div  class="flex justify-center items-center w-full h-screen p-10">
  <div class="container" @load="setLength()">
  <div class="bg-white shadow-lg rounded px-8 pb-8">
      <h1 v-if="saveFlag === 'add'" class="font-bold text-3xl mb-2">Add a Task</h1>
      <h1 v-if="saveFlag === 'edit'" class="font-bold text-3xl mb-2">Edit a Task</h1>
      <br>
      <br>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2 float-left" for="username">
        To-do Title
      </label>
      <input :value="editTitle" ref="titleInput" @input="setLength()" maxlength="20" autocomplete="off" class="text-center shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="Your To-do title here...">
      <label ref="titleLabel">characters remaining: 20/20</label>
    </div>
    <div class="mb-6">
        <br>
      <label class="block text-gray-700 text-sm font-bold mb-2 float-left" for="password">
        To-do description
      </label>
      <textarea :value="editDesc" ref="descInput"  @input="setLength()" maxlength="50" class="text-center resize-none shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="description" placeholder="To-do description here..."></textarea>
      <label  ref="descLabel">characters remaining: 50/50</label>
    </div>
    <div class="flex justify-between flex-wrap">
        <div>
     <button @click="dialogCaller('Are you sure to go cancel the operation?', 'Go back', 'Success!', 'Success!' , backToMain)" class="focus:outline-none mx-3 shadow sm:shadow-md md:shadow-lg lg:shadow-xl xl:shadow-2xl btn-floating btn-small waves-effect waves-light purple darken-4" type="button">
       <i class="material-icons">clear</i>
      </button>

     <button v-if="saveFlag === 'add'" @click="dialogCaller('Are you sure to reset fields?', 'Reset', 'Succesfully Reset fields!', 'Successfully Cleared all fields!' , resetFields)" class="focus:outline-none mx-3  shadow sm:shadow-md md:shadow-lg lg:shadow-xl xl:shadow-2xl btn-floating btn-small waves-effect waves-light deep-purple darken-4" type="button">
       <i class="material-icons">autorenew</i>
      </button>
      
      <button v-if="saveFlag === 'edit'" @click="dialogCaller('Are you sure to reset fields?', 'Reset', 'Succesfully Reset fields!', 'Successfully Cleared all fields!' , resetFields, 'edit')" class="focus:outline-none mx-3  shadow sm:shadow-md md:shadow-lg lg:shadow-xl xl:shadow-2xl btn-floating btn-small waves-effect waves-light deep-purple darken-4" type="button">
       <i class="material-icons">autorenew</i>
      </button>
      </div>

      <button v-if="saveFlag === 'add'" @click="dialogCaller('Are you sure to add To-do data?', 'Add', 'Succesfully Saved!', 'Successfully Added To-do Data!' , checkTodo, 'Add')" class="focus:outline-none float-right shadow sm:shadow-md md:shadow-lg lg:shadow-xl xl:shadow-2xl btn-floating btn-large waves-effect waves-light purple darken-2" type="button">
       <i class="material-icons">add</i>
      </button>

      <button ref="seqButton" :id="editSeq" v-if="saveFlag === 'edit'" @click="dialogCaller('Are you sure to update To-do data?', 'Update', 'Succesfully updated!', 'Successfully Updated To-do Data!' , checkTodo, 'Edit')" class="focus:outline-none float-right shadow sm:shadow-md md:shadow-lg lg:shadow-xl xl:shadow-2xl btn-floating btn-large waves-effect waves-light purple darken-2" type="button">
      <i class="material-icons">edit</i>
      </button>
    </div>
  </div>
  </div>
  </div>
</template>

<script>
export default { 
  
  /** 
   * This is the middleware for setting this component as
   * default add to-do component
  */
  middleware: 'saveStateSetter',
  name: 'addTodoForm',
  /**
   * There are the computed properties for this
   * component
   */
  computed: {
    /**
     * Save Flag determines what type of form
     * this component would be: add or edit form.
     * @returns string
     */
    saveFlag() {
      return this.$store.getters.getSaveFlag;
    },
    /**
     * Edit Title gets the stashed title to be
     * edited from the store.
     * @returns string
     */
    editTitle() {
      return this.$store.getters.getEditTitle;
    },
    /**
     * Edit Title gets the stashed description to be
     * edited from the store.
     * @returns string
     */
    editDesc() {
      return this.$store.getters.getEditDesc;
    },
    /**
     * Edit Title gets the stashed sequence to be
     * edited from the store.
     * @returns integer
     */
    editSeq() {
      return this.$store.getters.getEditSeq;
    }
  },
  /**
   * This sets the length value of the edit data
   * next to the number counter of each field.
  */
  mounted() {
    this.setLength();
  },
  /**
   * These are the methods used to make this form
   * functional to the whole system.
  */
  methods: {
  /**
   * This sets the length value of the edit data
   * next to the number counter of each field.
  */
    setLength() {
      let iCharTitleCount = this.$refs.titleInput.value.length;
      let iTitleCount = 20;
      let iCharDescCount = this.$refs.descInput.value.length;
      let iDescCount = 50;
      let iCharTitleRemaining = iTitleCount - iCharTitleCount;
      let iCharDescRemaining = iDescCount - iCharDescCount;
        this.$refs.titleLabel.innerHTML =
          'characters remaining: ' + iCharTitleRemaining + ' / 20';
        this.$refs.descLabel.innerHTML =
          'characters remaining: ' + iCharDescRemaining + ' / 50';
    },
    /**
     * This checks the validity of the fields
     * to be saved as a to-do, and also trims 
     * the value's trailing white spaces.
     * @param sExecFlag string
     * @returns boolean
     */
    checkTodo(sExecFlag) {
      let sTrimmedTitleValue = this.$refs.titleInput.value.trim();
      let sTrimmedDescValue = this.$refs.descInput.value.trim();
      let iSequence = '';
      if (sExecFlag === 'Edit') {
        iSequence = this.$refs.seqButton.id;
      }
      if (sTrimmedTitleValue === '') {
        new duDialog(
          'Title cannot be empty',
          'The to-do title cannot be empty'
        );
        return false;
      } else if (sTrimmedDescValue === '') {
        new duDialog(
          'Description cannot be empty',
          'The to-do description cannot be empty'
        );
        return false;
      } else {
        let objParam = {
          sFlag: sExecFlag,
          iSeq: iSequence,
          title: sTrimmedTitleValue,
          desc: sTrimmedDescValue
        };
        return this.checkTitleSpecialChars(objParam);
      }
    },
    /**
     * This brings back the fields' data to blank if
     * the mode is add todo and recent data if the mode is 
     * edit todo.
     * @params sExecFlag string default = 'add'
     */
    resetFields(sExecFlag = 'add') {
        let sTitle = this.$store.getters.getEditTitle;
        let sDesc = this.$store.getters.getEditDesc;
        if(sExecFlag === 'add'){
            this.$refs.titleInput.value = '';
            this.$refs.titleLabel.innerHTML = 'characters remaining: 20 / 20';
            this.$refs.descInput.value = '';
            this.$refs.descLabel.innerHTML = 'characters remaining: 50 / 50';
            return;
        }
         this.$refs.titleInput.value = sTitle;
         this.$refs.descInput.value = sDesc;
         this.setLength();
    },
    /**
     * This redirects us to our main page.
     */
    backToMain() {
      this.$store.dispatch('modifySaveFlag', '');
      this.$router.push({
        path: '/'
      });
    },
    /**
     * This is a reusable function capable
     * of displaying an alerr with or without
     * the whole application
     * @params sMessage string
     * @params sConfirmText string
     * @params sSuccess string
     * @params sSuccessSub string
     * @params fCallBack function
     * @params sExecFlag string
     * @returns boolean
     */
    dialogCaller(
      sMessage,
      sConfirmText,
      sSuccess,
      sSuccessSub,
      fCallBack,
      sExecFlag
    ) {
      new duDialog(null, sMessage, duDialog.OK_CANCEL, {
        okText: sConfirmText,
        callbacks: {
          okClick() {
            let bResult = fCallBack(sExecFlag);
            if (bResult === true) {
              new duDialog(sSuccess, sSuccessSub);
            }
            this.hide();
          }
        }
      });
    },
    /**
     * This checks if the todo's title has the same existing
     * title in the list
     * @params oParams object
     * @returns boolean
     */
    checkTitleAmbiguity(oParams) {
      let aTodos = this.$store.getters.getTodos;
      let sEditData = this.checkSaveType(oParams);
      let aExisting = [];
      aTodos.forEach(element => {
        if (element.title.toLowerCase() !== sEditData.toLowerCase())
          aExisting.push(element.title.toLowerCase());
      });
      if (aExisting.includes(oParams.title.toLowerCase())) {
        new duDialog('Title already exists', 'Please think of a unique title');
        return false;
      } else {
        this.$store.dispatch('addOrEditTodo', oParams);
        return true;
      }
    },
    /**
     * This checks the save type if add or delete.
     * @params oParams object
     * @returns string
     */
    checkSaveType(oParams) {
      if (oParams.sFlag === 'Add') {
        return oParams.title;
      }
      return this.$store.getters.getEditTitle;
    },

    /**
     * this check if there are any special characters
     * in the title part of the todo.
     * @params oParams object
     * @returns boolean
     */
    checkTitleSpecialChars(oParams) {
      const rRegExSpecialChars = /[!@#$%^&*()_+\-=\[\]{};':'\\|,.<>\/?]/;
      let bRexExResult = rRegExSpecialChars.test(oParams.title);
      if (bRexExResult === true) {
        new duDialog(
          'Invalid To-do Title, Hey',
          'Title must not contain any special characters'
        );
        return false;
      }
      return this.checkTitleAmbiguity(oParams);
    }
  }
};
</script>
