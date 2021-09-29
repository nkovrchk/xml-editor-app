import styled from 'styled-components';

export const FieldStyled = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export const LabelStyled = styled.label`
    display: flex;
    align-items: centre;
    cursor: pointer;
    margin-bottom: ${({ theme }) => theme.space[1]}px;
`;
