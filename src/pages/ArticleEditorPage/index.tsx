import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { Box } from 'components/Box';
import { Button } from 'components/Button';
import { Field } from 'components/Field';
import { DefaultInput, TextArea } from 'components/Input';
import { Text } from 'components/Text';

import { ArticlesApi } from '../../net/articles';
import { IArticle } from '../../types';
import { DeleteModal } from './components/DeleteModal';
import { useEditor } from './store';
import { defaultEditorErrors } from './store/consts';
import { ArticleEditorPageStyled, BackButton, EditorBlock } from './styled';

const TIMEOUT = 3000;

export const ArticleEditorPage: React.FC = () => {
    const { articleId } = useParams<{ articleId?: string }>();
    const history = useHistory();
    const { editorArticle, loadArticle, setEditorArticle, saveArticle, update, errors, setErrors, options } =
        useEditor();
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const [message, setMessage] = useState('');
    const [isBlocked, setIsBlocked] = useState(false);
    const [showModal, setShowModal] = useState(false);

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
        if (articleId) {
            await update();
            setMessage('Данные обновлены!');
            setTimeout(() => setMessage(''), TIMEOUT);
        } else {
            saveArticle().then(() => {
                let hasErrors = false;

                for (const [, v] of Object.entries(errors)) {
                    if (v.length > 0) hasErrors = true;
                }

                if (!hasErrors) {
                    setMessage('Статья добавлена!');
                    setIsBlocked(true);
                }
                setTimeout(() => setMessage(''), TIMEOUT);
            });
        }
    }, [articleId, errors, saveArticle, update]);

    const getErrors = useCallback((errors: string[]) => {
        return errors.map((err, i) => <Box key={i}>{err}</Box>);
    }, []);

    const handleDelete = useCallback(() => {
        if (articleId) ArticlesApi.delete(articleId).then(() => history.push('/'));
    }, [articleId, history]);

    const openModal = useCallback(() => setShowModal(true), []);
    const closeModal = useCallback(() => setShowModal(false), []);

    return (
        <ArticleEditorPageStyled>
            <BackButton onClick={goBack}>Назад</BackButton>
            <Box>
                <EditorBlock>
                    <Field label="Идентификатор" id="article-field-id" errorMessage={getErrors(errors.id)}>
                        {articleId ? (
                            <Text variant="body1Regular" mt={2}>
                                {editorArticle.id}
                            </Text>
                        ) : (
                            <DefaultInput
                                onChange={(e) => handleChange('id', e.target.value)}
                                name="id"
                                value={editorArticle.id}
                                id="article-field-id"
                            />
                        )}
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
            {message.length ? (
                <Text mt={2} color="textSuccess" variant="body1Regular">
                    {message}
                </Text>
            ) : null}
            <Box display="flex" justifyContent="space-between" mt={4}>
                <Button
                    disabled={options.isSaved || options.hasErrors || (!articleId && isBlocked)}
                    onClick={handleClick}
                >
                    {articleId ? 'Сохранить' : 'Создать'}
                </Button>
                {articleId ? (
                    <Button onClick={openModal} variant="delete">
                        Удалить
                    </Button>
                ) : null}
            </Box>
            {showModal ? <DeleteModal onDelete={handleDelete} onClose={closeModal} /> : null}
        </ArticleEditorPageStyled>
    );
};
