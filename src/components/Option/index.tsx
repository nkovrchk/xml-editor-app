import React, { useMemo } from 'react';

import { Box } from 'components/Box';
import { Icon } from 'components/Icon';
import { Text } from 'components/Text';
import { RadioFilled, RadioOutline, CheckboxOutline, CheckboxFilled } from 'icons/Option';

import { OptionStyled } from './styled';

export enum EOptionType {
    CHECKBOX = 'CHECKBOX',
    RADIO = 'RADIO',
}

export interface IOption {
    title: string;
    optionType: EOptionType;
    onChange: () => void;
    isActive: boolean;
}

export const Option: React.FC<IOption> = ({ title, optionType, onChange, isActive }) => {
    const renderIcon = useMemo(() => {
        const { radio, checkbox, color } = isActive
            ? {
                  radio: <RadioFilled />,
                  checkbox: <CheckboxFilled />,
                  color: '#000000',
              }
            : {
                  radio: <RadioOutline />,
                  checkbox: <CheckboxOutline />,
                  color: '#939393',
              };
        return <Icon color={color}>{optionType === EOptionType.RADIO ? radio : checkbox}</Icon>;
    }, [isActive, optionType]);
    return (
        <OptionStyled onClick={onChange}>
            <Box width="18px" height="18px">
                {renderIcon}
            </Box>
            <Box alignItems="center" display="flex">
                <Text ml={1}>{title}</Text>
            </Box>
        </OptionStyled>
    );
};
