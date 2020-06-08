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
            let self = this;
            this.todoList = [];
            this.curImgURL = [];
            let listQuery = this.getDbCollection;

            let updateList = function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    self.todoList.push(doc.data());
                    self.curImgURL.push(doc.data().imgURL)
                });
            };

            listQuery.get()
                .then(updateList)
                .catch(function(error) {
                    console.log("Error getting documents: ", error);
                });
        }
    }
</script>

<style scoped>

</style>
