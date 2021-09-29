import React, { InputHTMLAttributes } from 'react';

import { DefaultInputStyled } from './styled';

export const DefaultInput: React.FC<InputHTMLAttributes<HTMLInputElement>> = (inputProps) => {
    return <DefaultInputStyled {...inputProps} />;
};
