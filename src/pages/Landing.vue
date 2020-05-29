<template>
    <f7-page>
        <f7-toolbar>
            <f7-link>Left Link</f7-link>
            <f7-link>Right Link</f7-link>
        </f7-toolbar>
        <f7-block strong>
            <p>Here is your blank Framework7 app. Let's see what we have here.</p>
        </f7-block>
        <f7-block-title>Navigation</f7-block-title>
        <f7-block-title>Modals</f7-block-title>
        <f7-block strong>
            <f7-row>
                <f7-col width="50">
                    <f7-button fill raised popup-open="#popup">Popup</f7-button>
                </f7-col>
                <f7-col width="50">
                    <f7-button fill raised login-screen-open="#login-screen">Login Screen</f7-button>
                </f7-col>
            </f7-row>
        </f7-block>
        <f7-block-title>Panels</f7-block-title>
        <f7-block strong>
            <f7-row>
                <f7-col width="50">
                    <f7-button fill raised panel-open="left">Left Panel</f7-button>
                </f7-col>
                <f7-col width="50">
                    <f7-button fill raised panel-open="right">Right Panel</f7-button>
                </f7-col>
            </f7-row>
        </f7-block>
    </f7-page>
</template>

<script>
    export default {}
</script>
