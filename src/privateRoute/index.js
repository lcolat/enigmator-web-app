import React from 'react'
import { Redirect, Route } from 'react-router-dom';



const PrivateRoute = ({
    component: Component,
    isAuthenticated,
    redirect: pathname,
    ...rest
  }) => {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated === true ? (
            <Component {...rest} {...props} />
          ) : (
            <Redirect
              to="/login"
            />
          )
        }
      />
    )
  }
export default PrivateRoute;
