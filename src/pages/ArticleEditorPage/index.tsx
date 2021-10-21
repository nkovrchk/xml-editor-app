import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteChildrenProps, useHistory } from 'react-router-dom';

import { Button } from 'components/Button';
import { Field } from 'components/Field';
import { DefaultInput, TextArea } from 'components/Input';
import { fetchArticleData, setEditedArticle, setHasErrors, updateArticle } from 'reducers/editor/actions';
import { TRootState } from 'store';

import { ArticleEditorPageStyled, BackButton, EditorBlock, EditorContainer, EditorFooter } from './styled';

export interface IArticleEditorParams {
    articleId: string;
}

export const ArticleEditorPage: React.FC<RouteChildrenProps<IArticleEditorParams>> = ({ match }) => {
    const articleId = match?.params.articleId;
    const dispatch = useDispatch();
    const history = useHistory();
    const { sourceArticle, editedArticle } = useSelector((state: TRootState) => state.editor);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const [titleError, setTitleError] = useState('');

    useEffect(() => {
        const title = editedArticle?.title;
        let error = '';

        if (!title) error = 'Необходимо указать Заголовок';
        else if (title.length > 80) error = 'Заголовок не должен превышать 80 символов';

        setTitleError(error);
    }, [editedArticle?.title]);

    useEffect(() => {
        const hasErrors = Boolean(titleError);

        dispatch(setHasErrors(hasErrors));
    }, [dispatch, titleError]);

    useEffect(() => {
        dispatch(fetchArticleData(articleId));
    }, [articleId, dispatch]);

    const goBack = useCallback(() => {
        history.push('/');
    }, [history]);

    const onInputChange = useCallback(
        (e) => {
            dispatch(setEditedArticle({ ...sourceArticle, [e.target.name]: e.target.value || '' }));
        },
        [dispatch, sourceArticle],
    );

    const onButtonClick = useCallback(() => {
        dispatch(updateArticle(articleId));
    }, [dispatch, articleId]);

    return (
        <ArticleEditorPageStyled>
            <BackButton onClick={goBack}>Назад</BackButton>
            <EditorContainer>
                <EditorBlock>
                    <Field label="Идентификатор" id="article-field-id" errorMessage="">
                        <DefaultInput
                            onChange={onInputChange}
                            name="id"
                            value={editedArticle?.id}
                            id="article-field-id"
                        />
                    </Field>
                </EditorBlock>
                <EditorBlock>
                    <Field label="Заголовок" id="article-field-title" errorMessage={titleError}>
                        <DefaultInput
                            onChange={onInputChange}
                            name="title"
                            value={editedArticle?.title}
                            id="article-field-title"
                        />
                    </Field>
                </EditorBlock>
                <EditorBlock>
                    <Field label="Ресурс" id="article-field-source" errorMessage="">
                        <DefaultInput
                            onChange={onInputChange}
                            name="source"
                            value={editedArticle?.source}
                            id="article-field-source"
                        />
                    </Field>
                </EditorBlock>
                <EditorBlock>
                    <Field label="Категория" id="article-field-category" errorMessage="">
                        <DefaultInput
                            onChange={onInputChange}
                            name="category"
                            value={editedArticle?.category}
                            id="article-field-category"
                        />
                    </Field>
                </EditorBlock>
                <EditorBlock>
                    <Field label="Текст" id="article-field-text" errorMessage="">
                        <TextArea
                            onChange={onInputChange}
                            name="text"
                            value={editedArticle?.text}
                            id="article-field-text"
                            $ref={textAreaRef}
                            rows={20}
                        />
                    </Field>
                </EditorBlock>
                <EditorFooter>
                    <Button onClick={onButtonClick}>Сохранить</Button>
                </EditorFooter>
            </EditorContainer>
        </ArticleEditorPageStyled>
    );
};
