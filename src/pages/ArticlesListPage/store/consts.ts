import { ESortBy, ESortDirection } from 'enums';

import { IPaginationAtom, ISelectedFiltersAtom } from './types';

export const defaultSelectedOptions: ISelectedFiltersAtom = {
    limit: 20,
    sortBy: ESortBy.TITLE,
    sortDirection: ESortDirection.ASC,
};

export const defaultPagination: IPaginationAtom = {
    currentPage: 1,
    nextPages: [],
    previousPages: [],
    pagesToShow: [1],
};
