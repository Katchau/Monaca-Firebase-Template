<template>
    <!-- Login Screen -->
    <f7-login-screen id="login-screen" ref="log">
        <f7-page login-screen>
            <f7-login-screen-title>Login</f7-login-screen-title>
            <h3 v-if="errorMsg" class="red-text">{{errorMsg}}</h3>
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
    const fb  = require('@/js/firebaseConfig');
    export default {
        name: "LogIn",

        data() {
            return {
                errorMsg: ''
            }
        },

        methods: {
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
                        self.$refs.log.close();
                    })
                    .catch(function(error) {
                        // Handle Errors here.
                        self.errorMsg = error.message;
                    });
            }
        }
    }
</script>

<style scoped>

</style>
