import { EEditorAction } from 'enums';
import { IArticle } from 'types';

export enum EEditorActionType {
    EDIT_ARTICLE = 'EDIT_ARTICLE',
    SET_IS_PENDING = 'SET_IS_PENDING',
    SET_SOURCE = 'SET_SOURCE',
    SET_EDITED_ARTICLE = 'SET_EDITED_ARTICLE',
    SET_IS_SAVED = 'SET_IS_SAVED',
    SAVE_ARTICLE = 'SAVE_ARTICLE',
    SET_HAS_ERRORS = 'SET_HAS_ERRORS',
}

export interface IEditArticleAction {
    type: EEditorActionType.EDIT_ARTICLE;
    payload: IArticle;
}

export interface ISetIsPendingAction {
    type: EEditorActionType.SET_IS_PENDING;
    payload: boolean;
}

export interface ISetSourceAction {
    type: EEditorActionType.SET_SOURCE;
    payload: IArticle;
}

export interface ISetEditedArticleAction {
    type: EEditorActionType.SET_EDITED_ARTICLE;
    payload: IArticle;
}

export interface ISetIsSavedAction {
    type: EEditorActionType.SET_IS_SAVED;
    payload: boolean;
}

export interface ISaveArticleAction {
    type: EEditorActionType.SAVE_ARTICLE;
    payload: IArticle;
}

export interface ISetHasErrorsAction {
    type: EEditorActionType.SET_HAS_ERRORS;
    payload: boolean;
}

export interface IEditorState {
    editedArticle: Partial<IArticle>;
    sourceArticle: Partial<IArticle>;
    isPending: boolean;
    isSaved: boolean;
    hasErrors: boolean;
    action: EEditorAction;
}

export type TEditorAction =
    | IEditArticleAction
    | ISetIsPendingAction
    | ISetSourceAction
    | ISetEditedArticleAction
    | ISetIsSavedAction
    | ISetHasErrorsAction;
