import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ROUTES } from './consts';
import { MyArticles } from 'pages/MyArticles';
import { CreateArticle } from 'pages/CreateArticle';

export const Routes: React.FC = () => (
	<Switch>
		<Route path={ROUTES.ROOT.PATH} component={MyArticles} exact/>
		<Route path={ROUTES.CREATE_ARTICLE.PATH} component={CreateArticle}/>
	</Switch>
);