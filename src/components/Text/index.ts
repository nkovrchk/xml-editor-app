import styled from 'styled-components';
import { space, typography } from 'styled-system';

import { IText } from './types';

export const Text = styled.div<IText>`
    ${({ theme, color }) => (color ? `color: ${theme.colors[color] || color};` : '')}
    ${({ theme, variant }) => theme.typography[variant || 'body2Regular']}
    ${space}
    ${typography}
`;
