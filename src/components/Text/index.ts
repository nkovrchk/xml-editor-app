import styled from 'styled-components';
import { space, typography } from 'styled-system';

import { theme } from 'theme';

export interface IText {
    color?: keyof typeof theme.typography.color;
    variant?: keyof typeof theme.typography.variant;
}

export const Text = styled.div<IText>`
    ${({ color }) => `color: ${theme.typography.color[color ?? 'textDefault']};`}
    ${({ variant }) => `
        font-size:  ${theme.typography.variant[variant ?? 'bodyRegular'].fontSize};
        font-weight: ${theme.typography.variant[variant ?? 'bodyRegular'].fontWeight};
        font-family: ${theme.typography.variant[variant ?? 'bodyRegular'].fontFamily};
        line-height: ${theme.typography.variant[variant ?? 'bodyRegular'].lineHeight};
        font-style: ${theme.typography.variant[variant ?? 'bodyRegular'].fontStyle};
    `}
    ${space}
    ${typography}
`;
