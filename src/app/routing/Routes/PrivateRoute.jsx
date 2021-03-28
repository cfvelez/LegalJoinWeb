import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthManager from '../../../utils/AuthManager'
import routes from '../routes.js'

const PrivateRoute = ({component: Component, user, ...rest }) => {
    return (
        <Route {...rest} render={props => (
          AuthManager.isAuthenticated(user) === false ?
                <Redirect to={routes.login.login} />
            : <Component {...props} />
        )} />
    );
};

export default PrivateRoute;
