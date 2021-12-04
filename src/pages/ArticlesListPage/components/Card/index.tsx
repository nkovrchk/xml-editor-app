import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { Text } from 'components/Text';
import { ROUTES } from 'routes/consts';

import { Box } from '../../../../components/Box';
import { CardStyled } from './styled';

export interface ICard {
    title?: string;
    category?: string;
    id?: string;
}

export const CardComponent: React.FC<ICard> = ({ title, id, category }) => {
    const history = useHistory();

    const handleRoute = useCallback(() => {
        history.push(`${ROUTES.ARTICLE_EDITOR.ROUTE}${id}`);
    }, [history, id]);

    return (
        <CardStyled onClick={handleRoute}>
            <Box display="flex" mb={2} alignItems="center" justifyContent="space-between">
                <Text color="textSecondary" variant="caption1Regular">
                    {category}
                </Text>
                <Text variant="caption2SemiBold" color="textSecondary">
                    #{id}
                </Text>
            </Box>
            <Text variant="h4SemiBold">{title}</Text>
        </CardStyled>
    );
};

export const Card = React.memo(CardComponent);
