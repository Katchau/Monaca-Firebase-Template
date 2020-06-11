<template>
    <!-- Register Screen -->
    <!-- You could also use the f7 popup. Everything is the same, just need to change the name    -->
    <f7-login-screen id="register-screen" ref="reg">
        <f7-page login-screen>
            <f7-login-screen-title>Register</f7-login-screen-title>
            <h3 v-if="errorMsg" class="red-text">{{errorMsg}}</h3>
            <f7-list-button class="close-register hidden" href="/main/" title="Continue" login-screen-close></f7-list-button>
            <f7-list form>
                <f7-list-item>
                    <f7-input
                            label="Username"
                            name="username"
                            placeholder="Your new Username"
                            type="text"
                            required
                    />
                </f7-list-item>
                <f7-list-item>
                    <f7-input
                            label="Email"
                            name="email"
                            placeholder="Your Email Address"
                            type="text"
                            required
                    />
                </f7-list-item>
                <f7-list-item>
                    <f7-input
                            label="Password"
                            name="password"
                            type="password"
                            placeholder="Password"
                            required
                    />
                </f7-list-item>
                <f7-list-item>
                    <f7-input
                            label="Password Confirmation"
                            name="passwordconf"
                            type="password"
                            placeholder="Please introduce your password again"
                    />
                </f7-list-item>
            </f7-list>
            <f7-list>
                <f7-list-button @click="register()" title="Sign In"/>
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
        data () {
            return {
                errorMsg: ''
            }
        },
        methods: {
            register() {
                this.errorMsg = '';
                let self = this;
                let username = this.$$('#register-screen [name="username"]').val();
                let email = this.$$('#register-screen [name="email"]').val();
                let password = this.$$('#register-screen [name="password"]').val();
                let password2 = this.$$('#register-screen [name="passwordconf"]').val();

                if (password !== password2) {
                    this.errorMsg = 'Passwords do not match! Please try again';
                    return false;
                }

                if (!username || !email || !password) {
                    this.errorMsg = 'Please fill in the missing input fields';
                    return false;
                }

                fb.auth.createUserWithEmailAndPassword(email, password)
                    .then(function (answer) {
                        return answer.user.updateProfile({
                            displayName: username
                        }).then(function () {
                            self.$$('.close-register a').click();
                        })
                    })
                    .catch(function(error) {
                        // Handle Errors here.
                        self.errorMsg = error.message;
                    });
                // app.dialog.alert('Username: ' + username + '<br>Password: ' + password);
            }
        }
    }
</script>

<style scoped>

</style>
