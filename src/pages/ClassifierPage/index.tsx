import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Box } from 'components/Box';
import { Button } from 'components/Button';
import { TextArea } from 'components/Input';
import { Text } from 'components/Text';
import { ClassifierApi } from 'net/classifier';

import { BackButton, ClassifierStyled } from './styled';

export const ClassifierPage: React.FC = () => {
    const [category, setCategory] = useState('');
    const [text, setText] = useState('');
    const [isPending, setIsPending] = useState(false);

    const history = useHistory();

    const goBack = useCallback(() => {
        history.push('/');
    }, [history]);

    const predictCategory = useCallback(async () => {
        setIsPending(true);
        const response = await ClassifierApi.predict(text);

        if (response.success) setCategory(response.data?.category || '');

        setIsPending(false);
    }, [text]);

    return (
        <ClassifierStyled>
            <BackButton onClick={goBack}>Назад</BackButton>
            <Text variant="h4SemiBold">Классифицировать текст</Text>
            <Text mt={1} variant="body1Regular" color="textSecondary">
                Введите текст длинной не менее 100 символов
            </Text>
            <Box mt={4}>
                <TextArea onChange={(e) => setText(e.target.value)} rows={12} />
            </Box>
            {category ? (
                <Box py={4} display="flex" alignItems="center">
                    <Text mr={1} variant="body1Regular">
                        Предполагаемая категория:
                    </Text>
                    <Text variant="body1SemiBold">{category}</Text>
                </Box>
            ) : null}
            <Button disabled={text.length <= 100 || isPending} onClick={predictCategory}>
                Определить
            </Button>
        </ClassifierStyled>
    );
};
