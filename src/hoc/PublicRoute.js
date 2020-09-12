import React from "react"
import { Route, Redirect } from "react-router-dom"

import { getItem } from "../utils/cache"
import { APP_ROUTES } from "../utils/enum"

export const PublicRoute = ({ component: Component, ...rest }) => {
  const savedUser = getItem("users-Table")
  const isLoggedIn = savedUser ? true : false

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Redirect
            to={{
              pathname: APP_ROUTES.HOME,
              state: { from: props.location },
            }}
          />
        ) : (
          <>
            <Component {...props} />
          </>
        )
      }
    />
  )
}
