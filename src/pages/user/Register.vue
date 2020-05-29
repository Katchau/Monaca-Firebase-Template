<template>
    <!-- Register Screen -->
    <!-- You could also use the f7 popup. Everything is the same, just need to change the name    -->
    <f7-login-screen id="register-screen">
        <f7-page login-screen>
            <f7-login-screen-title>Register</f7-login-screen-title>
            <f7-list form>
                <f7-list-item>
                    <f7-label>Username</f7-label>
                    <f7-input name="username" placeholder="Your new Username" type="text" />
                </f7-list-item>
                <f7-list-item>
                    <f7-label>Password</f7-label>
                    <f7-input name="password" type="password" placeholder="Password" />
                </f7-list-item>
                <f7-list-item>
                    <f7-label>Password Confirmation</f7-label>
                    <f7-input name="password" type="password" placeholder="Please introduce your password again" />
                </f7-list-item>
            </f7-list>
            <f7-list>
                <f7-list-button title="Continue" />
            </f7-list>
            <f7-list>
                <f7-list-button title="Homepage" login-screen-close />
                <f7-block-footer>
                    <p>Return back to the Landing page</p>
                </f7-block-footer>
            </f7-list>
        </f7-page>
    </f7-login-screen>
</template>

<script>
    export default {
        name: "Register"
    }
</script>

<style scoped>

</style>
