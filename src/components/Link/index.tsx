import { Link as LinkComponent } from 'react-router-dom';
import styled from 'styled-components';

export const Link = styled(LinkComponent)`
    color: white;

    &: hover {
        color: rgba(240, 240, 240, 0.8);
    }
`;
