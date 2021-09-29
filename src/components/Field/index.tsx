import React, { ReactNode } from 'react';

import { Text } from 'components/Text';

import { FieldStyled, LabelStyled } from './styled';

export interface IField {
    id: string;
    label?: string;
    errorMessage?: ReactNode | string;
}

export const Field: React.FC<IField> = ({ id, label, errorMessage, children }) => {
    return (
        <FieldStyled>
            <LabelStyled htmlFor={id}>{label ? <Text variant="body1Regular">{label}</Text> : null}</LabelStyled>
            {children}
            {errorMessage ? (
                <Text variant="caption1Regular" color="textError">
                    {errorMessage}
                </Text>
            ) : null}
        </FieldStyled>
    );
};
