import React, { useCallback, useEffect, useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { Button } from 'components/Button';
import { Field } from 'components/Field';
import { DefaultInput, TextArea } from 'components/Input';

import { IArticle } from '../../types';
import { useEditor } from './store';
import { ArticleEditorPageStyled, BackButton, EditorBlock, EditorContainer, EditorFooter } from './styled';

export const ArticleEditorPage: React.FC = () => {
    const { articleId } = useParams<{ articleId?: string }>();
    const history = useHistory();
    const { editorArticle, loadArticle, setEditorArticle, saveArticle, update, errors } = useEditor();
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (articleId) {
            loadArticle(articleId);
        }
    }, [articleId, loadArticle]);

    const goBack = useCallback(() => {
        history.push('/');
    }, [history]);

    const handleChange = useCallback(
        (key: keyof IArticle, value: string) => {
            setEditorArticle({ [key]: value });
        },
        [setEditorArticle],
    );

    const handleClick = useCallback(async () => {
        if (articleId) await update();
        else await saveArticle();
    }, [articleId, saveArticle, update]);

    return (
        <ArticleEditorPageStyled>
            <BackButton onClick={goBack}>Назад</BackButton>
            <EditorContainer>
                <EditorBlock>
                    <Field label="Идентификатор" id="article-field-id" errorMessage={errors.id[0]}>
                        <DefaultInput
                            onChange={(e) => handleChange('id', e.target.value)}
                            name="id"
                            value={editorArticle.id}
                            id="article-field-id"
                        />
                    </Field>
                </EditorBlock>
                <EditorBlock>
                    <Field label="Заголовок" id="article-field-title" errorMessage={errors.title[0]}>
                        <DefaultInput
                            onChange={(e) => handleChange('title', e.target.value)}
                            name="title"
                            value={editorArticle.title}
                            id="article-field-title"
                        />
                    </Field>
                </EditorBlock>
                <EditorBlock>
                    <Field label="Ресурс" id="article-field-source" errorMessage={errors.source[0]}>
                        <DefaultInput
                            onChange={(e) => handleChange('source', e.target.value)}
                            name="source"
                            value={editorArticle.source}
                            id="article-field-source"
                        />
                    </Field>
                </EditorBlock>
                <EditorBlock>
                    <Field label="Категория" id="article-field-category" errorMessage={errors.category[0]}>
                        <DefaultInput
                            onChange={(e) => handleChange('category', e.target.value)}
                            name="category"
                            value={editorArticle.category}
                            id="article-field-category"
                        />
                    </Field>
                </EditorBlock>
                <EditorBlock>
                    <Field label="Текст" id="article-field-text" errorMessage={errors.text[0]}>
                        <TextArea
                            onChange={(e) => handleChange('text', e.target.value)}
                            name="text"
                            value={editorArticle.text}
                            id="article-field-text"
                            $ref={textAreaRef}
                            rows={20}
                        />
                    </Field>
                </EditorBlock>
                <EditorFooter>
                    <Button onClick={handleClick}>Сохранить</Button>
                </EditorFooter>
            </EditorContainer>
        </ArticleEditorPageStyled>
    );
};
