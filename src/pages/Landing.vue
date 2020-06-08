<template>
    <f7-page>
        <f7-block-header class="landing-header">
            <h1>Firebase TODO Application</h1>
            <h3>A Monaca template using Framework7 with VueJS</h3>
        </f7-block-header>
        <f7-block strong id="landing-body">
            <f7-list>
                <f7-button fill raised login-screen-open="#register-screen">Register Screen</f7-button>
            </f7-list>
            <f7-list>
                <f7-button fill raised login-screen-open="#login-screen">Login Screen</f7-button>
            </f7-list>
        </f7-block>
        <f7-list-button class="closemain hidden" href="/main/"></f7-list-button>
    </f7-page>
</template>

<script>
    const fb = require('@/firebaseConfig');

    export default {
        mounted () {
            let self = this;
            fb.auth.onAuthStateChanged(user => {
                if (user) {
                    console.log(user);
                    // TODO try changing to the router navigator after update because that isnt working rn
                    self.$$('.closemain a').click();
                }
            })
        }
    }
</script>
