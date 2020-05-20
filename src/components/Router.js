/**
 * Router.js
 *
 * Purpose:
 *   Collects all of the (top-level) pages listed in the /pages/index.js file
 *   and builds them into routes to be served by the application.
 *   Any top-level page not registered in the /pages/indexjs file
 *   may not show up when navigated to.
 *   We use some fancy react features to lazy load in new pages
 * with react's relatively new Suspense system.
 *
 * Things to Change:
 *   If you have very specific views about how pages should be routed using react,
 *   then change them around here.
 *   Also if you want to use something like helmet
 *   to give each page a specific title you can add that in here as well.
 *   Basically anything having to do with switching between pages
 *   can be changed around in this file.
 */

import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import pages from '../pages'

class Router extends React.Component {
  render() {
    const routes = pages.map(page => {
      const path = page.path.replace('src/', '');

      return {
        ...page,
        Component: (props) => {
          const InternalComponent = lazy(() => import(`../${path}`));
          return (
            <Suspense fallback={<h3>Loading...</h3>}>
              <InternalComponent {...props} />
            </Suspense>
          );
        }
      };
    });

    return (
      <Switch>
        {routes.map(({ Component, route, path }, index) => (
          <Route
            key={index}
            exact={!route.includes(':')}
            path={route}
            render={(props) => <Component {...props} />}
          />
        ))}

        <Route render={() => <NotFound />} />
      </Switch>
    );
  }
}

export default Router;
