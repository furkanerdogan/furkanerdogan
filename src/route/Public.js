import React, { useState, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from "../Provider/AuthProvider"

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
    const { user } = useContext(AuthContext);


    return (
        // restricted = false meaning public route
        // restricted = true meaning restricted route
        <Route {...rest} render={props => (
            user && restricted ?
                (<Redirect to="/AdminAddProduct" />)
                : <Component {...props} />
        )} />
    );
};

export default PublicRoute;