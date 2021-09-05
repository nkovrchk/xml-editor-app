import styled from 'styled-components';

export interface IBox {
    color?: string;
}

export const Box = styled.div<IBox> `
    display: flex;
`;