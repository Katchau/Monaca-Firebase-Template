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
        <f7-block-header>
            List of TODOs created!
        </f7-block-header>
        <f7-block>
            <f7-view id="main-view" url="/lists/" lists></f7-view>
        </f7-block>
    </f7-page>
</template>

<script>
    export default {
        name: "Main"
    }
</script>

<style scoped>

</style>
