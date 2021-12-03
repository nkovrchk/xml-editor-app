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

export const EditorFooter = styled.div`
    margin-top: ${({ theme }) => theme.space[3]}px;
`;

export const EditorContainer = styled.div`
    margin: 0 auto;
    background-color: white;
    padding: 24px 20px;
    box-shadow: 0px 1px 3px 0px rgb(0, 0, 0, 0.15);
    border-radius: ${({ theme }) => theme.space[2]}px;
    margin-bottom: ${({ theme }) => theme.space[10]}px;
`;

export const BackButton = styled.div`
    margin-bottom: ${({ theme }) => theme.space[5]}px;
    color: ${({ theme }) => theme.colors.textAction};
    cursor: pointer;
`;
