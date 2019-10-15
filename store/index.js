/**
 * This is the STORE, the TASKS state management.
 * this file contains:
 * STATE, MUTATIONS, GETTERS and ACTIONS.
 */

 /**
  * This are the state
  */
export const state = () => ({
    todos: '',
    delState: false,
    delArray: [],
    saveFlag: '',
    editData: 'add',
    groupwareAuth: 'false'
})


/**
 * This are the mutations of the
 * state above manipulated 
 * using commits.
 */
export const mutations = {
    loadTodos(state, aData) {
        state.todos = aData;
    },
    setDelState(state, bData) {
        state.delState = bData;
    },
    clearDelArray(state) {
        state.delArray = [];
    },
    popDelArray(state, mData) {
        state.delArray.splice(state.delArray.indexOf(mData), 1);
    },
    pushDelArray(state, mData) {
        state.delArray.push(mData);
    },
    modifySaveFlag(state, sFlag) {
        state.saveFlag = sFlag;
    },
    stashEditData(state, oObjectParam) {
        state.editData = oObjectParam;
    },
    setLoginState(state, bData) {
        state.groupwareAuth = bData;
    }
}

/**
 * These are the getters used to get
 * state values above
 */
export const getters = {
    getTodos(state) {
        return state.todos;
    },
    getDelState(state) {
        return state.delState;
    },
    getDelArray(state) {
        return state.delArray;
    },
    getSaveFlag(state) {
        return state.saveFlag;
    },
    getEditTitle(state) {
        return state.editData.title;
    },
    getEditDesc(state) {
        return state.editData.description;
    },
    getEditSeq(state) {
        return state.sequence;
    },
    getLoginState(state) {
        return state.groupwareAuth;
    }
}

/**
 * These are the actions, or functions 
 * that contains the store's logic.
 */
export const actions = {

    /**
     * This method requests all of the todo data
     * from the API.
     * @param { context } context 
     */
    async nuxtServerInit(context) {
        const aData = await this.$axios.$get('http://127.0.0.1:8080/api/todo/');
        const aLoginResult = this.$cookies.get('loginState');
        context.commit('setLoginState', aLoginResult);
        context.commit('loadTodos', aData);
    },

    /**
     * This method delete's data by sending delete
     * requests from the API.
     * @param { context } context 
     * @param { iTodoSeq } iTodoSeq 
     */
    async deleteTodoData(context, iTodoSeq) {
        await this.$axios.$delete('http://127.0.0.1:8080/api/todo/' + iTodoSeq);
        const aData = await this.$axios.$get('http://127.0.0.1:8080/api/todo/');
        context.commit('loadTodos', aData);
    },

    /**
     * This sets the deleteState value 
     * in the store's state above.
     * @param { context } context 
     */
    setDelState(context) {
        context.commit('clearDelArray');
        if (this.state.delState === false) {
            context.commit('setDelState', true);
            return;
        }
        context.commit('setDelState', false);
        return;
    },

    /**
     * This pushes or pops a specific todo sequence
     * in the deleteArray state above.
     * @param { context } context 
     * @param { iTodoSeq } iTodoSeq 
     */
    checkDelArray(context, iTodoSeq) {
        let aDelArray = this.state.delArray;
        if (aDelArray.includes(iTodoSeq) === true) {
            context.commit('popDelArray', iTodoSeq);
        } else {
            context.commit('pushDelArray', iTodoSeq);
        }
    },

    /**
     * This deletes multiple data by requesting a
     * mulitple delete from the API.
     * @param { context } context 
     */
    async multipleDelete(context) {
        await this.$axios({
            method: 'post',
            url: 'http://127.0.0.1:8080/api/todo/delete',
            data: this.state.delArray
        });
        const aData = await this.$axios.$get('http://127.0.0.1:8080/api/todo/');
        context.commit('loadTodos', aData);
        context.commit('clearDelArray');
    },

    /**
     * This decides whether to edit or add a todo data
     * depending on the saveFlag indicated.
     * @param { context } context 
     * @param { oParams } oParams 
     */
    async addOrEditTodo(context, oParams) {
        if (oParams.sFlag === 'Add') {
            await this.$axios({
                method: 'post',
                url: 'http://127.0.0.1:8080/api/todo',
                data: {
                    'title': oParams.title,
                    'description': oParams.desc
                }
            });
            this.dispatch('redirectToMain');
        } else if (oParams.sFlag === 'Edit') {
            await this.$axios({
                method: 'put',
                header: { 'content-Type': 'application/json' },
                url: 'http://127.0.0.1:8080/api/todo',
                data: {
                    'sequence': this.state.editData.sequence,
                    'title': oParams.title,
                    'description': oParams.desc
                }
            });
            this.dispatch('redirectToMain');
        }
        this.dispatch('modifySaveFlag', '');
        const aData = await this.$axios.$get('http://127.0.0.1:8080/api/todo/');
        context.commit('loadTodos', aData);
    },

    /**
     * This redirects us to the main todo list page
     * @param { context } context 
     */
    redirectToMain(context) {
        this.$router.push({
            path: '/'
        })
    },

    /**
     * This modifies the save flag state above
     * @param { context } context 
     * @param { sFlag } sFlag 
     */
    modifySaveFlag(context, sFlag) {
        context.commit('modifySaveFlag', sFlag);
    },


    /**
     * This registers the edit data to the editData
     * state above.
     * @param { context } context 
     * @param { oObjectParam } oObjectParam 
     */
    stashEditData(context, oObjectParam) {
        context.commit('stashEditData', oObjectParam);
    }

}
