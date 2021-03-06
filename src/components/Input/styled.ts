import styled from 'styled-components';

export const DefaultInputStyled = styled.input`
    margin: 0;
    padding: ${({ theme }) => `${theme.space[2]}px ${theme.space[3]}px`};
    border-radius: ${({ theme }) => theme.space[2]}px;
    border: 1px solid #d9d9d9;
    user-select: none;
`;

export const TextAreaStyled = styled.textarea`
    resize: none;
    margin: 0;
    padding: ${({ theme }) => `${theme.space[2]}px ${theme.space[3]}px`};
    border-radius: ${({ theme }) => theme.space[1]}px;
    border: 1px solid #d9d9d9;
    width: 100%;
    user-select: none;
`;
