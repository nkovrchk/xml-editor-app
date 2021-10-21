import axios from 'axios';

import { TAppDispatch, TGetState } from 'store';
import { IArticle } from 'types';

import {
    EEditorActionType,
    ISaveArticleAction,
    ISetEditedArticleAction,
    ISetHasErrorsAction,
    ISetIsPendingAction,
    ISetSourceAction,
} from './types';

export const setIsPending = (isPending: boolean): ISetIsPendingAction => ({
    type: EEditorActionType.SET_IS_PENDING,
    payload: isPending,
});

export const setSource = (article: IArticle): ISetSourceAction => ({
    type: EEditorActionType.SET_SOURCE,
    payload: article,
});

export const setEditedArticle = (article: IArticle): ISetEditedArticleAction => ({
    type: EEditorActionType.SET_EDITED_ARTICLE,
    payload: article,
});

export const saveArticle = (article: IArticle): ISaveArticleAction => ({
    type: EEditorActionType.SAVE_ARTICLE,
    payload: article,
});

export const setHasErrors = (hasErrors: boolean): ISetHasErrorsAction => ({
    type: EEditorActionType.SET_HAS_ERRORS,
    payload: hasErrors,
});

export const fetchArticleData =
    (articleId?: string) =>
    async (dispatch: TAppDispatch): Promise<void> => {
        if (!articleId) return;
        try {
            dispatch(setIsPending(true));

            const response = await axios.get(`/articles/${articleId}`);

            const article: IArticle = response.data;

            dispatch(setSource(article));
            dispatch(setIsPending(false));
        } catch (e) {
            console.log(e);
        }
    };

export const updateArticle =
    (articleId?: string) =>
    async (dispatch: TAppDispatch, getState: TGetState): Promise<void> => {
        if (!articleId) return;

        try {
            dispatch(setIsPending(true));
            const { editedArticle } = getState().editor;

            const response = await axios.put(`/articles/${articleId}`, { editedArticle });

            if (response.status === 200) {
                dispatch(setSource(editedArticle));
            }
        } catch (e) {
            console.log(e);
        }
    };
