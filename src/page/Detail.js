
import React, { useEffect, useState, Fragment } from 'react'

import {
    Link,
    useParams
} from "react-router-dom";
import app from '../firebase';
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import arrow from "../images/arrow.png"
const db = getFirestore();

export default function Content() {
    let { detailId } = useParams();
    const [data, setData] = useState([]);

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

    return (
        <Fragment>
            <div className="back" style={{
                position: "relative",
                zIndex: 4,
                left: 0,
                top: 25
            }}>

                <Link to="/" >
                    <img src={arrow} height={25} /></Link>

            </div>
            <div className="d-flex justify-content-center">

                <div className="row col-md-8 ">
                    <div className="profile-content" >

                        {data.map(product => {
                            return (
                                <main key={product.id} className="container p-3">
                                    <h1>{product.title}</h1>

                                    <br />
                                    <div className="d-flex justify-content-center m-0 p-0">
                                        <img src={product.postImages} style={{ height: 300 }} />
                                    </div>
                                    <br />
                                    <p className="lead">  {product.content}</p>
                                    <br />

                                    <small style={{ fontWeight: 'bold' }}> Yayınlanma Tarihi:{product.postedDate}</small>

                                </main>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Fragment >
    )
}
