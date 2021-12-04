import React from 'react';

import { ButtonStyled } from './styled';
import { IButtonStyled } from './types';

export interface IButton extends IButtonStyled {
    onClick?: () => void;
}

export const Button: React.FC<IButton> = (props) => {
    return <ButtonStyled {...props} type="button" variant={props.variant || 'primary'} />;
};
