<template>
    <f7-popup id="creation-page">
        <f7-page>
            <f7-navbar>
                <f7-nav-title>
                    New TODO
                </f7-nav-title>
                <f7-nav-right>
                    <f7-link popup-close>
                        Back
                    </f7-link>
                </f7-nav-right>
            </f7-navbar>
            <f7-list form>
                <f7-list-item>
                    <f7-label>Name of your list</f7-label>
                    <f7-input type="text" placeholder="My todo list Name"></f7-input>
                </f7-list-item>
                <f7-list-item>
                    <f7-label>Description</f7-label>
                    <f7-input type="textarea" placeholder="More information you wish to specify about the list" resizable></f7-input>
                </f7-list-item>
                <input type="file" ref="file" style="display: none" accept="image/*" @change="getPreviewImage">
                <f7-list-button @click="takePhoto()">
                    Take a photo of your list
                </f7-list-button>
                <img :src="previewImg" alt="" />
            </f7-list>
        </f7-page>
    </f7-popup>
</template>

<script>
    import Framework7 from "framework7";

    export default {
        name: "Create",
        data () {
            return {
                previewImg: ''
            }
        },
        methods: {
            takePhoto () {
                let app = new Framework7();
                // TODO this still needs testing but the online thingy isnt building up the project properly
                if (app.device.android || app.device.ios) {
                    let successMethod = function (camera_url) {
                        this.previewImg = camera_url;
                    };
                    navigator.camera.getPicture(successMethod,
                        function() {
                            alert("Failed to get camera.");
                        }, {
                            quality : 50,
                            destinationType : Camera.DestinationType.FILE_URI,
                            targetWidth : 100,
                            targetHeight : 100
                        });
                } else {
                    this.$refs.file.click();
                }
            },
            getPreviewImage(e) {
                const file = e.target.files[0];
                this.previewImg = URL.createObjectURL(file);
            }
        }
    }
</script>

<style scoped>

</style>
