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
        <div class="container">
            <style>{'body { background-color: #4e73df; }'}</style>
            <div class="row justify-content-center">
                < div class="col-lg-6 col-md-6" >
                    <div class="card o-hidden border-0 shadow-lg my-5">
                        <div class="card-body ">
                            <div class="p-5">
                                <div class="text-center">
                                    <h1 class="h4 text-gray-900 mb-4">Giriş Yap</h1>
                                </div>
                                <form class="user" >
                                    <div class="form-group p-2">
                                        <input type="email" class="form-control form-control-user"
                                            id="exampleInputEmail" aria-describedby="emailHelp"
                                            placeholder="Email Adresi..."
                                            onChange={e => setEmail(e.target.value)}
                                        />

                                    </div>
                                    <div class="form-group p-2">
                                        <input type="password" class="form-control form-control-user"
                                            id="exampleInputPassword" placeholder="Şifre..."
                                            onChange={e => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <div class="d-flex justify-content-center p-2">
                                        <button type="button" class="btn btn-dark" onClick={MySignIn} >Gitiş Yap</button>
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
