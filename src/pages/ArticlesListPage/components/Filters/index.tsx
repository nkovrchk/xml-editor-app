import React, { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box } from 'components/Box';
import { Button } from 'components/Button';
import { EOptionType, Option } from 'components/Option';
import { Text } from 'components/Text';
import { ESortBy, ESortValue } from 'enums';
import { getArticles, setArticleFilters } from 'reducers/articles/actions';
import { IArticleFilters } from 'reducers/articles/types';
import { TAppState } from 'store';

import { ArticleFilter, ArticleFiltersStyled, FilterBlock } from './styled';
import { IFilterState } from './types';

export const Filters: React.FC = () => {
    const dispatch = useDispatch();
    const articleFilters = useSelector((state: TAppState) => state.articles.filters);

    const [filters, setFilters] = useState<IFilterState>({
        limit: {
            title: 'Показывать по:',
            values: [
                { title: '10', value: 10, isSelected: true },
                { title: '15', value: 15 },
                { title: '20', value: 20 },
            ],
        },
        sortBy: {
            title: 'Сортировать по:',
            values: [
                { title: 'имя', value: ESortBy.TITLE, isSelected: true },
                { title: 'категория', value: ESortBy.CATEGORY },
                { title: 'идентификатор', value: ESortBy.ID },
            ],
        },
        sortValue: {
            title: 'Порядок:',
            values: [
                { title: 'по возрастанию', value: ESortValue.ASC, isSelected: true },
                { title: 'по убыванию', value: ESortValue.DESC },
            ],
        },
    });

    const setFiltersCallback = useCallback((prop: keyof IFilterState, val) => {
        setFilters((prevState) => {
            const filters = { ...prevState };

            filters[prop].values.forEach((v) => (v.isSelected = v.value === val));

            return filters;
        });
    }, []);

    const getFilters = useCallback(
        (key: keyof IFilterState) => (
            <ArticleFilter>
                <Text variant="body1Regular">{filters[key].title}</Text>
                <Box mt={2}>
                    {filters[key].values.map(({ title, value, isSelected = false }, i) => (
                        <FilterBlock key={i}>
                            <Option
                                title={title}
                                optionType={EOptionType.RADIO}
                                onChange={() => {
                                    setFiltersCallback(key, value);
                                }}
                                isActive={isSelected}
                            />
                        </FilterBlock>
                    ))}
                </Box>
            </ArticleFilter>
        ),
        [filters, setFiltersCallback],
    );

    const limitFilters = useMemo(() => {
        return getFilters('limit');
    }, [getFilters]);

    const sortByFilters = useMemo(() => {
        return getFilters('sortBy');
    }, [getFilters]);

    const sortValueFilters = useMemo(() => {
        return getFilters('sortValue');
    }, [getFilters]);

    const onButtonClick = () => {
        const { limit, sortValue, sortBy } = filters;

        const mappedFilters: IArticleFilters = {
            offset: articleFilters.offset,
            limit: limit.values.find((v) => v.isSelected)?.value || 10,
            sortValue: sortValue.values.find((v) => v.isSelected)?.value || ESortValue.ASC,
            sortBy: sortBy.values.find((v) => v.isSelected)?.value || ESortBy.TITLE,
        };

        dispatch(setArticleFilters(mappedFilters));
        dispatch(getArticles());
    };

    return (
        <ArticleFiltersStyled>
            <Text pb={2} variant="h4SemiBold">
                Фильтры
            </Text>
            {limitFilters}
            {sortByFilters}
            {sortValueFilters}
            <Button onClick={onButtonClick}>Подтвердить</Button>
        </ArticleFiltersStyled>
    );
};
