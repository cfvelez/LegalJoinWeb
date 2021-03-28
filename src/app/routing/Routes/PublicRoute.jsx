
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import routes from '../routes.js'

const PublicRoute = ({component: Component, restricted, ...rest}) => {
    return (
        <Route {...rest} render={props => (
          restricted ?
                <Redirect to={routes.login.login} />
            : <Component {...props} />
        )} />
    );
};

export default PublicRoute;
