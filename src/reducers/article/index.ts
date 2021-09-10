import { EArticleActionType, IArticleState, TArticleAction } from './types';

const defaultState: IArticleState = {
	files: [],
	isPending: true,
	limit: 20,
	offset: 0,
};

export const articleReducer = (state: IArticleState = defaultState, action: TArticleAction): IArticleState => {
	switch (action.type){
	case EArticleActionType.SET_ARTICLES:
		return { ...state, files: [...action.payload] };
	case EArticleActionType.DELETE_ARTICLE:
		return { ...state };
	case EArticleActionType.SET_IS_PENDING:
		return { ...state, isPending: action.payload };
	default:
		return state;
	}
};
