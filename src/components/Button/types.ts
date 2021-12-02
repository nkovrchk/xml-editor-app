import { LayoutProps, SpaceProps } from 'styled-system';

import { theme } from 'theme';

export interface IButtonStyled extends SpaceProps, LayoutProps {
    color?: keyof typeof theme.colors;
    disabled?: boolean;
}
