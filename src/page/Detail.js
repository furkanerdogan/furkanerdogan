
import React, { useEffect, useState } from 'react'
import {
    Link,
    useParams
} from "react-router-dom";
import app from '../firebase';
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

const db = getFirestore();

export default function Content() {
    let { detailId } = useParams();
    const [data, setData] = useState([]);
    console.log("detailId", detailId);

    useEffect(async () => {
        try {
            const list = [];

            const querySnapshot = await getDocs(collection(db, "Post"));
            querySnapshot.forEach((doc) => {
                const { title, content, postedDate, postImages } = doc.data();
                if (detailId == doc.id) {
                    list.push({
                        id: doc.id,
                        content: content,
                        title: title,
                        postedDate: postedDate,
                        postImages: postImages,

                    });
                }
            })
            setData(list);

        }
        catch (e) {
            console.log(e);
        }
    }, []);

    console.log("data:", data);
    return (
        <div class="d-flex justify-content-center">
            <div className="row col-md-9 ">
                <div className="profile-content" style={{ backgroundColor: "#907163" }}>

                    {data.map(product => {
                        console.log("resimmmm", product);
                        return (
                            <main key={product.id} class="container p-3">
                                <div class="bg-light p-5 rounded">
                                    <h1>{product.title}</h1>

                                    <br />
                                    <div className="d-flex justify-content-center m-0 p-0">
                                        <img src={product.postImages} style={{ height: 300 }} />
                                    </div>
                                    <br />
                                    <p class="lead">  {product.content}</p>

                                </div>
                            </main>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}
