import React from 'react';

import { ROUTES } from 'routes/consts';

import { HeaderContainer, HeaderLink } from './styled';

export const Header: React.FC = () => {
    return (
        <HeaderContainer>
            <HeaderLink to={ROUTES.ROOT.PATH}>Главная</HeaderLink>
            <HeaderLink to={ROUTES.CREATE_ARTICLE.PATH}>Создать статью</HeaderLink>
            <HeaderLink to={ROUTES.CLASSIFIER.PATH}>Классификатор</HeaderLink>
        </HeaderContainer>
    );
};
