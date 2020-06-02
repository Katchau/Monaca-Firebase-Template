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
                    {{todo.title}}
                </b>
                <p>
                    {{todo.description}}
                </p>
                <span>
                    {{todo.dateCreated}}
                </span>
            </f7-list-item>
        </f7-list>
    </f7-page>
</template>

<script>
    export default {
        name: "Lists",
        data () {
            return {
                curImgURL: ["https://media0.giphy.com/media/IB9foBA4PVkKA/giphy.gif", "https://media3.giphy.com/media/KFhv3T1seYSJuak8TN/giphy.gif"],
                todoList: [
                    {
                        id: "idk23894239",
                        title: "Shopping List",
                        description: "I really need bananas, please dont forget them",
                        dateCreated: "01/06/2020"
                    },
                    {
                        id: "idk23894239",
                        title: "List of Missing Bugs",
                        description: "Animal crossing wiki is lame",
                        dateCreated: "01/06/2020"
                    }
                ]
            }
        }
    }
</script>

<style scoped>

</style>
