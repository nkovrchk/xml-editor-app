import styled from 'styled-components';
import { color, space, flexbox, layout } from 'styled-system';

import { IBox } from './types';

export const Box = styled.div<IBox>`
    ${color}
    ${space}
    ${flexbox}
    ${layout}
`;
