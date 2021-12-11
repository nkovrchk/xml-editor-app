import { useCallback, useEffect, useState } from 'react';
import { atom, useRecoilState, useResetRecoilState } from 'recoil';

import { ArticlesApi } from 'net/articles';
import { IArticle } from 'types';

import { defaultPagination, defaultSelectedOptions } from './consts';
import { IArticleListOptionsAtom, IPaginationAtom, ISelectedFiltersAtom } from './types';

export const articleListAtom = atom<IArticle[]>({
    key: 'articleListAtom',
    default: [],
});

export const paginationAtom = atom<IPaginationAtom>({
    key: 'paginationAtom',
    default: defaultPagination,
});

export const selectedFiltersAtom = atom<ISelectedFiltersAtom>({
    key: 'selectedFiltersAtom',
    default: defaultSelectedOptions,
});

export const listOptionsAtom = atom<IArticleListOptionsAtom>({
    key: 'listOptionsAtom',
    default: {
        isPending: false,
    },
});

export const useArticleList = () => {
    const [articleList, setArticleList] = useRecoilState(articleListAtom);
    const [selectedFilters, setSelectedFilters] = useRecoilState(selectedFiltersAtom);
    const [listOptions, setListOptions] = useRecoilState(listOptionsAtom);
    const [pagination, setPagination] = useRecoilState(paginationAtom);
    const [filteredArticles, setFilteredArticles] = useState(0);

    const resetList = useResetRecoilState(articleListAtom);
    const resetFilters = useResetRecoilState(selectedFiltersAtom);
    const resetOptions = useResetRecoilState(listOptionsAtom);

    const _setSelectedFilters = useCallback(
        (value: Partial<ISelectedFiltersAtom>) => setSelectedFilters((prevState) => ({ ...prevState, ...value })),
        [setSelectedFilters],
    );

    const fetch = useCallback(() => {
        setListOptions({ isPending: true });
    }, [setListOptions]);

    const setPage = useCallback(
        (page: number) => {
            setPagination((prevState) => ({ ...prevState, currentPage: page }));
            fetch();
        },
        [fetch, setPagination],
    );

    useEffect(() => {
        if (!listOptions.isPending) return;

        const { limit, sortBy, sortDirection } = selectedFilters;
        const { currentPage } = pagination;
        const offset = currentPage * limit - limit;

        const query = `offset=${offset}&limit=${limit}&sort_by=${sortBy}&sort_value=${sortDirection}`;

        ArticlesApi.getCollection(query)
            .then((res) => {
                setArticleList(res.results);
                setFilteredArticles(res.filtered);
                setPagination({
                    currentPage: res.currentPage,
                    nextPages: res.nextPages,
                    previousPages: res.previousPages,
                    pagesToShow: [...res.previousPages, res.currentPage, ...res.nextPages],
                });
            })
            .then(() => setListOptions({ isPending: false }));
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listOptions.isPending]);

    useEffect(() => {
        return () => {
            resetList();
            resetFilters();
            resetOptions();
            setFilteredArticles(0);
        };
    }, [resetFilters, resetList, resetOptions]);

    return {
        articleList,
        selectedFilters,
        fetch,
        isPending: listOptions.isPending,
        setSelectedFilters: _setSelectedFilters,
        pagination,
        setPage,
        filteredArticles,
    };
};
