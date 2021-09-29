import { combineReducers } from 'redux';

import { articlesReducer } from './articles';
import { editorReducer } from './editor';

export const reducer = combineReducers({
    editor: editorReducer,
    articles: articlesReducer,
});
