import styled from 'styled-components';

export const FilterBlock = styled.div`
    display: flex;

    & > div {
        margin-bottom: ${({ theme }) => theme.space[2]}px;
    }
`;

export const ArticleFilter = styled.div`
    border-bottom: 1px solid #d3d3d3;
    margin-bottom: 12px;
    padding-bottom: 12px;

    &:last-child {
        border-bottom: 0;
        margin-bottom: 0;
    }
`;

export const ArticleFiltersStyled = styled.div`
    color: black;
    width: 240px;
    height: 100%;
    padding: 0 24px;
`;
