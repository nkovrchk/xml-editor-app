import { SyntheticEvent } from 'react';

import { IOverlayStyled, IModalWrapperStyled } from './Base/styled';

export interface IModalUI extends IOverlayStyled, IModalWrapperStyled {
    visible?: boolean;
    onClose: (e?: SyntheticEvent) => void;
    onClick?: (e?: SyntheticEvent) => void;
}
