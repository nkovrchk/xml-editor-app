import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { ArticlesListPage } from 'pages/ArticlesListPage';

import { ROUTES } from './consts';

export const Routes: React.FC = () => (
    <Switch>
        <Route path={ROUTES.ROOT.PATH} component={ArticlesListPage} exact />
    </Switch>
);
