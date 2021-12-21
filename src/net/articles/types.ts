import { IArticle, IArticleErrors } from 'types';

export interface IArticlesResponseSchema {
    success: boolean;
    data?: IArticle;
    errors?: IArticleErrors;
}

export interface ICollectionGetResponse {
    currentPage: number;
    previousPages: number[];
    nextPages: number[];
    results: IArticle[];
    filtered: number;
    empty: boolean;
}
