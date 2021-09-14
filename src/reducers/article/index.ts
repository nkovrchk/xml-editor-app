import { EArticleActionType, IArticleState, TArticleAction } from './types';
import { ESortValue } from '../../types';

const defaultState: IArticleState = {
    files: [],
    filters: {
        limit: 20,
        offset: 0,
        sortBy: 'title',
        sortValue: ESortValue.ASC,
    },
    isPending: true,
};

export const articleReducer = (state: IArticleState = defaultState, action: TArticleAction): IArticleState => {
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
