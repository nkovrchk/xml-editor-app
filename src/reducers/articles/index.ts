import { ESortValue, ESortBy } from 'enums';

import { EArticleActionType, IArticleState, TArticleAction } from './types';

const defaultState: IArticleState = {
    files: [],
    filters: {
        limit: 10,
        offset: 0,
        sortBy: ESortBy.TITLE,
        sortValue: ESortValue.ASC,
    },
    isPending: true,
};

export const articlesReducer = (state: IArticleState = defaultState, action: TArticleAction): IArticleState => {
    switch (action.type) {
        case EArticleActionType.SET_ARTICLES:
            return { ...state, files: [...action.payload] };
        case EArticleActionType.DELETE_ARTICLE:
            return { ...state };
        case EArticleActionType.SET_IS_PENDING:
            return { ...state, isPending: action.payload };
        case EArticleActionType.SET_FILTERS:
            return { ...state, filters: action.payload };
        default:
            return state;
    }
};
