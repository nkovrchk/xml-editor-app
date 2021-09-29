import React from 'react';

import { Box } from 'components/Box';
import { ROUTES } from 'routes/consts';

import { HeaderContainer, HeaderLink } from './styled';

export const Header: React.FC = () => {
    return (
        <HeaderContainer>
            <HeaderLink to={ROUTES.ROOT.PATH}>{'Главная'}</HeaderLink>
            <HeaderLink to={ROUTES.CREATE_ARTICLE.PATH}>{'Создать статью'}</HeaderLink>
        </HeaderContainer>
    );
};
