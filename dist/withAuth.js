import React from 'react';
import { Consumer } from './AuthenticationProvider';

var withAuth = function withAuth(Component) {
  return function (props) {
    return React.createElement(Consumer, null, function (auth) {
      return React.createElement(Component, Object.assign({}, props, {
        auth: auth
      }));
    });
  };
};

export default withAuth;