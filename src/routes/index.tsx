import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { ArticleEditorPage } from 'pages/ArticleEditorPage';
import { ArticlesListPage } from 'pages/ArticlesListPage';

import { ROUTES } from './consts';
import { EEditorAction } from '../enums';

export const Routes: React.FC = () => (
    <Switch>
        <Route path={ROUTES.ROOT.PATH} component={ArticlesListPage} exact />
        <Route path={ROUTES.ARTICLE_EDITOR.PATH} component={ArticleEditorPage} exact />
    </Switch>
);
