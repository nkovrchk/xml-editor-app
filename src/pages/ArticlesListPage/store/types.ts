import { ESortBy, ESortDirection } from '../../../enums';

export interface IArticleListOptionsAtom {
    isPending: boolean;
}

export interface ISelectedFiltersAtom {
    limit: 20 | 40 | 60;
    sortBy: ESortBy.ID | ESortBy.TITLE | ESortBy.CATEGORY;
    sortDirection: ESortDirection.ASC | ESortDirection.DESC;
}

export interface IPaginationAtom {
    currentPage: number;
    previousPages: number[];
    nextPages: number[];
    pagesToShow: number[];
}
