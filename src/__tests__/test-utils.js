import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

/**
 * Wrap components in BrowserRouter component
 * to allow them access to capabilities offered by react-router-dom
 */
export const renderComponent = (Component) => {
  const MountedComponent = render(
    <BrowserRouter>
      <Component />
    </BrowserRouter>
  );

  return MountedComponent;
};
