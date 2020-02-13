import React from 'react';
import { Consumer, Context } from './AuthenticationProvider';
export var withAuth = function withAuth(Component) {
  return function (props) {
    return React.createElement(Consumer, null, function (auth) {
      return React.createElement(Component, Object.assign({}, props, {
        auth: auth
      }));
    });
  };
};
export var useAuth = function useAuth() {
  return React.useContext(Context);
};