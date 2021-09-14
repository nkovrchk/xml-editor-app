import React, { useEffect, useMemo, useState } from 'react';
import { FilterBody, FilterBlock, ArticlesFilterStyled, FilterLabel, FilterInput } from './styled';
import { Text } from 'components/Text';

export interface IArticlesFilter {
    onChange: (name: string, value: string) => void;
    title: string;
    inputs: IArticlesFilterValue[];
    name: string;
}

export interface IArticlesFilterValue {
    label: string;
    value: string;
}

export const ArticlesFilter: React.FC<IArticlesFilter> = ({ onChange, inputs, title, name }) => {
    const valueComponent = useMemo(() => {
        return inputs.map((inp, i) => {
            return (
                <FilterBlock key={i}>
                    <FilterInput>
                        <input
                            type={'radio'}
                            value={inp.value}
                            name={name}
                            onChange={(e) => onChange(name, e.target.value)}
                            defaultChecked={i === 0}
                        />
                    </FilterInput>
                    <FilterLabel>
                        <Text variant={'bodyRegular'}>{inp.label}</Text>
                    </FilterLabel>
                </FilterBlock>
            );
        });
    }, [inputs]);

    return (
        <ArticlesFilterStyled>
            <Text variant={'bodySemiBold'}>{title}</Text>
            <FilterBody>{valueComponent}</FilterBody>
        </ArticlesFilterStyled>
    );
};
