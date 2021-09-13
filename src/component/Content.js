import React, { useEffect, useState } from 'react'
import {
    Link
} from "react-router-dom";
import app from '../firebase';
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";




const db = getFirestore();

export default function Content() {
    const [data, setData] = useState([]);


    useEffect(async () => {
        try {
            const list = [];

            const querySnapshot = await getDocs(collection(db, "Post"));
            querySnapshot.forEach((doc) => {
                const { content, title, postedDate } = doc.data();
                list.push({
                    id: doc.id,
                    content: content,
                    title: title,
                    postedDate: postedDate,

                });
            })
            setData(list);

        }
        catch (e) {
            console.log(e);
        }
    }, []);

    return (

        <div className="row col-md-9">
            <div className="profile-content  ">

                {data.map(product => {
                    return (
                        <main key={product.id} className="container p-3 bg-secondary">
                            <div className="bg-light p-5 rounded">
                                <h1>{product.title}</h1>
                                <small style={{ fontWeight: 'bold' }}> Yayınlanma Tarihi:{product.postedDate}</small>
                                <br />
                                <p className="lead content-post">  {product.content}</p>

                                <Link to={'/' + product.id} className="btn btn-dark rounded-0 btn-sm mr-4 ml-4 ">Devamı</Link>
                            </div>
                        </main>
                    );
                })}
            </div>
        </div>
    )
}
