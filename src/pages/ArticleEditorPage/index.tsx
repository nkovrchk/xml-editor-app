import React, { useCallback, useEffect, useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { Button } from 'components/Button';
import { Field } from 'components/Field';
import { DefaultInput, TextArea } from 'components/Input';

import { Box } from '../../components/Box';
import { IArticle } from '../../types';
import { useEditor } from './store';
import { defaultEditorErrors } from './store/consts';
import { ArticleEditorPageStyled, BackButton, EditorBlock } from './styled';

export const ArticleEditorPage: React.FC = () => {
    const { articleId } = useParams<{ articleId?: string }>();
    const history = useHistory();
    const { editorArticle, loadArticle, setEditorArticle, saveArticle, update, errors, setErrors, options } =
        useEditor();
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
            setErrors(defaultEditorErrors);
            setEditorArticle({ [key]: value });
        },
        [setEditorArticle, setErrors],
    );

    const handleClick = useCallback(async () => {
        if (articleId) await update();
        else await saveArticle();
    }, [articleId, saveArticle, update]);

    const getErrors = useCallback((errors: string[]) => {
        return errors.map((err, i) => <Box key={i}>{err}</Box>);
    }, []);

    return (
        <ArticleEditorPageStyled>
            <BackButton onClick={goBack}>Назад</BackButton>
            <Box>
                <EditorBlock>
                    <Field label="Идентификатор" id="article-field-id" errorMessage={getErrors(errors.id)}>
                        <DefaultInput
                            onChange={(e) => handleChange('id', e.target.value)}
                            name="id"
                            value={editorArticle.id}
                            id="article-field-id"
                        />
                    </Field>
                </EditorBlock>
                <EditorBlock>
                    <Field label="Заголовок" id="article-field-title" errorMessage={getErrors(errors.title)}>
                        <DefaultInput
                            onChange={(e) => handleChange('title', e.target.value)}
                            name="title"
                            value={editorArticle.title}
                            id="article-field-title"
                        />
                    </Field>
                </EditorBlock>
                <EditorBlock>
                    <Field label="Ресурс" id="article-field-source" errorMessage={getErrors(errors.source)}>
                        <DefaultInput
                            onChange={(e) => handleChange('source', e.target.value)}
                            name="source"
                            value={editorArticle.source}
                            id="article-field-source"
                        />
                    </Field>
                </EditorBlock>
                <EditorBlock>
                    <Field label="Категория" id="article-field-category" errorMessage={getErrors(errors.category)}>
                        <DefaultInput
                            onChange={(e) => handleChange('category', e.target.value)}
                            name="category"
                            value={editorArticle.category}
                            id="article-field-category"
                        />
                    </Field>
                </EditorBlock>
                <EditorBlock>
                    <Field label="Текст" id="article-field-text" errorMessage={getErrors(errors.text)}>
                        <TextArea
                            onChange={(e) => handleChange('text', e.target.value)}
                            name="text"
                            value={editorArticle.text}
                            id="article-field-text"
                            $ref={textAreaRef}
                            rows={10}
                        />
                    </Field>
                </EditorBlock>
            </Box>
            <Box mt={4}>
                <Button disabled={options.isSaved || options.hasErrors} onClick={handleClick}>
                    Сохранить
                </Button>
            </Box>
        </ArticleEditorPageStyled>
    );
};
