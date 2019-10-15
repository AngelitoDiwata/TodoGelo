<template>
    <div class="container">
        <loginComponent/>
    </div>
</template>

<script>
/**
 * Imported loginComponent as a component for this page.
 */
import loginComponent from '~/components/login.vue';
export default{
    components: {
    loginComponent
    },
    /**
     * This is the middleware used for this page.
     */
    middleware: 'groupwareAuth',
}
</script>
