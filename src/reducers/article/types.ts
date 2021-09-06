import { EArticleType } from './actions';

export interface IArticle {
    title: string;
}

export interface IArticleState {
    articles: IArticle[];
}

export interface IArticleAction {
    type: EArticleType;
    payload: string;
}

export interface IArticleReducer {
    (state: IArticleState, action: IArticleAction): IArticleState;
}