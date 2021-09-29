import axios from 'axios';

import { IArticle, IArticlesRestApiResponse } from 'types';

import { TAppDispatch, TAppState } from '../../store';
import {
    EArticleActionType,
    IArticleFilters,
    ISetArticlesAction,
    ISetFiltersAction,
    ISetIsPendingAction,
} from './types';

export const setArticles = (articles: IArticle[]): ISetArticlesAction => ({
    type: EArticleActionType.SET_ARTICLES,
    payload: articles,
});

export const setIsPending = (isPending: boolean): ISetIsPendingAction => ({
    type: EArticleActionType.SET_IS_PENDING,
    payload: isPending,
});

export const setArticleFilters = (filters: IArticleFilters): ISetFiltersAction => ({
    type: EArticleActionType.SET_FILTERS,
    payload: filters,
});

export const getArticles =
    () =>
    async (dispatch: TAppDispatch, getState: () => TAppState): Promise<void> => {
        try {
            dispatch(setIsPending(true));

            const { limit, offset, sortBy, sortValue } = getState().articles.filters;

            const response = await axios.get(
                `/files?offset=${offset}&limit=${limit}&sort_by=${sortBy}&sort_value=${sortValue}`,
            );
            const files: IArticlesRestApiResponse = response.data;
            dispatch(setArticles(files.results));
            dispatch(setIsPending(false));
        } catch (e) {
            console.log('error');
        }
    };
