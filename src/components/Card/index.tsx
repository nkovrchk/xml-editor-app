import React, { ReactEventHandler } from 'react';
import { CardStyled } from './styled';
import { Text } from 'components/Text';

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
