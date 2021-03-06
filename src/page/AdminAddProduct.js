import React, { useEffect, useState, useContext } from 'react'
import moment from "moment";
import { collection, addDoc } from "firebase/firestore";
import { AuthContext } from "../Provider/AuthProvider"
import {
    useHistory
} from "react-router-dom";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import db from '../firebase'

export default function AdminAddPost() {

    let history = useHistory();
    const { logOut, user } = useContext(AuthContext);

    // const [fileUrl, setFileUrl] = useState(null);
    const [title, setTitle] = useState(null);
    const [content, setContent] = useState(null);
    const [postedDate, setPostedDate] = useState("");
    const [postImages, setPostImages] = useState(null);


    const onChange = async (e) => {
        const storage = getStorage();
        const file = e.target.files[0];

        // Upload file and metadata to the object 'images/mountains.jpg'
        const storageRef = ref(storage, 'images/' + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;

                    // ...

                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                }
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setPostImages(downloadURL);
                });
            }
        );


    }
    console.log("fileUrl", postImages);

    useEffect(() => {
        if (user === false)
            history.push("/login")


    }, [user])
    const currentDate = () => {
        let date_create = moment().format("DD-MM-YYYY hh:mm:ss")
        setPostedDate(date_create);
    }

    const onSubmit = async () => {

        if (!title || !content || !postedDate) {
            console.log("Ekleme ekran??nda bo?? olan yerler var")
        }
        else {
            try {
                const docRef = await addDoc(collection(db, "Post"), {
                    title: title,
                    content: content,
                    postedDate: postedDate,
                    postImages: postImages
                });
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }
    }

    const onSubmitOut = async () => {

        if (user) {
            await logOut()
            history.push("/login")
        }

        else {
            console.log("hatal?? ????k????");
        }

    }



    return (
        <div className="container bg-primary my-3 py-4" style={{ borderRadius: 10 }}>
            <div className="d-flex justify-content-center">  <h3 style={{ color: 'white' }}>Admin Post Ekleme Sayfas??</h3></div>
            <div className="row my-5 p-5 ">
                <div className="col-md-3 my-2">
                    Makale Ba??l??????
                </div>
                <div className="col-md-9 p-2">
                    <input className="form-control" type="text" onChange={e => setTitle(e.target.value)} />


                </div>
                <div className="col-md-3 my-2">
                    Makale ????eri??i
                </div>
                <div className="col-md-9 p-2">
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={e => setContent(e.target.value)} ></textarea>
                </div>

                <div className="col-md-3 my-2">
                    Tarih
                </div>
                <div className="col-md-9 p-2">
                    <input className="form-control" type="text" value={postedDate} onChange={e => setPostedDate(e.target.value)} />

                    <small onClick={currentDate}>??uan</small>
                </div>

                <div className="col-md-3 my-2">
                    Resim:
                </div>
                <div className="col-md-9">
                    <input type="file" onChange={onChange} />
                </div>


                <div className="col-md-12 text-center"><button type="button" className="btn btn-dark" onClick={onSubmit} >Ekle</button>

                </div>
            </div>
            <button type="button" className="btn btn-dark" onClick={onSubmitOut} >????k???? Yap</button>

        </div>


    );

}
