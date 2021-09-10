import styled from 'styled-components';

export interface IGrid{
    size?: number;
}

export const Grid = styled.div<IGrid>`
    display: flex;
    
    
`;

export const GridRow = styled.div`
    
`;