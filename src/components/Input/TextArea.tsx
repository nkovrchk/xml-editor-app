import React, { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

import { TextAreaStyled } from './styled';

export interface ITextArea {
    $ref?: React.RefObject<HTMLTextAreaElement>;
}

export const TextArea: React.FC<
    InputHTMLAttributes<HTMLTextAreaElement> & TextareaHTMLAttributes<HTMLTextAreaElement> & ITextArea
> = (inputProps) => {
    return <TextAreaStyled {...inputProps} ref={inputProps.$ref} />;
};
