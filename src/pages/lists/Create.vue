<template>
    <f7-page>
        <f7-nav-title>
            New TODO list
        </f7-nav-title>
        <f7-list form>
            <f7-list-item>
                <f7-label>Name of your list</f7-label>
                <f7-input type="text" placeholder="My todo list Name"></f7-input>
            </f7-list-item>
            <f7-list-item>
                <f7-label>Description</f7-label>
                <f7-input type="textarea" placeholder="More information you wish to specify about the list" resizable></f7-input>
            </f7-list-item>
            <f7-list-button @click="takePhoto()">
                Take a photo of your list
            </f7-list-button>
        </f7-list>
    </f7-page>
</template>

<script>
    export default {
        name: "Create",
        data () {
            return {
                previewImg: ''
            }
        },
        methods: {
            takePhoto () {
                let successMethod = function (camera_url) {
                    this.previewImg = camera_url;
                };
                navigator.camera.getPicture(addTodo,
                    function() {
                        alert("Failed to get camera.");
                    }, {
                        quality : 50,
                        destinationType : Camera.DestinationType.FILE_URI,
                        targetWidth : 100,
                        targetHeight : 100
                    });
            }
        }
    }
</script>

<style scoped>

</style>
