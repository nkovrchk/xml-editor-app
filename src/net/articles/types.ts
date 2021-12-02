import { IArticle, IArticleErrors } from 'types';

export interface IArticlesResponseSchema {
    success: boolean;
    data?: IArticle;
    errors?: IArticleErrors;
}
