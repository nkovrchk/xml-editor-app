import styled from 'styled-components';

import { IButtonStyled } from './types';

export const ButtonStyled = styled.button<IButtonStyled>`
    display: inline-block;

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

    ${({ fullWidth }) => {
        if (fullWidth)
            return `
                width: 100%;
            `;
    }}

    ${({ variant }) => {
        switch (variant) {
            case 'primary':
                return `
                    background-color: #0d6efd;
                `;
            case 'secondary':
                return `
                    background-color: #6c757d;
                `;
            case 'delete':
                return `
                    background-color:#dc3545;
                `;
        }
    }}
`;
