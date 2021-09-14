import styled from 'styled-components';
import { style } from 'styled-system';

export const ListContainer = styled.div`
    margin-left: 240px;
`;

export const FiltersContainer = styled.div`
    color: black;
    position: fixed;
    width: 240px;
    height: 100%;
    padding: 0 12px;
`;

export const FiltersFooter = styled.div`
    padding: 12px 0;

    & > div {
        margin: 0 auto;
    }
`;

export const ArticleListPageStyled = styled.div`
    padding-top: 20px;
    background-color: rgba(240, 240, 240, 0.8);
    position: relative;
    display: flex;
    flex-wrap: wrap;
`;
