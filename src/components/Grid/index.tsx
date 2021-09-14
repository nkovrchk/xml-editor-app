import styled from 'styled-components';

export const GridRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;

    & > div {
        width: 100%;
    }

    @media (min-width: 1200px) {
        & > div {
            width: 50%;
        }
    }
`;

export const Grid = styled.div`
    padding: 0 16px;
    display: block;
`;

export const GridColumn = styled.div`
    padding: 0 12px;
`;
