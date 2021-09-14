import { combineReducers } from 'redux';
import { articleReducer } from './article';

export const reducer = combineReducers({
    articleStore: articleReducer,
});
