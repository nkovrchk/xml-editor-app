import React from 'react';
import { HeaderContainer, HeaderLink } from './styled';
import { Box } from 'components/Box';
import { Text } from 'components/Text';
import { ROUTES } from 'routes/consts';

export const Header = () => {
	return (
		<HeaderContainer>
			<Box>
				<Text>{'XML-редактор'}</Text>
				<HeaderLink to={ROUTES.ROOT.PATH}>{'Главная'}</HeaderLink>
				<HeaderLink to={ROUTES.CREATE_ARTICLE.PATH}>{'Создать статью'}</HeaderLink>
			</Box>
		</HeaderContainer>
	);
};
