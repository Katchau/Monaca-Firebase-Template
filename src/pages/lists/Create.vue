<template>
    <f7-popup id="creation-page" ref="cPopUp">
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
                    <f7-input name="list-name" type="text" placeholder="My todo list Name" required></f7-input>
                </f7-list-item>
                <f7-list-item>
                    <f7-label>Description</f7-label>
                    <f7-input name="description" type="textarea" placeholder="More information you wish to specify about the list" resizable></f7-input>
                </f7-list-item>
                <input type="file" ref="file" style="display: none" accept="image/*" @change="getPreviewImage">
                <f7-list-button @click="takePhoto()">
                    Take a photo of your list
                </f7-list-button>
                <img :src="previewImg" alt="" height="250px"/>
                <f7-button class="add-button" @click="submitForm()" small>
                    Submit
                </f7-button>
            </f7-list>
        </f7-page>
    </f7-popup>
</template>

<script>
    import Framework7 from "framework7";
    import firebase from "firebase"
    const fb = require('@/firebaseConfig.js');

    export default {
        name: "Create",

        data () {
            return {
                previewImg: '',
                imgFile: null
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
                            targetWidth : 420,
                            targetHeight : 420
                        });
                } else {
                    this.$refs.file.click();
                }
            },

            getPreviewImage(e) {
                this.imgFile = e.target.files[0];
                this.previewImg = URL.createObjectURL(this.imgFile);
            },

            getFileExtension(filename) {
                // the + 1 is to remove the dot. in this case, it could be omitted but it is added after to be more clear
                return filename.slice(filename.lastIndexOf(".") + 1, filename.length);
            },

            updateDatabase(downloadURL) {

                let name = this.$$('#creation-page .input-with-value[name="list-name"]').val();
                let description = this.$$('#creation-page .input-with-value[name="description"]').val();
                let date = new Date();
                let self = this;

                fb.db.collection("todos").add({
                    name,
                    description,
                    date,
                    imgURL: downloadURL,
                    uid: fb.auth.currentUser.uid
                })
                    .then(function(docRef) {
                        console.log("Successfully added the picture at " + docRef.id);
                        self.$refs.cPopUp.close();
                    })
                    .catch(function(error) {
                        console.log("Error at updating database " + error.message)
                    });
            },

            submitForm() {
                if (!this.previewImg) {
                    return false
                }
                let self = this;
                let ref = fb.storage.ref();
                // one way of making the file name unique is to use current time
                let fileName = `${Date.now()}.${this.getFileExtension(this.imgFile.name)}`;

                let uploadTask = ref.child(`images/${fb.auth.currentUser.uid}/${fileName}`).put(this.imgFile);

                // Listen for state changes, errors, and completion of the upload.
                uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
                    function(snapshot) {
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        // this can be useful to do loading sections or anything
                    }, function(error) {
                        console.log("Error at uploading picture " + error.code)
                    }, function() {

                        // Upload completed successfully, now we can get the download URL and update the database
                        uploadTask.snapshot.ref.getDownloadURL().then(self.updateDatabase);
                    });
            }
        }
    }
</script>

<style scoped>

</style>
