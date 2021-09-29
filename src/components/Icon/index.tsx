import styled from 'styled-components';

import { IIcon } from './types';

export const Icon = styled.span<IIcon>`
    color: ${({ color }) => color ?? 'black'};
    display: inline-block;
    width: ${({ size }) => size || 18}px;
    height: ${({ size }) => size || 18}px;

    & > :first-child:last-child {
        width: 100%;
        height: 100%;
    }

    & > svg {
        fill: currentColor;
        vertical-align: baseline;
    }
`;
