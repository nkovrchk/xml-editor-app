import { IArticle, IArticleErrors } from '../../../types';
import { IEditorOptionsAtom } from './types';

export const defaultEditorArticle: IArticle = {
    text: '',
    category: '',
    id: '',
    title: '',
    source: '',
};

export const defaultEditorOptions: IEditorOptionsAtom = {
    sourceId: '',
    isPending: false,
    hasErrors: false,
};

export const defaultEditorErrors: IArticleErrors = {
    id: [],
    title: [],
    category: [],
    text: [],
    source: [],
};
