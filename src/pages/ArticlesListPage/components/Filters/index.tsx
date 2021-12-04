import React, { useCallback } from 'react';

import { Box } from 'components/Box';
import { Button } from 'components/Button';
import { EOptionType, Option } from 'components/Option';
import { Text } from 'components/Text';
import { ESortBy, ESortDirection } from 'enums';

import { useArticleList } from '../../store';
import { ISelectedFiltersAtom } from '../../store/types';
import { ArticleFilter, ArticleFiltersStyled, FilterBlock } from './styled';

const limitOptions = [
    { title: '20', value: 20 },
    { title: '40', value: 40 },
    { title: '60', value: 60 },
];

const sortByOptions = [
    { title: 'Название', value: ESortBy.TITLE },
    { title: 'ID', value: ESortBy.ID },
    { title: 'Категория', value: ESortBy.CATEGORY },
];

const sortValueOptions = [
    { title: 'по возрастанию', value: ESortDirection.ASC },
    { title: 'по убыванию', value: ESortDirection.DESC },
];

export const FiltersComponent: React.FC = () => {
    const { selectedFilters, fetch, setSelectedFilters, setPage } = useArticleList();

    const handleFilterChange = useCallback(
        (key: keyof ISelectedFiltersAtom, value) => {
            setSelectedFilters({ [key]: value });
        },
        [setSelectedFilters],
    );

    const renderFilters = useCallback(
        (title: string, options: { title: string; value: any }[], key: keyof ISelectedFiltersAtom) => (
            <ArticleFilter>
                <Text color="textSecondary">{title}</Text>
                <Box mt={2}>
                    {options.map(({ title, value }, i) => (
                        <FilterBlock key={i}>
                            <Option
                                title={title}
                                optionType={EOptionType.RADIO}
                                onChange={() => handleFilterChange(key, value)}
                                isActive={selectedFilters[key] === value}
                            />
                        </FilterBlock>
                    ))}
                </Box>
            </ArticleFilter>
        ),
        [handleFilterChange, selectedFilters],
    );

    const handleSubmit = useCallback(() => {
        setPage(1);
        fetch();
    }, [fetch, setPage]);

    return (
        <ArticleFiltersStyled>
            <Text pb={2} variant="h5SemiBold">
                Фильтры
            </Text>
            {renderFilters('показывать по:', limitOptions, 'limit')}
            {renderFilters('сортировать по:', sortByOptions, 'sortBy')}
            {renderFilters('порядок:', sortValueOptions, 'sortDirection')}
            <Box display="flex" justifyContent="center">
                <Button onClick={handleSubmit} fullWidth>
                    Применить
                </Button>
            </Box>
        </ArticleFiltersStyled>
    );
};

export const Filters = React.memo(FiltersComponent);
