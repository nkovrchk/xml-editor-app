import styled from 'styled-components';

import { Box } from 'components/Box';

export const ArticleEditorPageStyled = styled.div`
    height: auto;
    max-width: 768px;
    margin: 0 auto;
`;

export const EditorBlock = styled(Box)`
    margin-bottom: ${({ theme }) => theme.space[2]}px;
`;

export const EditorFooter = styled.div`
    margin-top: ${({ theme }) => theme.space[3]}px;
`;

export const EditorContainer = styled.div`
    margin: 0 auto;
    background-color: white;
    padding: 24px 20px;
    box-shadow: 0px 1px 2px 0px rgb(0, 0, 0, 0.15);
    border-radius: ${({ theme }) => theme.space[2]}px;
`;

export const BackButton = styled.div`
    margin: ${({ theme }) => theme.space[5]}px 0;
    color: ${({ theme }) => theme.colors.textAction};
    cursor: pointer;
`;
