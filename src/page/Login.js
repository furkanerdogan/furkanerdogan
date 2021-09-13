import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import firebase from 'firebase/compat/app';
import { AuthContext } from "../Provider/AuthProvider"
import {
    useHistory,
    useLocation
} from "react-router-dom";


export default function Login() {
    let history = useHistory();
    let location = useLocation();

    const { signIn, user } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const MySignIn = async () => {
        if (!!email && !!password)
            signIn(email, password);
    }

    return (
        <div className="container">
            <style>{'body { background-color: #4e73df; }'}</style>
            <div className="row justify-content-center">
                < div className="col-lg-6 col-md-6" >
                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body ">
                            <div className="p-5">
                                <div className="text-center">
                                    <h1 className="h4 text-gray-900 mb-4">Giriş Yap</h1>
                                </div>
                                <form className="user" >
                                    <div className="form-group p-2">
                                        <input type="email" className="form-control form-control-user"
                                            id="exampleInputEmail" aria-describedby="emailHelp"
                                            placeholder="Email Adresi..."
                                            onChange={e => setEmail(e.target.value)}
                                        />

                                    </div>
                                    <div className="form-group p-2">
                                        <input type="password" className="form-control form-control-user"
                                            id="exampleInputPassword" placeholder="Şifre..."
                                            onChange={e => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="d-flex justify-content-center p-2">
                                        <button type="button" className="btn btn-dark" onClick={MySignIn} >Gitiş Yap</button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>

                </div >

            </div >

        </div >

    )
}
