import styled from 'styled-components';

export const CardStyled = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 24px;
    padding: 12px 4px 4px 12px;
    height: 140px;
    user-select: none;
    cursor: pointer;
    box-shadow: 0px 1px 2px 0px rgb(0 0 0 / 15%);
    background-color: #ffffff;
    border-radius: 8px;

    &:hover {
        box-shadow: 0px 1px 2px 0px rgb(0 0 0 / 30%);
    }
`;
