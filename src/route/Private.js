import React, { useState, useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import "firebase/auth";
import { AuthContext } from "../Provider/AuthProvider"
const PrivateRoute = ({ component: Component, ...rest }) => {
    const { user } = useContext(AuthContext);


    return (
        <Route  {...rest} render={props => (
            !!user ? (
                <Component {...props} />
            )
                : <Redirect to="login" />
        )} />
    );
};
export default PrivateRoute;