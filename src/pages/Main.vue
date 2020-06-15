<template>
    <f7-page id="main-menu">
        <f7-navbar>
            <f7-nav-title>
                {{username}}'s TODO lists
            </f7-nav-title>
            <f7-nav-right>
                <f7-link @click="logOut()">
                    Log Out
                </f7-link>
            </f7-nav-right>
        </f7-navbar>
        <h2>
            List of current TODOs created!
        </h2>
        <f7-button popup-open="#creation-page" class="add-button" fill round small>
            Add a new TODO list
        </f7-button>
        <f7-view id="my-lists-view" url="/lists/" my-lists></f7-view>
        <f7-view id="creation-page-view" url="/create/" creation-page hidden></f7-view>
    </f7-page>
</template>

<script>
    const fb = require('@/js/firebaseConfig.js');
    export default {
        name: "Main",

        props: ['displayName'],

        data () {
            return {
                username: fb.auth.currentUser.displayName || this.displayName
            }
        },

        methods: {
            logOut() {
                fb.auth.signOut();
                this.$f7router.back();
            }
        }
    }
</script>

<style scoped>

</style>
