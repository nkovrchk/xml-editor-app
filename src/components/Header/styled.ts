import styled from 'styled-components';

import { Link } from 'components/Link';

export const HeaderContainer = styled.div`
    height: 56px;
    background-color: #0d6efd;
    display: flex;
    padding: 0 ${({ theme }) => theme.space[10]}px;
    align-items: center;
    box-shadow: 0 2px 2px -2px rgb(0, 0, 0, 0.15);
`;

export const HeaderLink = styled(Link)`
    color: #ffffff;
    text-decoration: none;
    margin-right: ${({ theme }) => theme.space[8]}px;

    &:hover: {
        color: #d3d3d3;
    }
`;
