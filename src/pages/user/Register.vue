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
                    <f7-label>Email</f7-label>
                    <f7-input name="email" placeholder="Your Email Address" type="text" />
                </f7-list-item>
                <f7-list-item>
                    <f7-label>Password</f7-label>
                    <f7-input name="password" type="password" placeholder="Password" />
                </f7-list-item>
                <f7-list-item>
                    <f7-label>Password Confirmation</f7-label>
                    <f7-input name="passwordconf" type="password" placeholder="Please introduce your password again" />
                </f7-list-item>
            </f7-list>
            <f7-list>
                <f7-list-button @click="register()" title="Continue"/>
                <f7-list-button href="/main/" title="Continue" login-screen-close hidden/>
<!--                <f7-list-item link="/main" title="Continue"></f7-list-item>-->
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
    const fb = require('@/firebaseConfig.js');
    export default {
        name: "Register",
        methods: {
            register() {
                let username = this.$$('#register-screen [name="username"]').val();
                let email = this.$$('#register-screen [name="email"]').val();
                let password = this.$$('#register-screen [name="password"]').val();
                let password2 = this.$$('#register-screen [name="passwordconf"]').val();

                if (password !== password2) {
                    app.dialog.alert('Passwords do not match! Please try again');
                    return false;
                }

                if (!username || !email || !password) {
                    app.dialog.alert('Please fill in the missing input fields');
                    return false;
                }

                fb.auth.createUserWithEmailAndPassword(email, password)
                    .then(function (answer) {
                        console.log(answer)
                    })
                    .catch(function(error) {
                        // Handle Errors here.
                        console.log(error.message)
                    });
                // app.dialog.alert('Username: ' + username + '<br>Password: ' + password);
            }
        }
    }
</script>

<style scoped>

</style>
