import { SpaceProps, TypographyProps } from 'styled-system';

import { theme } from 'theme';

export interface IText extends SpaceProps, TypographyProps {
    color?: keyof typeof theme.colors;
    variant?: keyof typeof theme.typography;
}
