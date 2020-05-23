import React from 'react';
import { BrowserRouter } from 'react-router-dom';

/**
 * Wrap components in BrowserRouter component
 * to allow them access to capabilities offered by react-router-dom
 */
export const wrapComponentInRouter = Component => {
  const InternalComponent = (props) => (
    <BrowserRouter>
      <Component {...props} />
    </BrowserRouter>
  );

  return InternalComponent;
};
