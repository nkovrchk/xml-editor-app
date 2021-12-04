import styled from 'styled-components';

interface IPageStyled {
    isSelected: boolean;
}

export const PageStyled = styled.div<IPageStyled>`
    border-radius: 4px;
    width: 32px;
    height: 32px;
    margin-right: ${({ theme }) => theme.space[2]}px;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;

    &:last-child {
        margin-right: 0;
    }

    ${({ isSelected }) => {
        if (isSelected)
            return `
                background-color: rgba(149, 149, 149, 0.2);
                cursor: default
            `;
    }}
`;
