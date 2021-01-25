import React, { useEffect } from 'react';
import {
  RouteProps as ReactDOMRouteProps,
  Route as ReactDOMRoute,
  Redirect,
} from 'react-router-dom';

import useAuth from '../hooks/useAuth';
import useMenu from '../hooks/useMenu';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
  disableMenu?: boolean;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  location,
  disableMenu: disable,
  ...rest
}) => {
  const { isAuthenticated } = useAuth();
  const { disableMenu, enableMenu } = useMenu();

  useEffect(() => {
    if (disable) {
      disableMenu();
    } else {
      enableMenu();
    }
  }, [disable, disableMenu, enableMenu]);

  return (
    <ReactDOMRoute
      {...rest}
      render={() => {
        return isPrivate === isAuthenticated ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
