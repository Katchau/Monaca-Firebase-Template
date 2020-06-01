<template>
    <f7-page>
        <f7-navbar>
            <f7-nav-title>
                My TODO list
            </f7-nav-title>
            <f7-nav-right>
                <f7-link @click="$f7router.back()">
                    Log Out
                </f7-link>
            </f7-nav-right>
        </f7-navbar>
        <h2>
            List of current TODOs created!
        </h2>
        <f7-view id="my-lists-view" url="/lists/" my-lists></f7-view>
    </f7-page>
</template>

<script>
    export default {
        name: "Main"
    }
</script>

<style scoped>

</style>
