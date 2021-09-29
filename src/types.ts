export interface IArticle {
    id?: string;
    title?: string;
    category?: string;
    source?: string;
    text?: string;
}

export interface IArticlesRestApiResponse {
    limit: number;
    offset: number;
    size: number;
    results: IArticle[];
}

export type TLimit = 10 | 15 | 20;
