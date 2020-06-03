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
                    <f7-input input-with-value type="text" placeholder="My todo list Name" required></f7-input>
                </f7-list-item>
                <f7-list-item>
                    <f7-label>Description</f7-label>
                    <f7-input type="textarea" placeholder="More information you wish to specify about the list" resizable></f7-input>
                </f7-list-item>
                <input type="file" ref="file" style="display: none" accept="image/*" @change="getPreviewImage">
                <f7-list-button @click="takePhoto()">
                    Take a photo of your list
                </f7-list-button>
                <img :src="previewImg" alt="" height="250px"/>
                <f7-button class="add-button" @click="submitForm()">
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
            submitForm() {
                if (!this.previewImg) {
                    return false
                }
                let ref = fb.storage.ref();

                let uploadTask = ref.child('images/' + this.imgFile.name).put(this.imgFile);
                // Listen for state changes, errors, and completion of the upload.
                uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
                    function(snapshot) {
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        switch (snapshot.state) {
                            case firebase.storage.TaskState.PAUSED: // or 'paused'
                                console.log('Upload is paused');
                                break;
                            case firebase.storage.TaskState.RUNNING: // or 'running'
                                console.log('Upload is running');
                                break;
                        }
                    }, function(error) {
                        console.log("Error at uploading picture " + error.code)
                    }, function() {
                        // Upload completed successfully, now we can get the download URL
                        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                            console.log('File available at', downloadURL);
                            fb.db.collection("teste").add({
                                coiso: downloadURL
                            })
                                .then(function(docRef) {
                                    console.log("Successfully added the picture at " + docRef.id)
                                })
                                .catch(function(error) {
                                    console.log("Error at updating database " + error.toString())
                                });
                        });
                    });
            }
        }
    }
</script>

<style scoped>

</style>
