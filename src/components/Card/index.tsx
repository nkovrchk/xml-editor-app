import React, { ReactEventHandler } from 'react';

import { Text } from 'components/Text';

import { CardStyled } from './styled';

export interface ICard {
    title: string;
    category: string;
    onClick: ReactEventHandler;
}

export const Card: React.FC<ICard> = ({ title, category, onClick }) => {
    return (
        <CardStyled onClick={onClick}>
            <Text color={'textSecondary'} variant={'captionRegular'}>
                {category}
            </Text>
            <Text variant={'h3SemiBold'}>{title}</Text>
        </CardStyled>
    );
};
