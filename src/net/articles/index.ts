import { http } from 'net/http';
import { IArticle } from 'types';

import { IArticlesResponseSchema } from './types';

export const ArticlesApi = {
    get: (articleId: string): Promise<IArticlesResponseSchema> => {
        return http.get(`/articles/${articleId}`).then(({ data }) => data);
    },
    create: (articleId: string, article: IArticle): Promise<IArticlesResponseSchema> => {
        return http.post(`/articles/${articleId}`, article).then(({ data }) => data);
    },
    update: (articleId: string, article: IArticle): Promise<IArticlesResponseSchema> => {
        return http.patch(`/articles/${articleId}`, article).then(({ data }) => data);
    },
};
