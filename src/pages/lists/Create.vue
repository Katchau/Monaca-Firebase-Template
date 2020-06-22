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
            <h3 v-if="errorMsg" class="red-text">{{errorMsg}}</h3>
            <f7-list form>
                <f7-list-input
                        label="Name of your list"
                        name="list-name"
                        type="text"
                        placeholder="My todo list Name"
                />
                <f7-list-input
                        label="Description"
                        name="description"
                        type="textarea"
                        placeholder="More information you wish to specify about the list"
                        resizable
                />
                <input type="file" ref="file" style="display: none" accept="image/*" @change="getPreviewImage">
                <f7-list-button @click="takePhoto()">
                    Take a photo of your list
                </f7-list-button>
                <img class="preview-img" :src="previewImg" alt="" />
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
    const fb = require('@/js/firebaseConfig.js');

    export default {
        name: "Create",

        data () {
            return {
                isMobile: false,
                errorMsg: '',
                previewImg: '',
                imgFile: null
            }
        },

        mounted() {
            this.isMobile = Framework7.device.android || Framework7.device.ios;
        },

        methods: {

            takePhoto () {
                let self = this;
                // TODO this still needs testing but the online thingy isnt building up the project properly
                if (this.isMobile) {
                    let successMethod = function (camera_url) {
                        self.previewImg =  "data:image/jpeg;base64," + camera_url;
                    };
                    navigator.camera.getPicture(successMethod,
                        function() {
                            alert("Failed to get picture, please try again.");
                        }, {
                            quality : 50,
                            destinationType : Camera.DestinationType.DATA_URL,
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

            getCurrentDate() {
                let dateObj = new Date();
                let month = dateObj.getUTCMonth() + 1; //months from 1-12
                let day = dateObj.getUTCDate();
                let year = dateObj.getUTCFullYear();

                return `${day}/${month}/${year}`;
            },

            updateDatabase(downloadURL) {

                // you could either make these fields mandatory or use a default value since FB does not accept empty strings
                let name = this.$$('#creation-page .input-with-value[name="list-name"]').val()
                    || new Date().toDateString() + ' list';
                let description = this.$$('#creation-page .input-with-value[name="description"]').val() || 'No description available';
                let date = this.getCurrentDate();
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
                this.errorMsg = '';
                if (!this.previewImg) {
                    this.errorMsg = 'Missing Picture!';
                    return false;
                }
                let self = this;
                let ref = fb.storage.ref();

                // one way of making the file name unique is to use current time
                let fileName = `${Date.now()}.${this.isMobile ? 'jpeg' : this.getFileExtension(this.imgFile.name)}`;
                let path = `images/${fb.auth.currentUser.uid}/${fileName}`;

                // We are using 2 different ways of uploading pictures which use different types of data
                let uploadTask = this.isMobile ? ref.child(path).putString(this.previewImg, 'data_url')
                    : ref.child(path).put(this.imgFile);

                // Listen for state changes, errors, and completion of the upload.
                uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
                    function(snapshot) {
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        // this can be useful to do loading sections or anything
                    }, function(error) {
                        // do something in case an error occurs
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
