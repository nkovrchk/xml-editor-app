import { createStore } from 'redux';
import { reducer } from 'reducers';
import { IArticleState } from 'reducers/article/types';

export const store = createStore(reducer);

export interface IRootState {
    article: IArticleState;
}