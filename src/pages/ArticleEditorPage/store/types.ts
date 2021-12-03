import { IArticle } from 'types';

export interface IEditorOptionsAtom {
    sourceId: string;
    isPending: boolean;
    isSaved: boolean;
    hasErrors: boolean;
    showIsSuccess: boolean;
    sourceArticle: IArticle;
}
