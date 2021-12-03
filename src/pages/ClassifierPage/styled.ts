import styled from 'styled-components';

export const ClassifierStyled = styled.div`
    max-width: 992px;
    margin: 0 auto;
    padding-top: ${({ theme }) => theme.space[6]}px;
`;

export const BackButton = styled.div`
    margin-bottom: ${({ theme }) => theme.space[5]}px;
    color: ${({ theme }) => theme.colors.textAction};
    cursor: pointer;
`;
