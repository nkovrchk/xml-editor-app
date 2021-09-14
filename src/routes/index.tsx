import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ROUTES } from './consts';
import { ArticlesListPage } from 'pages/ArticlesListPage';

export const Routes: React.FC = () => (
    <Switch>
        <Route path={ROUTES.ROOT.PATH} component={ArticlesListPage} exact />
    </Switch>
);
