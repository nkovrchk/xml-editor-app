import styled from 'styled-components';

import { Text } from 'components/Text';

export const CardStyled = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 24px;
    padding: 12px;
    user-select: none;
    cursor: pointer;
    box-shadow: 0px 0px 2px 0px rgb(0 0 0 / 20%);
    background-color: #ffffff;
    border-radius: 8px;

    &:hover {
        box-shadow: 0px 1px 3px 0px rgb(0 0 0 / 40%);
    }

    & > ${Text} {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        height: 48px;
    }
`;
