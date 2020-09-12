import React from "react"
import { Route, Redirect } from "react-router-dom"
import { getItem } from "../utils/cache"
import { APP_ROUTES } from "../utils/enum"

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const savedUser = getItem("users-Table")
  const isLoggedIn = savedUser ? true : false
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <>
            <Component {...props} />
          </>
        ) : (
          <Redirect
            to={{
              pathname: APP_ROUTES.LOG_IN,
              state: { from: props.location },
            }}
          />
        )
      }
    />
  )
}
