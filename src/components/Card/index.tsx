import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { Text } from 'components/Text';
import { ROUTES } from 'routes/consts';

import { CardStyled } from './styled';

export interface ICard {
    title?: string;
    category?: string;
    id?: string;
}

export const Card: React.FC<ICard> = ({ title, id, category }) => {
    const history = useHistory();

    const handleRoute = useCallback(() => {
        history.push(`${ROUTES.ARTICLE_EDITOR.ROUTE}${id}`);
    }, [history, id]);

    return (
        <CardStyled onClick={handleRoute}>
            <Text mb={2} color="textSecondary" variant="caption1Regular">
                {category}
            </Text>
            <Text variant="h4SemiBold">{title}</Text>
        </CardStyled>
    );
};
