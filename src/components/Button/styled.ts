import styled from 'styled-components';

import { IButtonStyled } from './types';

export const ButtonStyled = styled.button<IButtonStyled>`
    display: inline-block;
    background-color: #0d6efd;
    color: white;
    border: 1px solid white;
    cursor: pointer;
    user-select: none;
    cursor: pointer;

    ${({ theme }) => `
        padding: ${theme.space[2]}px ${theme.space[3]}px;
        border-radius: ${theme.space[2]}px;
    `}

    &:disabled {
        cursor: default;
        opacity: 0.6;
    }
`;
