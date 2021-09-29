import _ from 'lodash';

import { EEditorAction } from 'enums';

import { EEditorActionType, IEditorState, TEditorAction } from './types';

const articleObject = {
    title: '',
    source: '',
    category: '',
    text: '',
    id: '',
};

const defaultState: IEditorState = {
    editedArticle: articleObject,
    sourceArticle: articleObject,
    isPending: true,
    isSaved: true,
    hasErrors: false,
    action: EEditorAction.CREATE,
};

export const editorReducer = (state: IEditorState = defaultState, action: TEditorAction): IEditorState => {
    switch (action.type) {
        case EEditorActionType.EDIT_ARTICLE:
            return { ...state, editedArticle: action.payload };
        case EEditorActionType.SET_IS_PENDING:
            return { ...state, isPending: action.payload };
        case EEditorActionType.SET_SOURCE:
            return { ...state, sourceArticle: action.payload, editedArticle: action.payload };
        case EEditorActionType.SET_EDITED_ARTICLE:
            return { ...state, editedArticle: action.payload };
        case EEditorActionType.SET_IS_SAVED:
            return { ...state, isSaved: _.isEqual(state.editedArticle, state.sourceArticle) };
        case EEditorActionType.SET_HAS_ERRORS:
            return { ...state, hasErrors: action.payload };
        default:
            return state;
    }
};
