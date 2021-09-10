import { EArticleActionType, IDeleteArticleAction, ISetArticlesAction, ISetIsPendingAction } from './types';
import { IArticle, IArticlesRestApiResponse } from 'types';
import { TAppDispatch, TAppState } from '../../store';
import axios from 'axios';
import { Store } from 'redux';

export const setArticles = (articles: IArticle[]): ISetArticlesAction => ({
	type: EArticleActionType.SET_ARTICLES,
	payload: articles,
});

export const deleteArticle = (article: IArticle): IDeleteArticleAction => ({
	type: EArticleActionType.DELETE_ARTICLE,
	payload: article,
});

export const setIsPending = (isPending: boolean): ISetIsPendingAction => ({
	type: EArticleActionType.SET_IS_PENDING,
	payload: isPending,
});

export const getArticles = () => async (dispatch: TAppDispatch, getState: () => TAppState) => {
	try {
		dispatch(setIsPending(true));

		const { limit, offset } = getState().articleStore;

		const response = await axios.get(`api/files?offset=${offset}&limit=${limit}`);
		const files: IArticlesRestApiResponse = response.data;
		dispatch(setArticles(files.results));
		dispatch(setIsPending(false));
	}
	catch(e) {
		console.log('error');
	}
};