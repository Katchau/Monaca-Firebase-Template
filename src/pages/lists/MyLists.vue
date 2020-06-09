<template>
    <f7-page>
        <f7-list>
            <f7-photo-browser
                    :photos="curImgURL"
                    type="popup"
                    ref="popup"
            />
            <f7-list-item v-for="(todo, key) in todoList" :key="key" @click="$refs.popup.open(key)">
                <b>
                    {{todo.name}}
                </b>
                <p>
                    {{todo.description}}
                </p>
                <span>
                    {{todo.date}}
                </span>
            </f7-list-item>
        </f7-list>
    </f7-page>
</template>

<script>
    const fb = require('@/firebaseConfig.js');
    export default {
        name: "Lists",
        data () {
            return {
                curImgURL: [],
                todoList: []
            }
        },
        computed: {
            getDbCollection () {
                return fb.db.collection("todos").where("uid", "==", fb.auth.currentUser.uid);
            }
        },
        beforeMount () {
            // let meta1 = "img-src 'self' blob: ; default-src * data: gap: https://ssl.gstatic.com; style-src * 'unsafe-inline'; script-src * 'unsafe-inline' 'unsafe-eval'";
            // let meta2 = "img-src * ; default-src * 'self' data: gap: https://ssl.gstatic.com 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src *;"
            // this.$$('meta[http-equiv="Content-Security-Policy"]').attr('content', meta2);

            let self = this;
            this.todoList = [];
            this.curImgURL = [];
            let listQuery = this.getDbCollection;

            let updateList = function(querySnapshot) {
                let first = self.todoList.length === 0;
                querySnapshot.docChanges().forEach(function(change) {
                    if (change.type === "added" || first) {
                        self.todoList.push(change.doc.data());
                        self.curImgURL.push(change.doc.data().imgURL);
                    }
                });
            };

            listQuery.onSnapshot(updateList);
        }
    }
</script>

<style scoped>

</style>
