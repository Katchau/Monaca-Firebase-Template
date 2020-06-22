<template>
    <f7-page>
        <f7-list class="todo-lists">
            <f7-photo-browser
                    :photos="curImgURL"
                    type="popup"
                    ref="popup"
            />
            <f7-list-item v-for="(todo, key) in todoList" :key="key" @click="$refs.popup.open(key)">
                <div class="todo-info">
                    <b>
                        {{todo.name}}
                    </b>
                    <p>
                        {{todo.date}}
                    </p>
                </div>

                <p class="todo-description">
                    {{todo.description}}
                </p>
            </f7-list-item>
        </f7-list>
    </f7-page>
</template>

<script>
    const fb = require('@/js/firebaseConfig.js');
    export default {
        name: "Lists",
        data () {
            return {
                curImgURL: [],
                todoList: [],
                fbListener: null
            }
        },
        computed: {
            getDbCollection () {
                return fb.db.collection("todos").where("uid", "==", fb.auth.currentUser.uid);
            }
        },
        beforeMount () {
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

            this.fbListener = listQuery.onSnapshot(updateList,
                function(error) {
                    console.log('Error updating List ' + error.message)
                });
        }
    }
</script>

<style scoped>

</style>
