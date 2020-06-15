<template>
    <!-- Login Screen -->
    <f7-login-screen id="login-screen" ref="log">
        <f7-page login-screen>
            <f7-login-screen-title>Login</f7-login-screen-title>
            <h3 v-if="errorMsg" class="red-text">{{errorMsg}}</h3>
            <f7-list-button class="close-login hidden" title="Continue" login-screen-close></f7-list-button>
            <f7-list form>
                <f7-list-input
                        label="Email"
                        name="email"
                        placeholder="Email"
                        type="email"
                />
                <f7-list-input
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="Password"
                />
            </f7-list>
            <f7-list>
                <f7-list-button @click="login()" title="Sign In"></f7-list-button>
            </f7-list>
            <f7-list>
                <f7-list-button title="Homepage" login-screen-close></f7-list-button>
                <f7-block-footer>
                    <p>Return back to the Landing page</p>
                </f7-block-footer>
            </f7-list>
        </f7-page>
    </f7-login-screen>
</template>

<script>
    const fb  = require('@/firebaseConfig');
    export default {
        name: "LogIn",

        data() {
            return {
                errorMsg: ''
            }
        },

        methods: {
            penis() {
                this.$refs.penis.link.click();
            },
            login() {
                this.errorMsg = '';
                let self = this;
                let email = this.$$('#login-screen [name="email"]').val();
                let password = this.$$('#login-screen [name="password"]').val();

                if (!email || !password) {
                    this.errorMsg = 'Please fill in the missing input fields';
                    return false;
                }

                fb.auth.signInWithEmailAndPassword(email, password)
                    .then(function (answer) {
                        console.log(answer);
                        self.$$('#login-screen .close-login a').click();
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
