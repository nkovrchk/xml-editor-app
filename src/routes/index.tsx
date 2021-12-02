import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { ArticleEditorPage } from 'pages/ArticleEditorPage';
import { ArticlesListPage } from 'pages/ArticlesListPage';

import { ClassifierPage } from '../pages/ClassifierPage';
import { ROUTES } from './consts';

export const Routes: React.FC = () => (
    <Switch>
        <Route path={ROUTES.ROOT.PATH} component={ArticlesListPage} exact />
        <Route path={ROUTES.ARTICLE_EDITOR.PATH} component={ArticleEditorPage} exact />
        <Route path={ROUTES.CREATE_ARTICLE.PATH} component={ArticleEditorPage} exact />
        <Route path={ROUTES.CLASSIFIER.PATH} component={ClassifierPage} exact />
    </Switch>
);
