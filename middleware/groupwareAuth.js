/**
 * This is the middleware that checks whether
 * there is an existing cookie registered on the store.
 * @param { store, redirect} 
 */
export default function({ store, redirect }) {
    if (store.getters.getLoginState === false || typeof store.getters.getLoginState === 'undefined') {
        return redirect('/login');
    }
}
