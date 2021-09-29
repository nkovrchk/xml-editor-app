import { ESortValue, ESortBy } from 'enums';
import { IArticle, TLimit } from 'types';

export enum EArticleActionType {
    SET_ARTICLES = 'SET_ARTICLES',
    DELETE_ARTICLE = 'DELETE_ARTICLE',
    SET_IS_PENDING = 'SET_IS_PENDING',
    SET_FILTERS = 'SET_FILTERS',
}

export interface IArticleState {
    files: IArticle[];
    filters: IArticleFilters;
    isPending: boolean;
}

export interface IArticleFilters {
    limit: TLimit;
    offset: number;
    sortBy: ESortBy;
    sortValue: ESortValue;
}

export interface ISetArticlesAction {
    type: EArticleActionType.SET_ARTICLES;
    payload: IArticle[];
}

export interface IDeleteArticleAction {
    type: EArticleActionType.DELETE_ARTICLE;
    payload: IArticle;
}

export interface ISetIsPendingAction {
    type: EArticleActionType.SET_IS_PENDING;
    payload: boolean;
}

export interface ISetFiltersAction {
    type: EArticleActionType.SET_FILTERS;
    payload: IArticleFilters;
}

export type TArticleAction = ISetArticlesAction | IDeleteArticleAction | ISetIsPendingAction | ISetFiltersAction;
