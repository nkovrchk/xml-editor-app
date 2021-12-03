import { isEqual } from 'lodash';
import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { atom, useRecoilState, useResetRecoilState } from 'recoil';

import { ArticlesApi } from 'net/articles';
import { IArticle, IArticleErrors } from 'types';

import { defaultEditorArticle, defaultEditorErrors, defaultEditorOptions } from './consts';
import { IEditorOptionsAtom } from './types';

export const editorArticleAtom = atom<IArticle>({
    key: 'editorArticleAtom',
    default: defaultEditorArticle,
});

export const editorOptionsAtom = atom<IEditorOptionsAtom>({
    key: 'editorOptionsAtom',
    default: defaultEditorOptions,
});

export const editorErrorsAtom = atom<IArticleErrors>({
    key: 'editorErrorsAtom',
    default: defaultEditorErrors,
});

export const useEditor = () => {
    const [editorArticle, setEditorArticle] = useRecoilState(editorArticleAtom);
    const [options, setOptions] = useRecoilState(editorOptionsAtom);
    const [errors, setErrors] = useRecoilState(editorErrorsAtom);
    const { articleId } = useParams<{ articleId?: string }>();

    const resetArticle = useResetRecoilState(editorArticleAtom);
    const resetOptions = useResetRecoilState(editorOptionsAtom);
    const resetErrors = useResetRecoilState(editorErrorsAtom);

    const _setOptions = useCallback(
        (value: Partial<IEditorOptionsAtom>) => setOptions((prevState) => ({ ...prevState, ...value })),
        [setOptions],
    );

    const _setErrors = useCallback(
        (value: Partial<IArticleErrors>) => setErrors((prevState) => ({ ...prevState, ...value })),
        [setErrors],
    );

    const _setEditorArticle = useCallback(
        (value: Partial<IArticle>) => setEditorArticle((prevState) => ({ ...prevState, ...value })),
        [setEditorArticle],
    );

    const loadArticle = useCallback(
        async (articleId: string) => {
            const response = await ArticlesApi.get(articleId);

            if (response.success && response.data) {
                setEditorArticle(response.data);
                _setOptions({ sourceId: response.data.id, sourceArticle: response.data });
            } else if (!response.success && response.errors) {
                _setErrors(response.errors);
            }
        },
        [_setErrors, _setOptions, setEditorArticle],
    );

    const saveArticle = useCallback(async () => {
        if (!(editorArticle && editorArticle?.id)) return;

        const response = await ArticlesApi.create(editorArticle?.id, editorArticle);

        if (response.success) {
            _setOptions({ sourceId: editorArticle.id, sourceArticle: editorArticle });
        } else if (!response.success && response.errors) {
            _setErrors(response.errors);
        }
    }, [_setErrors, _setOptions, editorArticle]);

    const update = useCallback(async () => {
        if (!(editorArticle && editorArticle?.id)) return;

        const response = await ArticlesApi.update(options.sourceId, editorArticle);

        if (response.success) {
            _setOptions({ sourceId: editorArticle.id, sourceArticle: editorArticle });
        } else if (!response.success && response.errors) {
            _setErrors(response.errors);
        }
    }, [_setErrors, _setOptions, editorArticle, options.sourceId]);

    useEffect(() => {
        return () => {
            resetArticle();
            resetOptions();
            resetErrors();
        };
    }, [resetArticle, resetErrors, resetOptions, articleId]);

    useEffect(() => {
        let hasErrors = false;
        for (const [, v] of Object.entries(errors)) {
            if (v.length > 0) hasErrors = true;
        }

        _setOptions({ hasErrors });
    }, [_setOptions, errors]);

    useEffect(() => {
        _setOptions({ isSaved: isEqual(options.sourceArticle, editorArticle) });
    }, [_setOptions, editorArticle, options.sourceArticle]);

    return {
        editorArticle,
        loadArticle,
        saveArticle,
        setEditorArticle: _setEditorArticle,
        options,
        errors,
        update,
        setOptions: _setOptions,
        setErrors: _setErrors,
    };
};
