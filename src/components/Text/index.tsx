import styled from 'styled-components';

export interface IText {
    color?: string;
}

export const Text = styled.div<IText>`
    font-size: 14px;
    line-height: 16px;
    font-family: "SB Sans Text", Helvetica, Arial, sans-serif;
    color: ${({ color }) => color};
`;