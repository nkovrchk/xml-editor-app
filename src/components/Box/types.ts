import { ReactNode } from 'react';
import { ColorProps, FlexboxProps, LayoutProps, SpaceProps } from 'styled-system';

export interface IBox extends SpaceProps, ColorProps, FlexboxProps, LayoutProps {
    children: ReactNode;
}
