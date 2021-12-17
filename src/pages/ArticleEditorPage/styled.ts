import styled from 'styled-components';

import { Box } from 'components/Box';

export const ArticleEditorPageStyled = styled.div`
    height: auto;
    max-width: 992px;
    margin: 0 auto;
    padding-top: ${({ theme }) => theme.space[6]}px;
`;

export const EditorBlock = styled(Box)`
    margin-bottom: ${({ theme }) => theme.space[5]}px;
    &:last-child {
        margin-bottom: 0;
    }
`;

export const BackButton = styled.div`
    margin-bottom: ${({ theme }) => theme.space[5]}px;
    color: ${({ theme }) => theme.colors.textAction};
    cursor: pointer;
`;
