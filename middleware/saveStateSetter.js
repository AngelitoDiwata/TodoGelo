/**
 * This is a middleware used to set addTodo page's
 * function to add todo default.
 * @param { store } param0 
 */
export default function({ store }) {
    if (store.getters.getSaveFlag === '') {
        store.dispatch('modifySaveFlag', 'add');
    }
}
