import { IArticle } from 'types';

export enum EArticleActionType {
	SET_ARTICLES = 'SET_ARTICLES',
    DELETE_ARTICLE = 'DELETE_ARTICLE',
    SET_IS_PENDING = 'SET_IS_PENDING',
}

export interface IArticleState {
    files: IArticle[];
    isPending: boolean;
    limit: number;
    offset: number;
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

export type TArticleAction = ISetArticlesAction | IDeleteArticleAction | ISetIsPendingAction;