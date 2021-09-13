import React, { createContext, useState, useEffect } from 'react'
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

const auth = getAuth();

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user)
            }
            else {

                setUser(false)
            }
        });
        return () => unsubscribe();
    }, [])
    const signIn = (email, password) => {

        return new Promise(async (resolve, reject) => {
            try {
                signInWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        // Signed in 
                        const user = userCredential.user;
                        setUser(user);
                        resolve(user);

                    })
            } catch (e) {
                reject(e);
            }
        })
    }

    const logOut = async () => {

        signOut(auth).then(() => {
            setUser(false);
        }).catch((error) => {
        });
        return user;
    }



    return (
        <AuthContext.Provider
            value={{

                user,
                signIn,
                logOut

            }}>
            {children}
        </AuthContext.Provider>
    )
}
