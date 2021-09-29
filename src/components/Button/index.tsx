import styled from 'styled-components';

import { IButton } from './types';

export const Button = styled.button<IButton>`
    display: inline-block;
    background-color: #0d6efd;
    color: white;
    ${({ theme }) => `
        padding: ${theme.space[2]}px ${theme.space[3]}px;
        border-radius: ${theme.space[2]}px;
    `}
    border: 1px solid white;
    cursor: pointer;
    user-select: none;
`;
