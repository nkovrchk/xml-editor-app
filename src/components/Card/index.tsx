import React from 'react';
import { CardStyled } from './styled';
import { Text } from 'components/Text';

export interface ICard {
    title: string;
    category: string;
}

export const Card: React.FC<ICard> = ({ title, category }) => {
	return (
		<CardStyled>
			<Text>{title}</Text>
			<Text>{category}</Text>
		</CardStyled>
	);
};