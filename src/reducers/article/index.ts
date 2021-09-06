import { IArticleAction, IArticleReducer, IArticleState } from './types';
import { EArticleType } from './actions';

const defaultState: IArticleState = {
	articles: [],
};

export const articleReducer: IArticleReducer = (state: IArticleState = defaultState, action: IArticleAction) => {
	switch (action.type){
	case EArticleType.ADD:
		state = { ...state, articles: [...state.articles, { title: action.payload }] };
		return state;
	default:
		return state;
	}
};